"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetProfilesCreatedByAdmin } from "@/hooks/tanstackHooks/useProfile";
import { toast } from "sonner";
import { Loader2, User, Eye, Phone, Send } from "lucide-react";
import TransferProfileDialog from "./TransferProfileDialog";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/ui/Loader";

export default function AdminCreatedProfiles() {
  const { data, isLoading, isError, error } = useGetProfilesCreatedByAdmin();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  if (isError) {
    toast.error(error?.message || "Failed to load admin profiles");
  }

  const profiles = data?.data || [];
  const navigate = useNavigate();
  const handleTransferClick = (profile) => {
    setSelectedProfile(profile);
    setOpenDialog(true);
  };

  return (
    <>
      {/* --- Heading & Description always visible --- */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl md:text-2xl font-bold text-gray-900">
            Transfer Account
          </h1>
          <p className="text-sm text-gray-500">
            Move this profile to another user by entering their email address
            below.
          </p>
        </div>

        <div>
          <Button
            onClick={() => navigate("/admin/createprofile")}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2  shadow-md transition-all duration-300"
          >
            Create Profile
          </Button>
        </div>
      </div>

      {/* --- Loading State --- */}
      {isLoading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : !profiles.length ? (
        // --- No Profiles Found ---
        <div className="text-center text-gray-500 py-10">
          No profiles created by admin found.
        </div>
      ) : (
        // --- Profiles Grid ---
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <Card
              key={profile._id}
              className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-0"
            >
              {/* Banner */}
              <div className="relative h-36 bg-gradient-to-r from-[#0f9b8e] to-[#4a00e0] rounded-t-2xl">
                <span className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  PENDING
                </span>

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full shadow-md">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <CardContent className="pt-12 pb-8 text-center flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {profile.fullName || "Unnamed User"}
                </h3>
                <p className="text-sm text-gray-500">
                  {profile.designation || "No designation"}
                </p>

                <div className="mt-2 flex justify-center items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">
                    {profile.phoneNumber || "N/A"}
                  </span>
                </div>

                <div className="mt-2 flex justify-center items-center gap-2 text-gray-500">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    0 views
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-400">
                  No social media accounts added yet.
                </p>

                {/* Transfer Profile Button */}
                <div className="mt-6 w-full flex justify-center">
                  <Button
                    onClick={() => handleTransferClick(profile)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white text-sm px-5 py-2 rounded-full shadow-md transition-all duration-300 w-[80%] sm:w-[70%] md:w-[60%]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Transfer Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* --- Transfer Dialog --- */}
      {openDialog && selectedProfile && (
        <TransferProfileDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          profile={selectedProfile}
        />
      )}
    </>
  );
}
