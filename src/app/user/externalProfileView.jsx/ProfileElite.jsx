
"use client";

import {
  Phone,
  Mail,
  MapPin,
  Star,
  CalendarDays,
  Share2,
  UserPlus,
} from "lucide-react"; // icons
import { RiWhatsappFill } from "react-icons/ri";
import { iconObj } from "@/assets/Icons/icons.jsx";
import { toast } from "sonner";

function ProfileElite({ profile, onOpenShareModal }) {
  if (!profile) return null;

  const joinDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

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
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-lg">
          <div
            className="h-56 sm:h-72 bg-cover bg-center"
            style={{ backgroundImage: `url(${profile?.banner || ""})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
          <div className="absolute bottom-6 left-6 flex items-end gap-4">
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
          <h2 className="text-xl font-semibold text-purple-700 mb-3">Bio</h2>
          <p className="text-gray-300">
            {profile?.bio?.trim() || "No bio provided yet."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <button
            onClick={handleAddToContact}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-700 rounded-2xl hover:bg-purple-800 shadow-md"
          >
            <Share2 className="w-5 h-5" /> Add to Contact
          </button>
          <button
            onClick={onOpenShareModal}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-green-700 rounded-2xl hover:bg-emerald-700 shadow-md"
          >
            <UserPlus className="w-5 h-5" /> Connect with Me
          </button>
        </div>

        {/* Contact Info */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">
            Contact Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Phone,
                label: "Call",
                href: `tel:${profile?.phoneNumber}`,
                color: "bg-gray-800 hover:bg-emerald-700",
              },
              {
                icon: Mail,
                label: "Email",
                href: `mailto:${profile?.email}`,
                color: "bg-gray-800 hover:bg-blue-700",
              },
              {
                icon: RiWhatsappFill,
                label: "WhatsApp",
                href: `https://wa.me/${profile?.watsappNumber}`,
                color: "bg-gray-800 hover:bg-green-700",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`flex flex-col items-center gap-2 p-4 ${item.color} rounded-2xl transition-all shadow-md hover:scale-105`}
              >
                <item.icon className="w-7 h-7 text-white" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-center mb-6 text-purple-700">
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
          <div className="flex justify-center gap-6 mb-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Member since {joinDate}
            </div>
            <div className="flex items-center gap-2">
              Premium <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
          </div>
          <p>© 2025 {profile?.fullName}. All rights reserved.</p>
          <p className="mt-2 text-purple-400">Powered by NeptuneMark</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileElite;
