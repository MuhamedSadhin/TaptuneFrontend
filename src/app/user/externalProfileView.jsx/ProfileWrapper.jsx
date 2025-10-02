"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useConnectProfile } from "@/hooks/tanstackHooks/useConnections";
import { useIncrementProfileViews, useViewProfileByTap } from "@/hooks/tanstackHooks/useProfile";

import ShareInfoModal from "./ShareInfoModal";
import Loader from "@/components/ui/Loader";
import ProfilePremium from "./ProfileCardView";
import ProfilePremiumBlack from "./profileBlackPremium";
import ProfileElite from "./ProfileElite";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  designation: "",
  businessName: "",
  businessPhone: "",
  website: "",
  businessCategory: "",
  businessAddress: "",
  notes: "",
};

function ProfileWrapper() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const viewId = queryParams.get("id");

  const { data, isLoading } = useViewProfileByTap(viewId || "");
  const { mutate: connectMutate, isPending: isConnecting } = useConnectProfile();
  const { mutate: incrementView } = useIncrementProfileViews();

  const profile = data?.data || null;
  const isProfileActive = data?.success === true && profile?.isActive === true;

  useEffect(() => {
    if (profile?._id) {
      const timer = setTimeout(() => incrementView(profile._id), 5000);
      return () => clearTimeout(timer);
    }
  }, [profile?._id, incrementView]);
  
  useEffect(() => {
    if (data?.success === false) {
      setErrorMessage(data?.message || "An unknown error occurred.");
    }
  }, [data]);

  const resetFormAndCloseModal = useCallback(() => {
    setIsShareModalOpen(false);
    setFormData(initialFormData);
  }, []);

  const handleConnectSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in your Full Name, Email, and Phone Number.");
      return;
    }

    if (!profile?.viewId) {
      toast.error("Profile information is missing. Please refresh the page.");
      return;
    }


    const payload = {
      viewId: profile.viewId,
      fullName: formData.fullName, // Correct: uses fullName
      email: formData.email,
      phoneNumber: formData.phone, // Correct: maps phone to phoneNumber
      designation: formData.designation,
      businessName: formData.businessName,
      businessPhone: formData.businessPhone,
      website: formData.website,
      businessCategory: formData.businessCategory,
      businessAddress: formData.businessAddress,
      notes: formData.notes,
    };

    console.log("Submitting complete payload to API:", payload);

    connectMutate(payload, {
      onSuccess: (res) => {
        if (res?.success) {
                toast.success(
                  "Connection successful! Your details have been shared."
                );
                resetFormAndCloseModal();
        } else {
          toast.error("Connection failed. Please try again.");
        }
      },
      onError: (err) => {
        const message = err?.response?.data?.message || "Failed to connect. Please try again.";
        toast.error(message);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
           <h2 className="text-xl font-semibold text-gray-800">Profile not found or is unavailable.</h2>
        </div>
      </div>
    );
  }
  
  const designType = profile?.designType || "premium";
  const profileComponents = {
    premium: ProfilePremium,
    elite: ProfileElite,
    black: ProfilePremiumBlack,
  };
  const SelectedProfile = profileComponents[designType] || ProfilePremium;

  return (
    <>
      {!isProfileActive && (
        <div className="w-full bg-yellow-500 text-center p-3 text-white font-semibold">
          This profile is currently inactive.
        </div>
      )}

      <SelectedProfile
        profile={profile}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        isConnectDisabled={!isProfileActive}
      />

      {isShareModalOpen && (
        <ShareInfoModal
          open={isShareModalOpen}
          onClose={resetFormAndCloseModal}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleConnectSubmit}
          loading={isConnecting}
        />
      )}
    </>
  );
}

export default ProfileWrapper;