"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function EnquiryCard() {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-2xl p-4 rounded-xl shadow-md flex flex-row justify-between items-center bg-white">
      {/* Left: title + description + avatars */}
      <div className="flex flex-col gap-3">
        {/* Title + Description */}
        <div>
          <h3 className="text-md font-semibold text-gray-900">New Enquiry</h3>
          <p className="text-sm text-gray-500 truncate max-w-xs">
            Check the latest customer enquiries and follow up promptly.
          </p>
        </div>

        {/* Avatars of sales team assigned */}
        <div className="flex -space-x-2">
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

      {/* Right: Bell icon + Enquiry button */}
      <div className="flex items-center gap-2">
        {/* <Bell className="w-5 h-5 text-gray-400 cursor-pointer" /> */}
        <Button
          onClick={() => navigate("/admin/enquiry")}
          className="bg-purple-500 text-white hover:bg-purple-700 px-4 py-1 text-sm"
        >
          View Enquiries
        </Button>
      </div>
    </Card>
  );
}
