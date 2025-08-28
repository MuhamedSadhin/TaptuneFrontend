

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Copy, Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import { useUpdateCardOrderStatus } from "@/hooks/tanstackHooks/useCard";
import { Badge } from "@/components/ui/badge";

export default function PrintingDetailsModal({ isOpen, onClose, profile }) {
  const qrRef = useRef();
  const { mutate, isPending } = useUpdateCardOrderStatus();
  const [localProfile, setLocalProfile] = useState(profile);

  useEffect(() => {
    if (profile) setLocalProfile(profile);
  }, [profile]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://taptune.in/#/profile?id=${localProfile?.viewId}`
    );
    toast.success("Profile link copied!");
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${localProfile?.fullName || "qr-code"}.png`;
    link.click();
  };

const getNextStatus = (status) => {
  if (status === "Pending") {
    return { next: "Confirmed", label: "Confirm Order" };
  }
  if (status === "Confirmed") {
    return { next: "Design Completed", label: "Mark Design Completed" };
  }
  if (status === "Design Completed") {
    return { next: "Delivered", label: "Mark as Delivered" };
  }
  return null; 
};


const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "pending":
      return "bg-red-100 text-red-700 border border-red-300";
    case "Confirmed":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "Design Completed":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    case "Delivered":
      return "bg-green-100 text-green-700 border border-green-300";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-300";
  }
};


  const statusAction = getNextStatus(localProfile?.status);

  const handleStatusChange = () => {
    if (!statusAction) return;
    mutate(
      { orderId: localProfile?.orderId, status: statusAction.next },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(
              res.message || `Order marked as ${statusAction.next}`
            );
            setLocalProfile((prev) => ({
              ...prev,
              status: statusAction.next,
            }));
          } else {
            toast.error(res.message || "Failed to update order status");
          }
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[95vw] 
          sm:max-w-2xl 
          lg:max-w-5xl 
          xl:max-w-6xl 
          max-h-[90vh] 
          overflow-y-auto 
          p-0 
          rounded-2xl
        "
      >
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b bg-gray-50 rounded-t-2xl">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Printing Details
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Complete details for card design and production
          </p>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 py-8 space-y-8">
          {/* User Info Section */}
          <div className="text-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-600 uppercase">
              Details Print in Card
            </h2>
            <Avatar className="w-24 h-24 mx-auto border-2 border-gray-200 shadow">
              <AvatarImage src={localProfile?.logoImage} />
              <AvatarFallback className="bg-gray-100 text-lg font-bold">
                {localProfile?.fullName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-gray-800">
              {localProfile?.fullName || "-"}
            </h2>
            <p className="text-lg text-gray-600">
              {localProfile?.designation || "-"}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <p>Email: {localProfile?.email || "-"}</p>
              <p>Contact: {localProfile?.phoneNumber || "-"}</p>
            </div>
          </div>

          {/* Status and Action Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 p-5 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <span
                className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusBadgeVariant(
                  localProfile?.status
                )}`}
              >
                {localProfile?.status || "unknown"}
              </span>
            </div>

            {statusAction && (
              <Button
                onClick={handleStatusChange}
                disabled={isPending}
                className={`px-6 py-2 rounded-lg shadow-md text-white ${
                  localProfile?.status === "Pending"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : localProfile?.status === "Confirmed"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : localProfile?.status === "Design Completed"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : localProfile?.status === "Delivered"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                {isPending ? "Processing..." : statusAction.label}
              </Button>
            )}
          </div>

          {/* Card Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Card & Profile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card Information */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Card Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Card Name</p>
                    <p className="font-medium text-gray-800">
                      {localProfile?.cardName || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="font-medium text-gray-800">
                      {localProfile?.category || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Quantity</p>
                    <p className="font-medium text-gray-800">
                      {localProfile?.quantity || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 mb-1">Front Design</p>
                    {localProfile?.frontImage ? (
                      <img
                        src={localProfile.frontImage}
                        alt="Card Front"
                        className="w-16 h-10 object-contain border rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Profile Details
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Full Name",
                      value: localProfile?.profileFullName,
                    },
                    { label: "Username", value: localProfile?.userName || "-" },
                    {
                      label: "Designation",
                      value: localProfile?.ProfileDesignation,
                    },
                    { label: "Email", value: localProfile?.profileEmail },
                    { label: "Contact No", value: localProfile?.profileNumber },
                    {
                      label: "WhatsApp",
                      value: localProfile?.watsappNumber || "-",
                    },
                    { label: "Bio", value: localProfile?.bio || "-" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="sm:col-span-2 text-sm font-medium text-gray-800 break-words">
                        {item.value || "-"}
                      </p>
                    </div>
                  ))}

                  {/* Profile Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <p className="text-sm text-gray-500">Profile Link</p>
                    <div className="sm:col-span-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyLink}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Copy Link
                      </Button>
                      <Copy className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>

                  {/* Profile Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <p className="text-sm text-gray-500">Profile Status</p>
                    <div className="sm:col-span-2">
                      <span
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          localProfile?.isActive
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-red-100 text-red-700 border border-red-300"
                        }`}
                      >
                        {localProfile?.isActive ? "Activated" : "Not Activated"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - QR Code & Contact */}
            <div className="flex flex-col gap-6">
              {/* QR Code */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Digital Profile QR
                </h3>
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="size-48 bg-white p-2 border rounded-lg flex items-center justify-center"
                    ref={qrRef}
                  >
                    <QRCodeCanvas
                      value={`https://taptune.in/#/profile?id=${localProfile?.viewId}`}
                      size={180}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      marginSize={5}
                      level="H"
                    />
                  </div>
                  <Button
                    onClick={handleDownloadQR}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm text-center">
                  <p className="font-medium text-gray-800">
                    {localProfile?.designation || "N/A"}
                  </p>
                  <p className="text-gray-600 break-all">
                    {localProfile?.email || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    {localProfile?.phoneNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
