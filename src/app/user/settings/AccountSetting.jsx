"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useUpdateUser } from "@/hooks/tanstackHooks/useAuth";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

const AccountSetupForm = () => {
  const { user, setUser } = useAuthUser();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
    profilePhoto: null,
  });

  const { mutate, isPending } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        phoneNumber: user.phoneNumber || "",
        oldPassword: "",
        newPassword: "",
        profilePhoto: null,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
   

  const validateForm = () => {
    if (formData.oldPassword && !formData.newPassword) {
      toast.error("New password is required when providing old password.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      oldPassword : formData.oldPassword,
      newPassword : formData.newPassword,
    };

   

    

    mutate(payload, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message || "Profile updated successfully");
          setUser((prev) => ({
            ...prev,
            name: formData.fullName,
            phoneNumber: formData.phoneNumber,
          }));
        } else {
          toast.error(data.message || "Failed to update profile");
        }
      },
      onError: (error) => {
        toast.error("An error occurred while updating the profile.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg border border-gray-200 rounded-2xl">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Setup your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your name, password and account settings.
          </p>
        </div>

        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Your full name"
              className="border-2 bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Your phone number"
              className="border-2 bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
              className="cursor-not-allowed bg-muted text-muted-foreground border-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={handleInputChange}
                placeholder="Old Password"
                className="border-2 bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="New Password"
                className="border-2 bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSetupForm;
