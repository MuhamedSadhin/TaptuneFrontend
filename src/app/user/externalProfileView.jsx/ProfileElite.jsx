"use client";

import { Star } from "lucide-react";
import { iconObj } from "@/assets/Icons/icons.jsx";
import { toast } from "sonner";
import gmailIcon from "@/assets/Icons/gmail-icon.svg";
import WhatsAppIcon from "@/assets/Icons/whatsapp-icon.svg";
import { IoCallOutline } from "react-icons/io5";

function ProfileElite({ profile, onOpenShareModal }) {
  if (!profile) return null;

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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-lg">
          <div
            className="h-56 sm:h-72 bg-cover bg-center"
            style={{ backgroundImage: `url(${profile?.banner || ""})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
          <div className="absolute bottom-6 left-6 flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="relative">
              <img
                src={
                  profile?.profilePic ||
                  "https://preline.co/assets/img/160x160/img1.jpg"
                }
                alt={profile?.fullName}
                className="w-28 h-28 rounded-2xl border-2 border-purple-600 shadow-lg object-cover"
              />
              {profile?.isActive && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900" />
              )}
              <div className="absolute -top-2 -right-2 bg-amber-400 p-1.5 rounded-full border-2 border-gray-900">
                <Star className="w-4 h-4 text-gray-900 fill-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">{profile?.fullName}</h1>
              <p className="text-lg text-gray-400">{profile?.designation}</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-12 bg-gray-900/60 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-purple-500 mb-3">Bio</h2>
          <p className="text-gray-300">
            {profile?.bio?.trim() || "No bio provided yet."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <button
            onClick={handleAddToContact}
            className="px-6 py-4 bg-blue-700 text-gray-100 rounded-2xl hover:bg-blue-800 transition-colors shadow-md font-medium"
          >
            {/* <LuContact className="w-5 h-5" /> */}
            Add to Contact
          </button>
          <button
            onClick={onOpenShareModal}
            className="px-6 py-4 bg-blue-700 text-gray-100 rounded-2xl hover:bg-blue-800 transition-colors shadow-md font-medium"
          >
            {/* <UserPlus className="w-5 h-5" /> */}
            Connect with Me
          </button>
        </div>

        {/* Contact Info */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            Contact Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                type: "react-icon",
                icon: IoCallOutline,
                label: "Call",
                href: `tel:${profile?.phoneNumber}`,
              },
              {
                type: "image",
                icon: gmailIcon,
                label: "Email",
                href:`https://mail.google.com/mail/?view=cm&fs=1&to=${profile?.email}`,
              },
              {
                type: "image",
                icon: WhatsAppIcon,
                label: "WhatsApp",
                href: `https://wa.me/${profile?.watsappNumber}`,
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="flex flex-col items-center gap-2 p-4 bg-gray-700/50 hover:bg-gray-700/70 
                   rounded-2xl transition-all shadow-md text-gray-100 hover:scale-105"
              >
                {item.type === "react-icon" ? (
                  <item.icon className="w-8 h-8 text-blue-400" />
                ) : (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-8 h-8 object-contain"
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-center mb-6 text-purple-700">
            Connect & Follow
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto py-4">
            {profile?.socialMedia?.length > 0 &&
              profile.socialMedia.map((social, index) => {
                const iconData = iconObj.find(
                  (item) =>
                    item.name.toLowerCase() === social.platform?.toLowerCase()
                );
                const iconSrc = iconData?.icon;

                return (
                  <a
                    key={index}
                    href={`${social.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <img
                      src={iconSrc}
                      alt={social.platform}
                      className="w-14 h-14 object-contain rounded-lg shadow-md hover:shadow-lg"
                    />
                  </a>
                );
              })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm border-t border-gray-700/50 pt-6">
          <div className="flex justify-center gap-6 mb-2">
            <div className="flex items-center gap-2">
            </div>
          </div>
          <p>© 2025 NeptuneMark . All rights reserved.</p>
          <p className="mt-2 text-blue-400">Powered by NeptuneMark</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileElite;







