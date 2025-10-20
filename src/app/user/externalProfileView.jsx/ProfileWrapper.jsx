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
import { AlertTriangle } from "lucide-react";

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
    if (!formData.fullName  || !formData.phone) {
      toast.error("Please fill in your Full Name and Phone Number.");
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
        <div className="">
          {/* Activation Banner */}
          <div className="w-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
            <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-white font-semibold text-lg">
                      Profile Not Activated
                    </h3>
                    <p className="text-amber-100 text-sm">
                      This profile is currently inactive and cannot be viewed.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="hidden md:block bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-white text-sm font-medium">
                      Status: Inactive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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