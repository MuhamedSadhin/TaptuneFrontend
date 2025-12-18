"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";

export default function AddDesignModal({
  isSubmitting,
  open,
  onClose,
  onSubmit,
  initialData = {},
  mode = "add", 
}) {
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [logoRequired, setLogoRequired] = useState(false);
  const [qrRequired, setQrRequired] = useState(true);

  const [frontImageFile, setFrontImageFile] = useState(null);
  const [backImageFile, setBackImageFile] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState("");
  const [backImagePreview, setBackImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setName(initialData.cardName || "");
      setCategory(initialData.category || "");
      setPrice(initialData.price || "");
      setLogoRequired(initialData.isLogo || false);
      setQrRequired(initialData.isQr ?? true);
      setFrontImagePreview(initialData.frontImage || "");
      setBackImagePreview(initialData.backImage || "");
    }
  }, [initialData, mode]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "front") {
        setFrontImageFile(file);
        setFrontImagePreview(url);
      } else {
        setBackImageFile(file);
        setBackImagePreview(url);
      }
    }
  };

const handleSubmit = () => {
  const newErrors = {};

  if (!name.trim()) newErrors.name = "Name is required";
  if (!category) newErrors.category = "Category is required";
  if (!price) newErrors.price = "Price is required";

  if (mode === "add") {
    if (!frontImageFile) newErrors.frontImage = "Front image is required";
    if (!backImageFile) newErrors.backImage = "Back image is required";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  const data = {
    name,
    category,
    price,
    logoRequired,
    qrRequired,
    frontImage: frontImageFile || initialData.frontImage,
    backImage: backImageFile || initialData.backImage,
  };

  onSubmit(data);
};



  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "edit" ? "Edit Design" : "Add Designs"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {mode === "edit"
              ? "Update the design details."
              : "Create new designs for card."}
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="Classic"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(val) => {
                setCategory(val);
                if (errors.category)
                  setErrors((prev) => ({ ...prev, category: "" }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Classic">Classic</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Review Card">Review Card</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="col-span-2 space-y-1">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
              }}
              placeholder="999"
            />
            {errors.price && (
              <p className="text-xs text-red-500">{errors.price}</p>
            )}
          </div>

          {/* FRONT IMAGE UPLOAD */}
          <div className="space-y-1">
            <Label htmlFor="frontImage">Front Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e, "front");
                if (errors.frontImage)
                  setErrors((prev) => ({ ...prev, frontImage: "" }));
              }}
            />
            {errors.frontImage && (
              <p className="text-xs text-red-500">{errors.frontImage}</p>
            )}

            {frontImagePreview && (
              <img
                src={frontImagePreview}
                alt="Front Preview"
                className="w-full h-40 object-cover rounded-2xl border"
              />
            )}
          </div>

          {/* BACK IMAGE UPLOAD */}
          <div className="space-y-1">
            <Label htmlFor="backImage">Back Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e, "back");
                if (errors.backImage)
                  setErrors((prev) => ({ ...prev, backImage: "" }));
              }}
            />
            {errors.backImage && (
              <p className="text-xs text-red-500">{errors.backImage}</p>
            )}

            {backImagePreview && (
              <img
                src={backImagePreview}
                alt="Back Preview"
                className="w-full h-40 object-cover rounded-2xl border"
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="logo"
              checked={logoRequired}
              onCheckedChange={setLogoRequired}
            />
            <Label htmlFor="logo">Logo required</Label>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="qr"
              checked={qrRequired}
              onCheckedChange={setQrRequired}
            />
            <Label htmlFor="qr">Qr Code required</Label>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Images of the card can be changed below. If you wish to remove both
          and re-upload, delete and add again.
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Card
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
