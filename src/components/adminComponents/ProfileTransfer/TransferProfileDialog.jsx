"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Send } from "lucide-react";
import { toast } from "sonner";
import {
  useGetUserForTransfer,
  useTransferProfile,
} from "@/hooks/tanstackHooks/useProfile";

export default function TransferProfileDialog({ open, onOpenChange, profile }) {
  console.log("TransferProfileDialog opened for profile:", profile);
  const [inputValue, setInputValue] = useState(""); // immediate typing
  const [email, setEmail] = useState(""); // debounced email
  const [selectedUser, setSelectedUser] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const debounceRef = useRef(null);

  const { data: users, isLoading, isError } = useGetUserForTransfer(email);
  const { mutate: transferProfile, isLoading: isTransferLoading } = useTransferProfile();

  // Handle email input with debounce
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setEmail(value.trim());
      setSelectedUser(null);
      setAgreed(false);
    }, 500);
  };

  // Handle transfer action
  const handleTransfer = () => {
    if (!selectedUser) {
      toast.error("Please select a valid user to transfer.");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the Terms & Conditions.");
      return;
      }
      console.log("Transferring profile to user:", selectedUser);

    transferProfile(
      { profileId: profile._id, userId: selectedUser._id },
      {
          onSuccess: (res) => {
              if (res.success) {
                  toast.success(res.message || "Profile transferred successfully!");
                  resetDialog();
              } else {
                  toast.error(res.message || "Failed to transfer profile.");
              }
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to transfer profile."
          );
        },
      }
    );
  };

  const resetDialog = () => {
    setInputValue("");
    setEmail("");
    setSelectedUser(null);
    setAgreed(false);
    onOpenChange(false);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[90%] sm:w-[400px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
            Transfer Profile
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-center">
            <p className="text-sm text-gray-600">
              Enter the email address of the user to transfer{" "}
              <span className="font-medium text-gray-900">
                {profile.fullName || "this profile"}
              </span>
              .
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700">
            Recipient Email
          </label>
          <Input
            type="email"
            placeholder="Enter user email"
            value={inputValue}
            onChange={handleEmailChange}
            className="focus-visible:ring-purple-500"
          />

          <ul className="border rounded p-2 max-h-48 overflow-y-auto mt-1">
            {isLoading && (
              <li className="p-2 text-sm text-gray-500 cursor-default">
                Searching users...
              </li>
            )}
            {!isLoading && isError && (
              <li className="p-2 text-sm text-red-500 cursor-default">
                Error fetching users.
              </li>
            )}
            {!inputValue && (
              <li className="p-2 text-sm text-gray-400 cursor-default">
                Please enter an email to search users.
              </li>
            )}
            {!isLoading && !isError && inputValue && users?.length === 0 && (
              <li className="p-2 text-sm text-gray-500 cursor-default">
                No users found with email "{email}"
              </li>
            )}
            {!isLoading &&
              !isError &&
              users?.length > 0 &&
              users.map((user) => (
                <li
                  key={user._id}
                  className={`p-2 rounded cursor-pointer ${
                    selectedUser?._id === user._id
                      ? "bg-purple-200 border border-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setSelectedUser(user);
                    setAgreed(false);
                  }}
                >
                  <p className="font-medium">
                    {user.name || user.fullName || "No Name"}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </li>
              ))}
          </ul>

          {selectedUser && (
            <div className="flex items-start space-x-2 mt-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(!!checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the platform's{" "}
                <span className="underline cursor-pointer text-blue-600">
                  Terms & Conditions
                </span>
                .
              </label>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex flex-col sm:flex-row justify-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            onClick={resetDialog}
            variant="outline"
            className="border border-gray-400 text-gray-900 hover:bg-gray-100 hover:text-gray-900 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleTransfer}
            disabled={!selectedUser || !agreed || isTransferLoading}
            className={`w-full sm:w-auto px-6 flex items-center justify-center text-white ${
              selectedUser && agreed
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4 mr-2" />
            {isTransferLoading ? "Transferring..." : "Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
