"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateProfileByAdmin } from "@/hooks/tanstackHooks/useCard";
import { toast } from "sonner";

const RequiredMark = () => (
  <span aria-hidden="true" className="text-destructive">
    {" "}
    *
  </span>
);

export default function CreateProfileForm() {
  const navigate = useNavigate(); // ✅ useNavigate hook
  const { mutate, isPending } = useCreateProfileByAdmin();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    designation: "",
    phoneNumber: "",
    username: "",
    brandName: "",
    whatsappNumber: "",
    bio: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const onCancel = () => {
    navigate(-1); // ✅ go back one page
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.designation ||
      !formData.phoneNumber
    ) {
      toast.error("Please fill in all required fields before submitting.");
      return;
    }

    mutate(formData, {
      onSuccess: (res) => {
        if (res?.success) {
          toast.success("Profile created successfully ✅");
          setFormData({
            fullName: "",
            email: "",
            designation: "",
            phoneNumber: "",
            username: "",
            brandName: "",
            whatsappNumber: "",
            bio: "",
            quantity: 1,
          });

          navigate(-1); // ✅ redirect back after success
        } else {
          toast.error(res?.message || "Failed to create profile.");
        }
      },
      onError: (err) => {
        console.error("Create profile error:", err);
        toast.error(
          err?.response?.data?.message || "Internal server error occurred."
        );
      },
    });
  };

  const fieldClass = "space-y-1";
  const labelClass = "block text-sm font-medium";

  return (
    <main className="container max-w-5xl py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Create User Profile
        </h1>
        <p className="text-muted-foreground text-sm">
          Fill in the details below. Required fields are marked with an
          asterisk.
        </p>
      </header>

      <Card className="bg-card text-foreground shadow-md">
        <CardHeader>
          <CardTitle>New User Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
              {/* REQUIRED FIELDS */}
              <div className={fieldClass}>
                <label htmlFor="fullName" className={labelClass}>
                  Full Name <RequiredMark />
                </label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div className={fieldClass}>
                <label htmlFor="phoneNumber" className={labelClass}>
                  Phone Number <RequiredMark />
                </label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className={fieldClass}>
                <label htmlFor="email" className={labelClass}>
                  Email <RequiredMark />
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div className={fieldClass}>
                <label htmlFor="designation" className={labelClass}>
                  Designation <RequiredMark />
                </label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Marketing Director"
                  required
                />
              </div>

              {/* OPTIONAL FIELDS */}
              <div className={fieldClass}>
                <label htmlFor="username" className={labelClass}>
                  Username
                </label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="jane_doe"
                />
              </div>

              <div className={fieldClass}>
                <label htmlFor="brandName" className={labelClass}>
                  Brand / Company Name
                </label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                />
              </div>

              <div className={fieldClass}>
                <label htmlFor="whatsappNumber" className={labelClass}>
                  WhatsApp Number
                </label>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="Optional, if different from phone"
                />
              </div>

              <div className="md:col-span-2">
                <div className={fieldClass}>
                  <label htmlFor="bio" className={labelClass}>
                    Biography
                  </label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us a bit about the user..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
