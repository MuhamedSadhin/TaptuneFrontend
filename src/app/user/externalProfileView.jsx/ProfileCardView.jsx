"use client";

import { useState } from "react";
import {
  HiMiniMapPin,
  HiMiniStar,
  HiMiniArrowTopRightOnSquare,
  HiMiniUserPlus,
} from "react-icons/hi2";
import { iconObj } from "@/assets/Icons/icons.jsx";
import gmailIcon from "@/assets/Icons/gmail-icon.svg";
import WhatsAppIcon from "@/assets/Icons/whatsapp-icon.svg";
import { IoCallOutline } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa6";

function ProfilePremium({ profile, onOpenShareModal }) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleAddToContacts = () => {
    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName || ""}
TITLE:${profile.designation || ""}
TEL:${profile.phoneNumber || ""}
EMAIL:${profile.email || ""}
ORG:${profile.company || ""}
URL:${window.location.href}
END:VCARD
    `.trim();

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.fullName || "contact"}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="max-w-4xl bg-slate-900/80 min-h-screen mx-auto relative border-x border-slate-800/50">
        {/* Header */}
        <div className="relative">
          <div
            className="w-full h-56 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${profile.banner})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/90"></div>

            {/* Profile Image */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 p-1 shadow-xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 p-0.5">
                    <img
                      src={
                        profile.profilePic ||
                        "https://preline.co/assets/img/160x160/img1.jpg"
                      }
                      className="w-full h-full rounded-full object-cover"
                      alt={profile.fullName}
                    />
                  </div>
                </div>

                {profile.isActive && (
                  <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-green-500 rounded-full border-2 border-slate-900 shadow-md flex items-center justify-center animate-pulse"></div>
                )}

                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-slate-900 shadow-md flex items-center justify-center">
                  <HiMiniStar className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-20 px-8 text-white">
          {/* Name & Designation */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent mb-3">
              {profile.fullName}
            </h1>
            <p className="text-xl text-slate-300 mb-2">{profile.designation}</p>
            {profile.locationLink && (
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-sm">
                <HiMiniMapPin className="w-3.5 h-3.5" />
                <a
                  href={profile.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400"
                >
                  View Location
                </a>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800/50 rounded-xl p-1.5 border border-slate-700/50 shadow-xl flex gap-3">
              {["overview", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg transform scale-105"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === "overview" && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">
                    About
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    {profile.bio?.trim() || "No bio provided yet."}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: IoCallOutline,
                    label: "Phone",
                    value: profile.phoneNumber,
                    href: `tel:${profile.phoneNumber}`,
                    color: "text-blue-500",
                    isImg: false,
                  },
                  {
                    icon: gmailIcon,
                    label: "Email",
                    value: profile.email,
                    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile?.email}`,
                    color: "from-blue-500 to-cyan-500",
                    isImg: true,
                  },
                  {
                    icon: WhatsAppIcon,
                    label: "WhatsApp",
                    value: "Chat instantly",
                    href: `https://wa.me/${profile.watsappNumber}`,
                    color: "from-green-500 to-green-600",
                    isImg: true,
                  },
                  {
                    icon: HiMiniUserPlus,
                    label: `Connect ${profile.fullName}`,
                    value: "Connect with",
                    onClick: onOpenShareModal,
                    color: "text-gray-400",
                    isImg: false,
                  },
                  {
                    icon: FaRegAddressBook,
                    label: "Add to Contacts",
                    value: "Save this profile",
                    onClick: handleAddToContacts,
                    color: "text-gray-300",
                    isImg: false,
                  },
                ].map((contact, idx) => {
                  const content = (
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        {contact.isImg ? (
                          <img
                            src={contact.icon}
                            alt={contact.label}
                            className="w-14 h-14"
                          />
                        ) : (
                          <contact.icon
                            className={`w-12 h-12 ${contact.color} `}
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">
                          {contact.label}
                        </div>
                        <div className="text-slate-400 group-hover:text-purple-400 transition-colors duration-300 text-sm">
                          {contact.value}
                        </div>
                      </div>
                      <HiMiniArrowTopRightOnSquare className="w-5 h-5 text-slate-400 group-hover:text-purple-400 ml-auto transition-colors duration-300" />
                    </div>
                  );

                  return contact.onClick ? (
                    <button
                      key={idx}
                      onClick={contact.onClick}
                      className="w-full text-left bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 group hover:scale-[1.02] shadow-xl"
                    >
                      {content}
                    </button>
                  ) : (
                    <a
                      key={idx}
                      href={contact.href}
                      className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 group hover:scale-[1.02] shadow-xl"
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            )}
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
                        href={`${social.link}`}
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
          <div className="text-center text-gray-400 text-sm border-t border-gray-700/50 pt-6 pb-10">
            <div className="flex justify-center gap-6 mb-2">
              <div className="flex items-center gap-2"></div>
            </div>
            <p>© 2025 NeptuneMark . All rights reserved.</p>
            <p className="mt-2 text-blue-400">Powered by NeptuneMark</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePremium;
