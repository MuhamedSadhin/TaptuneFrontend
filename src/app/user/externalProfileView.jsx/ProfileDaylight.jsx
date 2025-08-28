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

function ProfileDaylight() {
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-gray-100 to-blue-50">
        <div className="text-center max-w-md p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200/50">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Error!</h2>
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
    <div className="w-full min-h-screen bg-gradient-to-tl from-gray-100 to-blue-50 text-gray-800">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Header with Profile Pic and Banner Overlay */}
          <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <div
              className="h-56 sm:h-72 bg-cover bg-center filter brightness-100"
              style={{ backgroundImage: `url(${profile?.banner || ""})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-100/80"></div>
            <div className="absolute bottom-6 left-6 flex items-end gap-4">
              <div className="relative">
                <img
                  src={
                    profile?.profilePic ||
                    "https://preline.co/assets/img/160x160/img1.jpg"
                  }
                  alt={profile?.fullName}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-md object-cover border-2 border-blue-300"
                />
                {profile?.isActive && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-100"></div>
                )}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-300 rounded-full flex items-center justify-center border-2 border-blue-100">
                  <HiMiniStar className="w-3 h-3 text-blue-900" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {profile?.fullName}
                </h1>
                <p className="text-lg text-gray-600">{profile?.designation}</p>
              </div>
            </div>
            {profile?.locationLink && (
              <a
                href={profile.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 right-6 flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm"
              >
                <HiMiniMapPin className="w-4 h-4" />
                Location
              </a>
            )}
          </div>

          {/* Bio Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Bio</h2>
            <div className="bg-white/80 p-6 rounded-2xl shadow-md">
              <p className="text-gray-700 leading-relaxed">
                {profile?.bio?.trim() || "No bio provided yet."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <button
              onClick={handleAddToContact}
              className="px-6 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors shadow-md font-medium"
            >
              Add to Contact
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-6 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors shadow-md font-medium"
            >
              Connect with me
            </button>
          </div>

          {/* Contact Info */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              Contact Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: HiPhone,
                  label: "Call",
                  href: `tel:${profile?.phoneNumber}`,
                  color: "bg-blue-100/50 hover:bg-blue-100/70",
                },
                {
                  icon: HiMiniEnvelopeOpen,
                  label: "Email",
                  href: `mailto:${profile?.email}`,
                  color: "bg-indigo-100/50 hover:bg-indigo-100/70",
                },
                {
                  icon: RiWhatsappFill,
                  label: "WhatsApp",
                  href: `https://wa.me/${profile?.watsappNumber}`,
                  color: "bg-green-100/50 hover:bg-green-100/70",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className={`flex flex-col items-center gap-2 p-4 ${item.color} rounded-2xl transition-colors shadow-md text-gray-800`}
                >
                  <item.icon className="w-8 h-8 text-blue-700" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              Social Media
            </h2>
            <div className="flex flex-wrap justify-center gap-6 bg-white/80 p-6 rounded-2xl shadow-md">
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
                    className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
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
          <div className="text-center text-gray-600 text-sm border-t border-blue-200/50 pt-6">
            <div className="flex justify-center gap-6 mb-2">
              <div className="flex items-center gap-2">
                <HiMiniCalendarDays className="w-4 h-4 text-blue-700" />
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

export default ProfileDaylight;
