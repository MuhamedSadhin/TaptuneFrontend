"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, ListChecks } from "lucide-react";
import * as XLSX from "xlsx";

// --- Base Export Fields (Always Included) ---
const BASE_EXPORT_FIELDS = {
  profileName: { label: "Associated Profile Name" },
  profileEmail: { label: "Associated Profile Email" },
  connectedAt: { label: "Connected At" },

  connectionName: { label: "Connected Person Name" },
  connectionEmail: { label: "Connected Email" },
  phoneNumber: { label: "Personal Phone" },
  designation: { label: "Designation" },
};

// --- Business Export Fields (Conditional) ---
const BUSINESS_EXPORT_FIELDS = {
  businessName: { label: "Business Name" },
  businessPhone: { label: "Business Phone" },
  leadLabel: { label: "Lead Label" },

  website: { label: "Website" },
  businessCategory: { label: "Business Category" },
  businessAddress: { label: "Business Address" },
  notes: { label: "Notes" },
};

export function DownloadConnectionsDialog({
  isBusinessUser,
  connections,
  profiles,
  selectedProfileId,
  disabled,
}) {
  // Determine active fields based on user type
  const activeExportFields = useMemo(() => {
    return isBusinessUser
      ? { ...BASE_EXPORT_FIELDS, ...BUSINESS_EXPORT_FIELDS }
      : BASE_EXPORT_FIELDS;
  }, [isBusinessUser]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState(() => {
    const initialFields = { all: true };
    for (const key in activeExportFields) {
      initialFields[key] = true;
    }
    return initialFields;
  });

  // Reset state when user type changes
  useEffect(() => {
    const initialFields = { all: true };
    for (const key in activeExportFields) {
      initialFields[key] = true;
    }
    setSelectedFields(initialFields);
  }, [activeExportFields]);

  // Keep "all" checkbox synced
  useEffect(() => {
    const allFieldKeys = Object.keys(activeExportFields);
    const allChecked = allFieldKeys.every((key) => selectedFields[key]);

    if (allChecked !== selectedFields.all) {
      setSelectedFields((prev) => ({ ...prev, all: allChecked }));
    }
  }, [selectedFields, activeExportFields]);

  const handleFieldChange = (field) => {
    if (field === "all") {
      const isCheckingAll = !selectedFields.all;
      const newFields = { all: isCheckingAll };
      for (const key in activeExportFields) {
        newFields[key] = isCheckingAll;
      }
      setSelectedFields(newFields);
    } else {
      setSelectedFields((prev) => {
        const newState = {
          ...prev,
          [field]: !prev[field],
          all: false,
        };

        const allFieldKeys = Object.keys(activeExportFields);
        const allCheckedAfterChange = allFieldKeys.every((key) =>
          key === field ? !prev[field] : prev[key]
        );

        return { ...newState, all: allCheckedAfterChange };
      });
    }
  };

  const handleDownload = () => {
    if (!connections || connections.length === 0) {
      console.warn("No connections to export.");
      setIsOpen(false);
      return;
    }

    const dataForExcel = connections.map((conn) => {
      const associatedProfile = profiles.find((p) => p._id === conn.profileId);
      const row = {};

      Object.entries(activeExportFields).forEach(([key, { label }]) => {
        if (selectedFields[key]) {
          let value = "";
          const header = label;

          if (key === "profileName") {
            value = conn.profileName || associatedProfile?.fullName || "N/A";
          } else if (key === "profileEmail") {
            value = associatedProfile?.email || "N/A";
          } else if (key === "connectedAt") {
            value = conn.connectedAt
              ? new Date(conn.connectedAt).toLocaleDateString()
              : "N/A";
          } else if (key.startsWith("connection")) {
            const connKey = key.replace("connection", "").toLowerCase();
            value = conn[connKey] || "";
          } else {
            value = conn[key] || "";
          }

          row[header] = value;
        }
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Connections");

    const today = new Date().toISOString().slice(0, 10);
    const currentProfile = profiles.find((p) => p._id === selectedProfileId);

    const profileName = currentProfile
      ? currentProfile.fullName?.replace(/\s+/g, "_") || "Selected_Profile"
      : "All_Connections";
    const fileName = `${profileName}_Export_${today}.xlsx`;

    XLSX.writeFile(workbook, fileName);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] h-[96vh] sm:h-auto max-h-[96vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Export Options</DialogTitle>
          <DialogDescription>
            Select the connection fields you want to include in the Excel
            export.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable area */}
        <ScrollArea className="flex-grow py-4 pr-4">
          <div className="grid gap-3">
            {/* Select All */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="all"
                checked={selectedFields.all}
                onCheckedChange={() => handleFieldChange("all")}
              />
              <Label
                htmlFor="all"
                className="font-bold cursor-pointer text-base"
              >
                Select All Fields
              </Label>
            </div>

            <Separator className="my-1" />

            {/* Base Fields */}
            {Object.entries(BASE_EXPORT_FIELDS).map(([key, { label }]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedFields[key]}
                  disabled={selectedFields.all}
                  onCheckedChange={() => handleFieldChange(key)}
                />
                <Label
                  htmlFor={key}
                  className="text-sm font-normal text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  {label}
                </Label>
              </div>
            ))}

            {/* Business Fields */}
            {isBusinessUser && (
              <>
                <Separator className="my-2" />
                <h5 className="font-semibold text-sm mt-1">Business Details</h5>
                {Object.entries(BUSINESS_EXPORT_FIELDS).map(
                  ([key, { label }]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={selectedFields[key]}
                        disabled={selectedFields.all}
                        onCheckedChange={() => handleFieldChange(key)}
                      />
                      <Label
                        htmlFor={key}
                        className="text-sm font-normal text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        {label}
                      </Label>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </ScrollArea>

        {/* Footer always bottom */}
        <DialogFooter className="mt-auto">
          <Button
            onClick={handleDownload}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <ListChecks className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
