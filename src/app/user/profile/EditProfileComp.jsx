"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Upload, X, Plus, Save, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const socialPlatforms = [
  { name: "WhatsApp", color: "bg-green-500", icon: "💬" },
  { name: "Facebook", color: "bg-blue-600", icon: "📘" },
  { name: "Instagram", color: "bg-pink-500", icon: "📷" },
  { name: "Messenger", color: "bg-blue-500", icon: "💬" },
  { name: "LinkedIn", color: "bg-blue-700", icon: "💼" },
  { name: "TikTok", color: "bg-black", icon: "🎵" },
  { name: "Telegram", color: "bg-blue-400", icon: "✈️" },
  { name: "YouTube", color: "bg-red-600", icon: "📺" },
  { name: "Snapchat", color: "bg-yellow-400", icon: "👻" },
  { name: "Skype", color: "bg-blue-500", icon: "📞" },
  { name: "Behance", color: "bg-blue-600", icon: "🎨" },
  { name: "X", color: "bg-black", icon: "🐦" },
  { name: "Spotify", color: "bg-green-500", icon: "🎵" },
  { name: "Twitter", color: "bg-blue-400", icon: "🐦" },
  { name: "Pinterest", color: "bg-red-600", icon: "📌" },
  { name: "Blogger", color: "bg-orange-500", icon: "📝" },
  { name: "Google Maps", color: "bg-green-600", icon: "🗺️" },
  { name: "Google Drive", color: "bg-blue-500", icon: "💾" },
  { name: "GitHub", color: "bg-gray-800", icon: "💻" },
  { name: "IMO", color: "bg-blue-500", icon: "📱" },
  { name: "Reddit", color: "bg-orange-600", icon: "🤖" },
  { name: "WeChat", color: "bg-green-600", icon: "💬" },
  { name: "Amazon", color: "bg-orange-400", icon: "📦" },
  { name: "Vimeo", color: "bg-blue-500", icon: "🎬" },
  { name: "LINE", color: "bg-green-500", icon: "💬" },
  { name: "Website", color: "bg-purple-600", icon: "🌐" },
];

export default function EditProfilePage() {
  const [selectedLinks, setSelectedLinks] = useState([
    "Instagram",
    "Facebook",
    "Spotify",
    "WebLink",
  ]);

  const [formData, setFormData] = useState({
    name: "Muhamed Sadhin",
    userName: "userName",
    designation: "Fullstack developer",
    brandName: "",
    bio: "",
    phoneNo: "+91 9745170829",
    email: "muhamedsadhin.cd@gmail.com",
    whatsappNo: "+91",
    locationLink: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkToggle = (platform) => {
    setSelectedLinks((prev) =>
      prev.includes(platform)
        ? prev.filter((link) => link !== platform)
        : [...prev, platform]
    );
  };

  const removeSelectedLink = (platform) => {
    setSelectedLinks((prev) => prev.filter((link) => link !== platform));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className=" border-b sticky top-0 z-10">
        <div className="max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Edit Profile
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Header Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg relative overflow-hidden">
                <Button
                  variant="secondary"
                  className="absolute top-4 right-4"
                  size="sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Banner
                </Button>
              </div>
              <div className="absolute -bottom-12 left-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="text-2xl">MS</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "name", label: "Name" },
                { id: "userName", label: "User Name" },
                { id: "designation", label: "Designation" },
                {
                  id: "brandName",
                  label: "Brand Name",
                  placeholder: "Brand Name",
                },
              ].map(({ id, label, placeholder }) => (
                <div className="space-y-2" key={id}>
                  <Label htmlFor={id}>{label}</Label>
                  <Input
                    id={id}
                    value={formData[id]}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    placeholder={placeholder || ""}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Add a cover letter or anything else you want to share."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "phoneNo", label: "Phone No" },
                { id: "email", label: "Email", type: "email" },
                { id: "whatsappNo", label: "WhatsApp No" },
                { id: "locationLink", label: "Location Link" },
              ].map(({ id, label, type = "text" }) => (
                <div className="space-y-2" key={id}>
                  <Label htmlFor={id}>{label}</Label>
                  {id === "phoneNo" || id === "whatsappNo" ? (
                    <div className="flex">
                      <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md">
                        <span className="text-sm">🇮🇳 +</span>
                      </div>
                      <Input
                        id={id}
                        type={type}
                        value={formData[id].replace("+", "")}
                        onChange={(e) =>
                          handleInputChange(id, "+" + e.target.value)
                        }
                        className="rounded-l-none"
                      />
                    </div>
                  ) : (
                    <Input
                      id={id}
                      type={type}
                      value={formData[id]}
                      onChange={(e) => handleInputChange(id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleLinkToggle(platform.name)}
                  className={`relative p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedLinks.includes(platform.name)
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-8 h-8 ${platform.color} rounded-md flex items-center justify-center text-white text-sm mx-auto mb-1`}
                  >
                    {platform.icon}
                  </div>
                  <div className="text-xs text-center font-medium truncate">
                    {platform.name}
                  </div>
                  {selectedLinks.includes(platform.name) && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selectedLinks.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Selected Links</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Link
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedLinks.map((link) => (
                    <Badge
                      key={link}
                      variant="secondary"
                      className="px-3 py-1 text-sm"
                    >
                      {link}
                      <button
                        onClick={() => removeSelectedLink(link)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 pb-8">
          <Button variant="outline" size="lg">
            Cancel
          </Button>
          <Button size="lg" className="px-8">
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
