import React, { useState } from "react";
import { Loader2Icon, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useUpdatePhoneNumber } from "@/hooks/tanstackHooks/useUser";

const PhoneNumberModal = ({ open, onClose }) => {
  const [phone, setPhone] = useState("");

  const { mutate, isPending } = useUpdatePhoneNumber();

  const handleSave = () => {
    if (!phone || phone.length < 7) {
      toast.error("Please enter a valid phone number with country code.");
      return;
    }

    const phoneNumber = phone.startsWith("+") ? phone.slice(1) : phone;

    mutate(
       phoneNumber ,
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message || "Phone number updated successfully!");
            onClose();
          } else {
            toast.error(res.message || "❌ Failed to update phone number.");
          }
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message ||
              "❌ Something went wrong. Please try again."
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 
        p-5 sm:p-6 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 
        w-[92%] sm:w-[360px] max-w-[360px] animate-in fade-in-0 zoom-in-95"
      >
        <DialogHeader className="text-center">
          <div className="flex justify-center items-center w-10 h-10 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <Smartphone className="h-5 w-5" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
            Update Phone Number
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm">
            Add your mobile number with country code for better security.
          </DialogDescription>
        </DialogHeader>

        {/* --- Phone Input --- */}
        <div className="mt-5 space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Mobile Number
          </label>
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(value) => setPhone(value)} // returns number without '+'
            inputProps={{
              name: "phone",
              required: true,
            }}
            inputStyle={{
              width: "100%",
              height: "44px",
              fontSize: "15px",
              borderRadius: "8px",
              border: "1px solid gray",
              backgroundColor: "transparent",
              color: "var(--tw-color-slate-900)",
              paddingLeft: "58px",
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              border: "none",
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            containerStyle={{
              position: "relative",
              width: "100%",
            }}
            containerClass="dark:border-slate-700 dark:bg-slate-900"
            dropdownStyle={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        </div>

        {/* --- Footer Buttons --- */}
        <DialogFooter className="pt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="h-10 rounded-md px-5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={isPending}
            className="h-10 rounded-md px-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 text-sm flex items-center justify-center gap-2 min-w-[150px]"
          >
            {isPending ? (
              <>
                <Loader2Icon className="h-4 w-4 animate-spin" />
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneNumberModal;
