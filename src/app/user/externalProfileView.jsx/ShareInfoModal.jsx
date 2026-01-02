"use client";

import { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PlusCircle, MinusCircle } from "lucide-react";

// --- Custom Phone Input Component ---
const CustomPhoneInput = ({ value, onChange, id, required }) => {
  return (
    <div className="relative">
      <PhoneInput
        international
        defaultCountry="IN"
        value={value}
        onChange={onChange}
        id={id}
        required={required}
        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        numberInputProps={{
          className:
            "bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-500 w-full h-full focus:ring-0 ml-2",
        }}
      />
    </div>
  );
};

export default function ShareInfoModal({
  open,
  onClose,
  formData,
  setFormData,
  onSubmit,
  loading,
}) {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // --- CLEANING LOGIC ---
    // Remove '+' from phone numbers before submitting
    const cleanPhone = formData.phone ? formData.phone.replace("+", "") : "";
    const cleanBusinessPhone = formData.businessPhone
      ? formData.businessPhone.replace("+", "")
      : "";

    // Create a payload with cleaned numbers
    const cleanedFormData = {
      ...formData,
      phone: cleanPhone,
      businessPhone: cleanBusinessPhone,
    };
    console.log("Cleaned Form Data to Submit:", cleanPhone);

    onSubmit(cleanedFormData);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="grid grid-rows-[auto_1fr_auto] max-h-[90vh] p-0 sm:max-w-lg w-[calc(100vw-2rem)] sm:w-auto">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Share Your Information
          </DialogTitle>
          <DialogDescription>
            Provide your details below. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 overflow-y-auto overscroll-y-contain">
          <form
            id="share-info-form"
            onSubmit={handleFormSubmit}
            className="space-y-6 px-6 py-4"
          >
            {/* --- PRIMARY DETAILS --- */}
            <fieldset className="space-y-4 rounded-lg bg-gray-50 p-4">
              <legend className="text-sm font-semibold text-gray-600 px-1">
                Primary Details
              </legend>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                {/* UPDATED: Email is now optional (Removed * and required prop) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <CustomPhoneInput
                      id="phone"
                      value={formData.phone}
                      onChange={(val) =>
                        setFormData({ ...formData, phone: val })
                      }
                      required={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          designation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              onClick={() => setShowAdditionalFields(!showAdditionalFields)}
            >
              {showAdditionalFields ? (
                <MinusCircle className="mr-2 h-4 w-4" />
              ) : (
                <PlusCircle className="mr-2 h-4 w-4" />
              )}
              {showAdditionalFields
                ? "Hide Additional Details"
                : "Add More Details"}
            </Button>

            {/* --- ADDITIONAL DETAILS --- */}
            {showAdditionalFields && (
              <fieldset className="space-y-4 rounded-lg bg-gray-50 p-4 border-t animate-in fade-in-0 slide-in-from-top-5 duration-300">
                <legend className="text-sm font-semibold text-gray-600 px-1">
                  Additional Details
                </legend>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessPhone">Business Phone</Label>
                      <CustomPhoneInput
                        id="businessPhone"
                        value={formData.businessPhone}
                        onChange={(val) =>
                          setFormData({ ...formData, businessPhone: val })
                        }
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessCategory">Business Category</Label>
                    <Input
                      id="businessCategory"
                      value={formData.businessCategory || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessCategory: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Business Address</Label>
                    <Textarea
                      id="businessAddress"
                      value={formData.businessAddress || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessAddress: e.target.value,
                        })
                      }
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </fieldset>
            )}
          </form>
        </div>

        <DialogFooter className="p-6 bg-white border-t rounded-2xl">
          <Button
            type="submit"
            form="share-info-form"
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              "Submit Information"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
