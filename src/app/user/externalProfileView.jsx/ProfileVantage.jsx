"use client";

import { useViewProfileByTap } from "@/hooks/tanstackHooks/useProfile";
import { useState } from "react";
import {
  HiMiniEnvelopeOpen,
  HiPhone,
  HiMiniMapPin,
  HiMiniStar,
  HiMiniArrowTopRightOnSquare,
  HiMiniCalendarDays,
} from "react-icons/hi2";
import { RiContactsFill } from "react-icons/ri";
import { RiWhatsappFill } from "react-icons/ri";

import { useLocation } from "react-router-dom";
import { iconObj } from "@/assets/Icons/icons.jsx";
import ShareInfoModal from "./ShareInfoModal";
import { toast } from "sonner";
import { useConnectProfile } from "@/hooks/tanstackHooks/useConnections";

function ProfileVantage() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const viewId = queryParams.get("id");

  const { data, isLoading, error } = useViewProfileByTap(viewId || "");
  const profile = data?.data;
  console.log("Profile Data:", profile);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    designation: "",
  });

  const { mutate, isPending } = useConnectProfile();

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
          setFormData({});
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Failed to connect");
        },
      }
    );
  };

  const handleAddToContact = () => {
    if (!profile) return;

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
ORG:${profile.designation}
TEL;TYPE=WORK,VOICE:${profile.phoneNumber}
EMAIL:${profile.email}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.fullName}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Contact added successfully");
  };

  if (error) {
    const status = error?.response?.status;
    let message = "Something went wrong. Please try again.";

    if (status === 404) {
      message = "Profile not found. Contact support team.";
    } else if (status === 403) {
      message = "Profile is not activated. Contact support team.";
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
        <div className="text-center max-w-md p-8 bg-white/90 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-lg text-gray-600">{message}</p>
          <p className="mt-4 text-gray-500 text-sm">
            Contact support if needed.
          </p>
        </div>
      </div>
    );
  }

  const joinDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 text-gray-800 font-sans">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Modern Card Layout */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-10 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={
                    profile?.profilePic ||
                    "https://preline.co/assets/img/160x160/img1.jpg"
                  }
                  alt={profile?.fullName}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border-2 border-blue-200 shadow-md"
                />
                {profile?.isActive && (
                  <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                  <HiMiniStar className="w-3 h-3 text-blue-800" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile?.fullName}
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  {profile?.designation}
                </p>
                {profile?.locationLink && (
                  <a
                    href={profile.locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <HiMiniMapPin className="w-4 h-4" />
                    View Location
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {profile?.bio?.trim() || "No bio provided yet."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <button
              onClick={handleAddToContact}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md font-medium"
            >
              Add to Contacts
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md font-medium"
            >
              Connect Now
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">
              Contact Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: HiPhone,
                  label: "Call",
                  href: `tel:${profile?.phoneNumber}`,
                  color: "bg-blue-50 hover:bg-blue-100",
                },
                {
                  icon: HiMiniEnvelopeOpen,
                  label: "Email",
                  href: `mailto:${profile?.email}`,
                  color: "bg-indigo-50 hover:bg-indigo-100",
                },
                {
                  icon: RiWhatsappFill,
                  label: "WhatsApp",
                  href: `https://wa.me/${profile?.watsappNumber}`,
                  color: "bg-green-50 hover:bg-green-100",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className={`flex flex-col items-center gap-2 p-4 ${item.color} rounded-xl transition-colors shadow-sm text-gray-800`}
                >
                  <item.icon className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">
              Social Links
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {profile?.socialMedia?.map((social, index) => {
                const iconData = iconObj.find(
                  (item) =>
                    item.name.toLowerCase() === social.platform?.toLowerCase()
                );
                const iconSrc = iconData?.icon;

                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <img
                      src={iconSrc}
                      alt={social.platform}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-gray-600 text-sm border-t border-gray-200 pt-6">
            <div className="flex justify-center gap-6 mb-2">
              <div className="flex items-center gap-2">
                <HiMiniCalendarDays className="w-4 h-4 text-blue-600" />
                Member since {joinDate}
              </div>
              <div className="flex items-center gap-2">
                Premium <HiMiniStar className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <p>© 2025 {profile?.fullName}. All rights reserved.</p>
            <p className="mt-2 text-blue-600">Powered by NeptuneMark</p>
          </div>
        </div>
      )}

      {isShareModalOpen && (
        <ShareInfoModal
          open={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setFormData({});
          }}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleConnectSubmit}
          loading={isPending}
        />
      )}
    </div>
  );
}

export default ProfileVantage;
