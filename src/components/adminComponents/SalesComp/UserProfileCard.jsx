"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Mail, Phone, Briefcase, Check, X } from "lucide-react";
import { HiMiniPhone, HiMiniEye, HiMiniUser } from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";

// --- Utility functions ---
const getStatusBadgeColor = (isActive) => {
  return isActive
    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm"
    : "bg-gradient-to-r from-slate-400 to-gray-600 text-white shadow-sm";
};

export default function UserProfileCard({ user, isExpanded, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isExpanded]);

  const profiles = user.profile ? [user.profile] : [];

  return (
    <Card className="p-0 overflow-hidden hover:shadow-lg transition-shadow rounded-xl gap-0">
      {/* Header */}
      <div
        className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-900 transition-colors"
        onClick={onToggle}
      >
        
        {/* Expand Icon (Left on small screens, Right on large) */}
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 transition-transform mb-2 sm:mb-0 sm:order-last ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>

        {/* User Info */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage
              src={profiles[0]?.profilePic || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg text-foreground truncate">
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Status Section */}
        <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Active Status */}
            <Badge
              className={`min-w-[90px] justify-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${getStatusBadgeColor(
                user.isActive
              )}`}
            >
              {user.isActive ? "🟢 Active User" : "⚪ Inactive User"}
            </Badge>

            {/* Account Type */}
            <Badge
              variant="outline"
              className={`min-w-[100px] justify-center rounded-full border-2 px-3 py-1 text-xs font-semibold tracking-wide ${
                user.accountType === "business"
                  ? "border-purple-500 text-purple-700 bg-purple-50 dark:bg-purple-950/40"
                  : "border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-950/40"
              }`}
            >
              {user.accountType === "business"
                ? "Business Account"
                : "Personal Account"}
            </Badge>

            {/* Profile Count */}
            <div className="flex items-center gap-1 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-950 text-purple-800 dark:text-purple-300 rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
              <HiMiniUser className="h-3.5 w-3.5" />
              <span>
                {profiles.length} Profile{profiles.length !== 1 && "s"}
              </span>
            </div>

            {/* Order Status */}
            <div
              className={`flex items-center gap-1 min-w-[100px] justify-center px-2 py-1.5 rounded-full text-xs font-medium ${
                user.isOrdered
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300"
              }`}
            >
              {user.isOrdered ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Ordered
                </>
              ) : (
                <>
                  <X className="h-3.5 w-3.5" />
                  Not Ordered
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      <div
        ref={contentRef}
        style={{
          maxHeight: height,
          transition: "max-height 0.4s ease",
          overflow: "hidden",
        }}
      >
        <div className="border-t bg-slate-50 dark:bg-slate-900/50 p-4 sm:p-6 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem
              icon={<Mail />}
              label="Registered Email"
              value={user.email || "Not Available"}
              description="Primary contact email for user communication"
            />
            <InfoItem
              icon={<Phone />}
              label="Contact Number"
              value={user.phoneNumber || "Not Available"}
              description="User’s verified phone number"
            />
            <InfoItem
              icon={<Briefcase />}
              label="Account Type"
              value={
                user.accountType === "business"
                  ? "Business Account"
                  : "Personal Account"
              }
              description="Defines the user's account category"
            />

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Order Status
              </p>
              <div className="flex items-center gap-2">
                {user.isOrdered ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900 shadow-sm">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      Ordered Successfully
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900 shadow-sm">
                      <X className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
                      No Order Placed Yet
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profiles Section */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-foreground mb-4">
              Profiles ({profiles.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile) => (
                <div
                  key={profile._id}
                  className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                >
                  {/* Banner */}
                  <div className="relative h-36 sm:h-40">
                    <div
                      className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase shadow-md ${
                        profile.isActive
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          profile.isActive ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      <span>{profile.isActive ? "Active" : "Inactive"}</span>
                    </div>

                    <img
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=60"
                      alt="Banner"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative -mt-12 px-4 pb-6 text-center">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white rounded-full overflow-hidden shadow-md bg-gray-200">
                        {profile.profilePic ? (
                          <img
                            className="w-full h-full object-cover"
                            src={profile.profilePic}
                            alt="Profile"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-400">
                            <FaUser className="w-8 h-8 text-gray-900" />
                          </div>
                        )}
                      </div>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-3 truncate">
                      {profile.fullName || "Unknown"}
                    </h2>
                    <p className="text-sm text-gray-500 truncate">
                      {profile.designation || "Professional"}
                    </p>

                    <p className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-1">
                      <HiMiniPhone className="w-4 h-4 text-blue-900" />
                      {profile.phoneNumber || "Not Provided"}
                    </p>

                    <div className="mt-2 flex items-center justify-center gap-2 text-gray-600">
                      <HiMiniEye className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">
                        {profile?.profileViews || 0}{" "}
                        <span className="text-gray-500">views</span>
                      </span>
                    </div>

                    <div className="flex justify-center mt-4">
                      <a
                        href={`#/profile?id=${profile.viewId}`}
                        target="_blank"
                        className="flex items-center gap-2 bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
                      >
                        <HiMiniUser className="w-4 h-4" />
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function InfoItem({ icon, label, value, description }) {
  return (
    <div className="flex items-start gap-3">
      <span className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-foreground font-medium">{value || "N/A"}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}
