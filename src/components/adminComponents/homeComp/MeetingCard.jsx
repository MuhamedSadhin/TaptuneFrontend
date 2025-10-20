"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ReferralCard({ user }) {
  const [copied, setCopied] = useState(false);

  // Base URL from environment variable
  const baseUrl = import.meta.env.VITE_BASE_URL || "https://taptune.in";

  // Generate referral link
  const referralLink = user?.referalCode
    ? `${baseUrl}/#/auth?ref=${user.referalCode}`
    : `${baseUrl}/#/auth`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Card className="w-full max-w-2xl p-4 rounded-xl shadow-md flex flex-row md:flex-row justify-between items-start md:items-center bg-white gap-4">
      {/* Left: Title + description */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="text-md font-semibold text-gray-900">
              Your Referral Link
            </h3>
            <p className="text-sm text-gray-500 max-w-md break-all">
              Share this link with your friends and earn rewards:
            </p>
          </div>
          <div className="flex -space-x-2 mt-3 md:mt-0">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alex" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sara" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Leo" />
              <AvatarFallback>L</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="w-full md:w-96 px-3 py-1 border rounded-md text-sm text-gray-700 bg-gray-100 focus:outline-none"
          />
          <Button
            onClick={handleCopy}
            className="bg-purple-500 text-white hover:bg-purple-700 px-4 py-1 text-sm"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Right: Optional Avatars */}
    </Card>
  );
}
