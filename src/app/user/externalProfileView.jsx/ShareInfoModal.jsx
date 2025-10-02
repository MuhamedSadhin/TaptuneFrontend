"use client";

import { useState, useEffect } from "react";
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

export default function ShareInfoModal({
  open,
  onClose,
  formData,
  setFormData,
  onSubmit,
  loading,
}) {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  // BUG FIX 1: This hook locks the background (parent) scroll when the modal is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // This cleanup function ensures scrolling is restored if the component unmounts.
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      {/* BUG FIX 2: This grid layout fixes internal scrolling and ensures the header and footer are always visible. */}
      <DialogContent className="grid grid-rows-[auto_1fr_auto] max-h-[90vh] p-0 sm:max-w-lg w-[calc(100vw-2rem)] sm:w-auto">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Share Your Information
          </DialogTitle>
          <DialogDescription>
            Provide your details below. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        {/* This div is now the ONLY scrollable container. */}
        <div className="min-h-0 overflow-y-auto overscroll-y-contain">
          <form
            id="share-info-form"
            onSubmit={handleFormSubmit}
            className="space-y-6 px-6 py-4"
          >
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
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
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

            {/* --- Additional Details Section (Now Fully Implemented) --- */}
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
                      <Input
                        id="businessPhone"
                        value={formData.businessPhone || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessPhone: e.target.value,
                          })
                        }
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

        {/* This footer is now non-scrolling and always visible. */}
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
