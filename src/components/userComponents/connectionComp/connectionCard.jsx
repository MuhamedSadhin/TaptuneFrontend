"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Calendar, Bookmark, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { downloadVCard } from "@/utils/contactSave";

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
  } = connection;

  console.log("ConnectionCard:", connection);
  

  return (
    <Card className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <CardContent className="">
        {/* Header with Avatar and Online Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
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
              <h3 className="font-semibold text-gray-900 text-lg truncate">
                {name}
              </h3>
              <p className="text-sm text-gray-500 truncate">{email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Designation and Company */}
        <div className="mb-4">
          <Badge
            variant="secondary"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 mb-2"
          >
            {designation}
          </Badge>
          <p className="text-sm text-gray-600">
            • {formatDistanceToNow(new Date(connectedAt), { addSuffix: true })}
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{phoneNumber}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div className="text-sm text-muted-foreground">
              Connected on{" "}
              <Link
                to={`/profile?id=${viewId}`}
                target="_blank"
                className="text-primary hover:underline font-medium"
              >
                this profile
              </Link>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={() => downloadVCard(connection)}
            className={`flex-1 ${
              isSaved
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`}
            />
            {isSaved ? "Saved" : "Save Contact"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
