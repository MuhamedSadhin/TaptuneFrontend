"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCreateCard, useGetAllCards, useToggleCardStatus, useUpdateCard } from "@/hooks/tanstackHooks/useCard";
import AddDesignModal from "@/components/adminComponents/cardListComp/AddDesignModal";
import { toast } from "sonner";
import { deleteFileFromFirebase } from "@/firebase/functions/deleteFileFromFirebase";
import { uploadFileToFirebase } from "@/firebase/functions/uploadFileToFirebase";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function CardDesignTable() {
  const { data } = useGetAllCards();
  const cardData = useMemo(() => data?.data || [], [data]);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500); 

    return () => {
      clearTimeout(handler); 
    };
  }, [searchText]);

  const filteredCards = useMemo(() => {
    return cardData.filter((card) => {
      const matchesSearch = card.cardName
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "" ||
        selectedCategory === "all" ||
        card.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [cardData, debouncedSearchText, selectedCategory]);

  const handleOpenAdd = () => {
    setSelectedCard(null);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (card) => {
    setSelectedCard(card);
    setEditMode(true);
    setModalOpen(true);
  };

const { mutate: createCard } = useCreateCard();
  const { mutate: updateCard } = useUpdateCard();
    const { mutate: toggleStatus, isLoading: statusUpdating } =useToggleCardStatus();

const handleSubmit = async (cardData) => {
  try {
    setIsSubmitting(true); 

    let frontImageUrl = cardData.frontImage;
    let backImageUrl = cardData.backImage;

    if (cardData.frontImage instanceof File) {
      if (editMode && selectedCard?.frontImage) {
        await deleteFileFromFirebase(selectedCard.frontImage);
      }
      frontImageUrl = await uploadFileToFirebase(
        cardData.frontImage,
        "card-fronts"
      );
    }

    // 🔁 Upload and replace back image if it's a new file
    if (cardData.backImage instanceof File) {
      if (editMode && selectedCard?.backImage) {
        await deleteFileFromFirebase(selectedCard.backImage);
      }
      backImageUrl = await uploadFileToFirebase(
        cardData.backImage,
        "card-backs"
      );
    }

    // 🧾 Final payload
    const payload = {
      cardName: cardData.name,
      category: cardData.category,
      price: cardData.price,
      isLogo: cardData.logoRequired,
      isQr: cardData.qrRequired,
      frontImage: frontImageUrl,
      backImage: backImageUrl,
    };

    const onSuccess = () => {
      toast.success(
        editMode ? "Card updated successfully" : "Card created successfully"
      );
      setModalOpen(false); 
      setSelectedCard(null);
    };

    const onError = () => toast.error("Something went wrong");

  
    if (!editMode) {
      createCard(payload, {
        onSuccess,
        onError,
        onSettled: () => setIsSubmitting(false),
      });
    } else {
      updateCard(
        { id: selectedCard._id, data: payload },
        {
          onSuccess,
          onError,
          onSettled: () => setIsSubmitting(false),
        }
      );
    }
  } catch (error) {
    console.error("Submit error:", error);
    toast.error("Unexpected error occurred");
    setIsSubmitting(false);
  }
};

  const handleToggleStatus = (card) => {
    toggleStatus(
      { id: card._id, isActive: !card.isActive },
      {
        onSuccess: () => {
          toast.success(
            `Card ${card.isActive ? "deactivated" : "activated"} successfully`
          );
        },
        onError: () => toast.error("Failed to update status"),
      }
    );
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Card Designs</h2>
          <p className="text-sm text-muted-foreground">
            All card designs, add and edit designs.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:space-x-2 w-full">
          <Input
            placeholder="Search designs..."
            className="w-full sm:w-64"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            onValueChange={(value) => setSelectedCategory(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="w-full sm:w-auto bg-purple-600 text-white"
            onClick={handleOpenAdd}
          >
            + Add New Card
          </Button>
        </div>
      </div>

      <div className="min-w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="px-4 py-3">DESIGN</TableHead>
              <TableHead className="px-4 py-3">CARD NAME</TableHead>
              <TableHead className="px-4 py-3">CATEGORY</TableHead>
              <TableHead className="px-4 py-3">PRICE</TableHead>
              <TableHead className="px-4 py-3">CREATED</TableHead>
              <TableHead className="px-4 py-3">EDIT</TableHead>
              <TableHead className="px-4 py-3 ">STATUS</TableHead>
              <TableHead className="px-4 py-3 text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCards.map((card, index) => (
              <TableRow key={index} className="hover:bg-accent/40">
                <TableCell className="px-4 py-2">
                  <img
                    src={card.frontImage}
                    alt="card design"
                    className="h-13 w-21 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="px-4 py-2 font-semibold">
                  {card.cardName}
                </TableCell>
                <TableCell className="px-4 py-2">{card.category}</TableCell>
                <TableCell className="px-4 py-2">₹ {card.price}</TableCell>
                <TableCell className="px-4 py-2">
                  {card.createdAt
                    ? formatDistanceToNow(new Date(card.createdAt), {
                        addSuffix: true,
                      })
                    : "-"}
                </TableCell>

                <TableCell className="px-4 py-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenEdit(card)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <Badge className={card.isActive ? "bg-green-800 border-none w-16"
                    : "bg-red-600  border-none w-16"}>
                    
                    {card.isActive ? "Active" : "Inactive"}
                    </Badge>
                </TableCell>
                <TableCell className="px-4 py-2 text-right">
                  <Button
                    variant={"default"}
                    className={card.isActive ?
                      "w-25 bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400"
                      : "w-25 bg-green-700 text-white hover:bg-green-900"}
                    size="sm"
                    onClick={() => handleToggleStatus(card)}
                    disabled={statusUpdating}
                  >
                    {statusUpdating
                      ? "Updating..."
                      : card.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredCards.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-sm">
                  No card designs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredCards.length} result{filteredCards.length !== 1 && "s"}
      </p>

      {modalOpen && (
        <AddDesignModal
          isSubmitting={isSubmitting}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedCard(null);
            setEditMode(false);
          }}
          onSubmit={handleSubmit}
          initialData={selectedCard}
          mode={editMode ? "edit" : "add"}
        />
      )}
    </div>
  );
}
