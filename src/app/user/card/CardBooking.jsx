
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Upload,
  Star,
  QrCode,
  CheckCircle,
  Plus,
  Minus,
  Loader2,
} from "lucide-react";
import { useCreateCardOrderAndProfile, useGetOneCard } from "@/hooks/tanstackHooks/useCard";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";
import { uploadFileToFirebase } from "@/firebase/functions/uploadFileToFirebase";
import PhoneInput from "react-phone-input-2";


export default function CardBooking() {
  const { id } = useParams();
  const [loading ,setLoading] = useState(false)
  const [imageViewOnCard,setImageViewOnCard] = useState(null)
    const { data, isLoading } = useGetOneCard({ id });
    const {mutate , isPending} = useCreateCardOrderAndProfile()
  const cardData = data?.data || {};

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    phone: "",
    email: "",
  });
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [errors, setErrors] = useState({});

  const cardPrice = cardData?.price || 1200;
  const totalAmount = cardPrice * quantity;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };


    const handleLogoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUploadedLogo(file);

          setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors.logo;
            return updatedErrors;
          });
      }

      };
  
useEffect(() => {
  if (cardData?.frontImage) {
    setImageViewOnCard(cardData.frontImage);
  }
}, [cardData?.frontImage]);


  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";
    if (!formData.phone)
      newErrors.phone = "Phone number is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (cardData?.isLogo && !uploadedLogo) newErrors.logo = "Logo is required";
    return newErrors;

  };

    const handlePhoneChange = (value, country) => {
    const cleanValue = value.replace(/^\+/, ""); // remove leading +
    setFormData((prev) => ({
      ...prev,
      phone: cleanValue,
    }));
  };

const handlePlaceOrder = async () => {
  setLoading(true);
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    try {
      let logoLink;
      if (cardData?.isLogo && uploadedLogo) {
        logoLink = await uploadFileToFirebase(uploadedLogo, "logo");
      }

      mutate(
        {
          ...formData,
          quantity,
          totalAmount,
          logoImage: logoLink,
          cardId: id,
        },
        {
          onSuccess: (res) => {
            if (res.success) {
              toast.success("Order placed successfully!");
              navigate(-1);
            } else {
              console.error("Order placement failed:", res.message);
              toast.error("Failed to place order: " + res.message);
            }
            setLoading(false); // ✅ only stop loading after success/failure
          },
          onError: (error) => {
            console.error("Mutation error:", error);
            toast.error("Something went wrong!");
            setLoading(false);
          },
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred!");
      setLoading(false);
    }
  } else {
    setLoading(false); // ✅ stop loading only if validation fails
  }
};




  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ...Header and card preview stay same... */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
              Book a Card
            </h1>
            <p className="text-gray-600 text-sm">
              Reserve your favorite digital business card and personalize it to
              your style.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[60vh] w-full">
            <div className="text-center">
              <Loader />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="space-y-6">
              {/* Card Preview */}
              <Card className="border-0 shadow-lg overflow-hidden rounded-2xl py-0">
                <div className="relative h-64 sm:h-80">
                  <img
                    src={imageViewOnCard}
                    alt="Card front"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Card>

              {/* Thumbnails */}
              <div className="flex gap-4 ml-2">
                <div
                  className={`w-20 h-12 rounded-md border-2 ${
                    imageViewOnCard === cardData?.frontImage
                      ? "border-purple-500"
                      : "border-gray-300"
                  } overflow-hidden cursor-pointer`}
                  onClick={() => setImageViewOnCard(cardData?.frontImage)}
                >
                  <img
                    src={cardData?.frontImage}
                    alt="Front"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`w-20 h-12 rounded-md border-2 ${
                    imageViewOnCard === cardData?.backImage
                      ? "border-purple-500"
                      : "border-gray-300"
                  } overflow-hidden cursor-pointer`}
                  onClick={() => setImageViewOnCard(cardData?.backImage)}
                >
                  <img
                    src={cardData?.backImage}
                    alt="Back"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card Info */}
              <div className="space-y-4 ml-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {cardData?.cardName}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">Category:</span>
                    <Badge className="bg-purple-100 text-purple-700">
                      {cardData?.category}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-2">
                    ₹ {cardData?.price || "1200"}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600">
                      Includes reviewers
                    </span>
                  </div>
                </div>

                {/* Features */}
                {(cardData?.isQr || cardData?.isLogo) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Additional Features
                    </h3>
                    <div className="space-y-2">
                      {cardData?.isQr && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <QrCode className="w-4 h-4 text-blue-500" />
                          <span>QR Code Included</span>
                        </div>
                      )}
                      {cardData?.isLogo && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Brand Logo Required</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Inside the Right Section Form */}
            <div className="">
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardContent className="p-6 sm:p-8 space-y-8">
                  {/* Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="bg-gray-50 border-gray-200 h-11"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Designation */}
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        placeholder="Your designation"
                        className="bg-gray-50 border-gray-200 h-11"
                      />
                      {errors.designation && (
                        <p className="text-sm text-red-500">
                          {errors.designation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <PhoneInput
                        country={"in"}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputProps={{
                          name: "phoneNumber",
                          required: true,
                          id: "phoneNumber",
                        }}
                        containerClass="w-full"
                        inputClass="!w-full !h-11 !border !border-input !rounded-md !pl-15 !pr-3 !text-sm bg-gray-50"
                        buttonClass="!border !border-input !rounded-l-md !px-2"
                        dropdownClass="max-h-60 overflow-y-auto"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="bg-gray-50 border-gray-200 h-11"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Upload Logo */}
                  {cardData?.isLogo && (
                    <div className="space-y-2">
                      <Label>Upload Logo</Label>
                      <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition">
                        {uploadedLogo ? (
                          <div className="space-y-2">
                            <img
                              src={URL.createObjectURL(uploadedLogo)}
                              alt="Uploaded logo"
                              className="w-16 h-16 object-contain mx-auto"
                            />
                            <p className="text-sm text-green-600">
                              Logo uploaded successfully
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-sm text-gray-600">
                              Click to upload your logo
                            </p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      {errors.logo && (
                        <p className="text-sm text-red-500">{errors.logo}</p>
                      )}
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <Label>Quantity</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange("decrease")}
                          disabled={quantity <= 1}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange("increase")}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span>₹ {totalAmount}</span>
                    </div>
                  </div>

                  {/* Place Order */}
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Booking ...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
        


