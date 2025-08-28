"use client";

import { useViewProfileByTap } from "@/hooks/tanstackHooks/useProfile";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useConnectProfile } from "@/hooks/tanstackHooks/useConnections";

import ShareInfoModal from "./ShareInfoModal";
import Loader from "@/components/ui/loader";
import ProfilePremium from "./ProfileCardView";
import ProfileElite from "./ProfileElite";
import ProfileDaylight from "./ProfileDaylight";
import ProfilePremiumBlack from "./profileBlackPremium";

function ProfileWrapper() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    designation: "",
  });
  const [notActive, setNotActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const viewId = queryParams.get("id");

  const {
    data,
    isLoading,
    error: queryError,
  } = useViewProfileByTap(viewId || "");

  const { mutate, isPending } = useConnectProfile();

  const profile = data?.data || null;
  console.log("Fetched profile data:", profile);

  // ✅ Handle API error states only once
  useEffect(() => {
    if (data?.success === false) {
      const status = data?.status;
      let message = "Something went wrong. Please try again.";
      if (status === 403) {
        setNotActive(true);
        message = "This profile is not active.";
      } else if (status === 404) {
        message = "Profile not found. Contact support team.";
      }
      setErrorMessage(message);
    }
  }, [data]);

  const handleConnectSubmit = () => {
    const { fullName, email, phone, designation } = formData;
    if (!fullName || !email || !phone || !designation) {
      toast.error("Please fill in all the fields");
      return;
    }

    mutate(
      {
        viewId: profile?.viewId,
        name: fullName,
        email,
        phoneNumber: phone,
        designation,
      },
      {
        onSuccess: () => {
          toast.success("Connection successful");
          setIsShareModalOpen(false);
          setFormData({ fullName: "", email: "", phone: "", designation: "" });
        },
        onError: (err) => {
          const message =
            err?.response?.data?.message || "Failed to connect. Try again.";
          toast.error(message);
        },
      }
    );
  };

  if (isLoading) return <Loader />;

  if (data?.success === false && data?.status !== 403) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center max-w-md p-6 bg-slate-800/70 rounded-2xl shadow-lg border border-slate-700">
          <h2 className="text-2xl font-bold text-purple-400 mb-3">Oops!</h2>
          <p className="text-slate-300 text-base">{errorMessage}</p>
          <p className="mt-2 text-slate-500 text-sm">
            If the issue persists, please reach out to support.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Empty profile (edge case)
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center max-w-md p-6 bg-slate-800/70 rounded-2xl shadow-lg border border-slate-700">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">
            No profile data available
          </h2>
          <p className="text-slate-400">Try again later.</p>
        </div>
      </div>
    );
  }

  // ✅ Profile rendering
  const designType = profile?.designType || "premium";
  const profileComponents = {
    premium: ProfilePremium,
    elite: ProfileElite,
    black: ProfilePremiumBlack,
    day: ProfileDaylight,
  };
  const SelectedProfile = profileComponents[designType] || ProfilePremium;

  return (
    <>
      {notActive && (
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
      />

      {isShareModalOpen && (
        <ShareInfoModal
          open={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              designation: "",
            });
          }}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleConnectSubmit}
          loading={isPending}
        />
      )}
    </>
  );
}

export default ProfileWrapper;
