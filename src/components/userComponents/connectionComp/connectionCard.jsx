"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Calendar, Bookmark, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { downloadVCard } from "@/utils/contactSave";

// CRM-focused color mapping (Teal for New, Green for Hot, Red for Cold)
const statusColors = {
  New: "bg-teal-100 text-teal-800 border-teal-200",
  Hot: "bg-green-100 text-green-800 border-green-200",
  Warm: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Cold: "bg-red-100 text-red-800 border-red-200",
  "Follow-up": "bg-purple-100 text-purple-800 border-purple-200",
};

const ConnectionCard = ({ connection }) => {
  const {
    id,
    name,
    email,
    designation,
    phoneNumber,
    viewId,
    avatar,
    isOnline,
    isSaved,
    connectedAt,
    location,
    leadLabel,
  } = connection;

  const currentLeadLabel = leadLabel || "New";
  const statusClass = statusColors[currentLeadLabel] || statusColors.New;

  return (
    <Card className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <CardContent className="p-5">
        {/* TOP HEADER ROW: AVATAR/NAME on left, STATUS BADGE on right */}
        <div className="flex items-start justify-between mb-4">
          {/* LEFT: Avatar and Name/Email */}
          <div className="flex items-start space-x-3 flex-grow min-w-0">
            {" "}
            {/* Use flex-grow and min-w-0 */}
            <div className="relative flex-shrink-0">
              <Avatar className="w-12 h-12 border-2 border-gray-100">
                <AvatarImage
                  src={avatar || "/placeholder.svg"}
                  alt={name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {" "}
              {/* flex-1 to allow text to grow, min-w-0 for truncation */}
              <h3 className="font-bold text-gray-900 text-lg truncate">
                {name}
              </h3>
              <p className="text-sm text-gray-500 truncate">{email}</p>
            </div>
          </div>

          {/* RIGHT: LEAD STATUS BADGE - Pushed to right with ml-auto */}
          <div className="flex-shrink-0 pt-1 ml-auto">
            {" "}
            {/* ml-auto pushes it right, pt-1 for vertical alignment */}
            <Badge
              variant="secondary"
              className={`font-bold uppercase text-xs tracking-wider border ${statusClass}`}
            >
              {currentLeadLabel}
            </Badge>
          </div>
        </div>

        {/* Designation and Connected Time */}
        <div className="mb-4 pt-2 border-t border-gray-100">
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 mb-2"
          >
            {designation || "No Designation"}
          </Badge>
          <p className="text-sm text-gray-500 mt-1">
            • Connected{" "}
            {formatDistanceToNow(new Date(connectedAt), { addSuffix: true })}
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-5 border-t pt-4 border-gray-100">
          <div className="flex items-center space-x-3 text-sm text-gray-700">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{phoneNumber || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-700">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="truncate font-medium">{email}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div className="text-sm text-muted-foreground">
              Viewed Profile:{" "}
              <Link
                to={`/profile?id=${viewId}`}
                target="_blank"
                className="text-purple-600 hover:text-purple-700 hover:underline font-semibold"
              >
                Go to Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex space-x-2">
          <Button
            onClick={() => downloadVCard(connection)}
            className={`flex-1 font-semibold ${
              isSaved
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`}
            />
            {isSaved ? "Contact Saved" : "Save Contact"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
