"use client";

import { useState } from "react";
import {
  HiMiniEnvelopeOpen,
  HiPhone,
  HiMiniMapPin,
  HiMiniStar,
  HiMiniCalendarDays,
} from "react-icons/hi2";
import { RiWhatsappFill } from "react-icons/ri";
import { toast } from "sonner";

import { iconObj } from "@/assets/Icons/icons.jsx";
import ShareInfoModal from "./ShareInfoModal";
import { useConnectProfile } from "@/hooks/tanstackHooks/useConnections";

function ProfilePremiumBlack({ profile, onOpenShareModal }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
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

  const joinDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-gray-900">
      <div className=" bg-gradient-to-br from-gray-900 to-black text-white max-w-4xl mx-auto ">
        {/* Header with Banner and Profile Pic */}
        <div className="relative mb-12">
          <div
            className="h-48 sm:h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${profile?.banner || ""})` }}
          ></div>
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                src={
                  profile?.profilePic ||
                  "https://preline.co/assets/img/160x160/img1.jpg"
                }
                alt={profile?.fullName}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-800 shadow-lg object-cover"
              />
              {profile?.isActive && (
                <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
              )}
              <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-gray-800">
                <HiMiniStar className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Name, Designation, Location */}
        <div className="text-center mt-20 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            {profile?.fullName}
          </h1>
          <p className="text-xl text-gray-400 mt-2">{profile?.designation}</p>
          {profile?.locationLink && (
            <a
              href={profile.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-1 mt-2 text-gray-500 hover:text-purple-400 text-sm"
            >
              <HiMiniMapPin className="w-4 h-4" />
              View Location
            </a>
          )}
        </div>

        {/* Bio Section */}
        <div className="mb-12 mx-4">
          <h2 className="text-2xl font-semibold text-center mb-4 ">Bio</h2>
          <div className="bg-gray-800/50 p-6 rounded-2xl shadow-md text-center max-w-2xl mx-auto">
            <p className="text-gray-300">
              {profile?.bio?.trim() || "No bio provided yet."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={handleAddToContact}
            className="px-6 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors shadow-md text-sm sm:text-base"
          >
            Add to Contact
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-6 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors shadow-md text-sm sm:text-base"
          >
            Connect with me
          </button>
        </div>

        {/* Contact Info */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Contact Info 
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            {[
              {
                icon: HiPhone,
                label: "Contact",
                href: `tel:${profile?.phoneNumber}`,
                color: "bg-blue-600",
              },
              {
                icon: HiMiniEnvelopeOpen,
                label: "Email",
                href: `mailto:${profile?.email}`,
                color: "bg-indigo-600",
              },
              {
                icon: RiWhatsappFill,
                label: "WhatsApp",
                href: `https://wa.me/${profile?.watsappNumber}`,
                color: "bg-green-600",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 ${item.color} rounded-full hover:opacity-90 transition-opacity shadow-md text-sm sm:text-base`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-center mb-6 text-purple-400">
            Connect & Follow
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto py-4">
            {profile?.socialMedia?.length > 0 &&
              profile.socialMedia.map((social, index) => {
                const iconData = iconObj.find(
                  (item) =>
                    item.name.toLowerCase() === social.platform?.toLowerCase()
                );
                const iconSrc = iconData?.icon;

                return (
                  <div key={index} className="group">
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:border-purple-500 group-hover:scale-110">
                        <img
                          src={iconSrc}
                          alt={social.platform}
                          className="w-16 h-16 object-contain rounded-xl"
                        />
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
          <div className="flex justify-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <HiMiniCalendarDays className="w-4 h-4" />
              Member since {joinDate}
            </div>
            <div className="flex items-center gap-2">
              Premium <HiMiniStar className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
          <p>© 2025 {profile?.fullName}. All rights reserved.</p>
          <p className="mt-2">Powered by NeptuneMark</p>
        </div>
      </div>

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

export default ProfilePremiumBlack;
