"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, User, Briefcase } from "lucide-react";
import { useUpdateUser } from "@/hooks/tanstackHooks/useAuth";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

export default function AccountSetupForm() {
  const { user, setUser } = useAuthUser();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
    accountType: "personal",
  });

  const { mutate, isPending } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        phoneNumber: user.phoneNumber || "",
        oldPassword: "",
        newPassword: "",
        accountType: user.accountType || "personal",
      }));
    }
  }, [user]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAccountTypeChange(value) {
    setFormData((prev) => ({ ...prev, accountType: value }));
  }

  function validateForm() {
    if (
      (formData.oldPassword && !formData.newPassword) ||
      (!formData.oldPassword && formData.newPassword)
    ) {
      toast.error(
        "To change your password, provide both old and new passwords."
      );
      return false;
    }
    if (!formData.fullName.trim()) {
      toast.error("Full name is required.");
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      oldPassword: formData.oldPassword || undefined,
      newPassword: formData.newPassword || undefined,
      accountType: formData.accountType,
    };

    mutate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.message || "Profile updated successfully.");
          setUser((prev) => ({
            ...prev,
            name: formData.fullName,
            phoneNumber: formData.phoneNumber,
            accountType: formData.accountType,
          }));
        } else {
          toast.error(data?.message || "Failed to update profile.");
        }
      },
      onError: () => {
        toast.error("An error occurred while updating the profile.");
      },
    });
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit}>
          <Card className="overflow-hidden shadow-lg border-gray-200/80">
            <CardHeader className="bg-white dark:bg-gray-950 p-6">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Account Settings
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Manage your profile, account type, and security settings.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-8">
              {/* === PROFILE SECTION === */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Profile
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      inputMode="tel"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                    />
                    <p className="text-xs text-muted-foreground">
                      Your email is managed by the system and cannot be changed.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* === ACCOUNT TYPE SECTION === */}
              {/* <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Account Type
                </h2>
                <RadioGroup
                  value={formData.accountType}
                  onValueChange={handleAccountTypeChange}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <Label
                    htmlFor="personal"
                    className={`group flex flex-col gap-4 rounded-lg border p-4 cursor-pointer transition-all hover:border-purple-500 data-[state=checked]:bg-purple-50 ${
                      formData.accountType === "personal" ? "bg-purple-100" : ""
                    } data-[state=checked]:border-purple-600 data-[state=checked]:ring-2 data-[state=checked]:ring-purple-300 dark:data-[state=checked]:bg-purple-950/50 dark:data-[state=checked]:ring-purple-800 `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full transition-colors group-data-[state=checked]:bg-purple-100 dark:group-data-[state=checked]:bg-purple-900">
                        <User className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-colors group-data-[state=checked]:text-purple-700 dark:group-data-[state=checked]:text-purple-400" />
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 transition-colors group-data-[state=checked]:text-purple-800 dark:group-data-[state=checked]:text-purple-300">
                        Personal
                      </span>
                      <RadioGroupItem
                        id="personal"
                        value="personal"
                        className="ml-auto sr-only" 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ideal for individuals managing their own network and
                      profile.
                    </p>
                  </Label>

                  <Label
                    htmlFor="business"
                    className={`group ${
                      formData.accountType === "business" ? "bg-purple-100" : ""
                    }  flex flex-col gap-4 rounded-lg border p-4 cursor-pointer transition-all hover:border-purple-500 data-[state=checked]:bg-purple-50 data-[state=checked]:border-purple-600 data-[state=checked]:ring-2 data-[state=checked]:ring-purple-300 dark:data-[state=checked]:bg-purple-950/50 dark:data-[state=checked]:ring-purple-800`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full transition-colors group-data-[state=checked]:bg-purple-100 dark:group-data-[state=checked]:bg-purple-900">
                        <Briefcase className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-colors group-data-[state=checked]:text-purple-700 dark:group-data-[state=checked]:text-purple-400" />
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 transition-colors group-data-[state=checked]:text-purple-800 dark:group-data-[state=checked]:text-purple-300">
                        Business
                      </span>
                      <RadioGroupItem
                        
                        id="business"
                        value="business"
                        className="ml-auto sr-only"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Best for teams needing advanced features like lead
                      management.
                    </p>
                  </Label>
                </RadioGroup>
              </section>

              <Separator /> */}

              {/* === PASSWORD SECTION === */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Password
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Old password</Label>
                    <Input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Create a new password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave these fields blank if you do not wish to change your
                  password.
                </p>
              </section>
            </CardContent>

            {/* === ACTIONS FOOTER === */}
            <div className="flex flex-col-reverse gap-3 bg-gray-50 dark:bg-gray-950/50 p-6 sm:flex-row sm:items-center sm:justify-end sm:gap-4 border-t">
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Saving…
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </Card>
        </form>
      </section>
    </main>
  );
}
