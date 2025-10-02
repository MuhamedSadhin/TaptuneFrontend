"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, TableIcon } from "lucide-react";
import Loader from "@/components/ui/Loader";
import {
  useGetAllConnections,
  useUpdateConnectionLabel,
} from "@/hooks/tanstackHooks/useConnections";
import { useGetAllProfile } from "@/hooks/tanstackHooks/useProfile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConnectionsTable } from "@/components/userComponents/connectionComp/ConnectionsTable";
import { ConnectionsGrid } from "@/components/userComponents/connectionComp/ConnectionsGrid";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";
import  { DownloadConnectionsDialog } from "@/components/userComponents/connectionComp/DownloadConnectionsDialog";


const STATUS_LABELS = [
  "All Statuses",
  "New",
  "Hot",
  "Warm",
  "Cold",
  "Follow-up",
];

export default function ConnectionsPage() {
  const { user } = useAuthUser();
  const isBusinessUser = user?.accountType === "business";

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const { mutate: updateConnectionLabel } = useUpdateConnectionLabel();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (user && !isBusinessUser && selectedLabel !== "") {
      setSelectedLabel("");
    }
  }, [user, isBusinessUser, selectedLabel]);

  const { data: profilesData, isLoading: profilesLoading } = useGetAllProfile();
  const profiles = profilesData?.profile || [];

  // Pass all filters to the hook; the API now handles the filtering.
  const { data: connectionsData, isLoading } = useGetAllConnections({
    search: debouncedSearch,
    profileId: selectedProfile,
    leadlabel: selectedLabel,
  });

  // Data from the API is already filtered, no client-side useMemo needed.
  const filteredConnections = connectionsData?.data || [];

  const handleLabelUpdate = (connectionId, newLabel) => {
    if (isBusinessUser) {
      updateConnectionLabel({ connectionId, leadLabel: newLabel });
    } else {
      console.warn("Label update attempted by non-business user.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* --- HEADER AND CONTROLS SECTION --- */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4">
          {/* Left Side: Title */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Connected Users
            </h1>
            <p className="text-gray-600">
              Manage and export your professional connections
            </p>
          </div>

          {/* Right Side: Container for all controls */}
          <div className="flex flex-col items-stretch md:items-end gap-4 w-full md:w-auto">
            {/* Row 1: Filters and Actions */}
            <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto">
              {/* Filter by Profile */}
              <Select
                value={selectedProfile || "all"}
                onValueChange={(val) =>
                  setSelectedProfile(val === "all" ? "" : val)
                }
                disabled={profilesLoading}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-white">
                  <SelectValue placeholder="Filter by profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Profiles</SelectItem>
                  {profiles.map((p) => (
                    <SelectItem key={p._id} value={p._id}>
                      {p.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filter by Lead Status (CONDITIONAL RENDER) */}
              {isBusinessUser && (
                <Select
                  value={selectedLabel || "All Statuses"}
                  onValueChange={(val) =>
                    setSelectedLabel(val === "All Statuses" ? "" : val)
                  }
                >
                  <SelectTrigger className="w-full sm:w-[160px] bg-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_LABELS.map((label) => (
                      <SelectItem key={label} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search connections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full bg-white"
                />
              </div>

              {/* Download Button */}
              <DownloadConnectionsDialog
                isBusinessUser={isBusinessUser}
                connections={filteredConnections}
                profiles={profiles}
                selectedProfileId={selectedProfile}
                disabled={filteredConnections.length === 0 || isLoading}
              />
            </div>

            {/* Row 2: View Mode Switch */}
            <div className="inline-flex self-end md:self-end rounded-md border gap-2 bg-white p-1">
              <Button
                size="sm"
                variant={"ghost"}
                className={`transition-colors ${
                  viewMode === "table"
                    ? "bg-purple-600 text-white hover:bg-purple-700 hover:text-white"
                    : " hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("table")}
              >
                <TableIcon className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Table</span>
              </Button>

              <Button
                size="sm"
                variant={"ghost"}
                className={`transition-colors ${
                  viewMode === "card"
                    ? "bg-purple-600 text-white hover:bg-purple-700 hover:text-white"
                    : " hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("card")}
              >
                <LayoutGrid className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Cards</span>
              </Button>
            </div>
          </div>
        </div>

        {/* --- Content Display Section --- */}
        <div className="min-h-[300px] flex flex-col">
          {isLoading && filteredConnections.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <Loader />
            </div>
          ) : filteredConnections.length === 0 ? (
            <div className="text-center py-12 w-full">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No connections found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter terms
              </p>
            </div>
          ) : viewMode === "table" ? (
            <ConnectionsTable
              connections={filteredConnections}
              isLoading={isLoading}
              onLabelChange={isBusinessUser ? handleLabelUpdate : undefined}
              isBusinessUser={isBusinessUser}
            />
          ) : (
            <ConnectionsGrid
              connections={filteredConnections}
              isBusinessUser={isBusinessUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}
