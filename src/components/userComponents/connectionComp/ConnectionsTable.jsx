"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Save } from "lucide-react";
import { downloadVCard } from "@/utils/contactSave";

// CRM-focused color mapping
const statusColors = {
  New: "",
  Hot: "bg-green-100 text-green-800 border-green-200",
  Warm: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Cold: "bg-red-100 text-red-800 border-red-200",
  "Follow-up": "bg-purple-100 text-purple-800 border-purple-200",
};

export function ConnectionsTable({
  connections,
  isLoading,
  onLabelChange,
  isBusinessUser,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [leadStatuses, setLeadStatuses] = useState({});
  const ROWS_PER_PAGE = 10;

  useEffect(() => {
    const initialStatuses = {};
    if (connections) {
      connections.forEach((c) => {
        initialStatuses[c._id] = c.leadLabel || "New";
      });
    }
    setLeadStatuses(initialStatuses);
  }, [connections]);

  const totalPages = connections
    ? Math.ceil(connections.length / ROWS_PER_PAGE)
    : 0;
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentConnections = connections
    ? connections.slice(startIndex, startIndex + ROWS_PER_PAGE)
    : [];

  const handleLabelChange = (connectionId, newLabel) => {
    if (onLabelChange) {
      onLabelChange(connectionId, newLabel);
    }

    setLeadStatuses((prev) => ({ ...prev, [connectionId]: newLabel }));
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="w-full overflow-x-auto border rounded-lg">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-3/4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-16 float-right" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto border rounded-lg">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Pic</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden sm:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">
                Designation
              </TableHead>
              {isBusinessUser && (
              <TableHead className="w-[150px] text-center justify-center items-center">
                Lead Status
              </TableHead>
              )}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentConnections.map((c) => (
              <TableRow key={c._id}>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={"/placeholder.svg"} alt={c.name} />
                    <AvatarFallback>
                      {c.name ? c.name.charAt(0).toUpperCase() : "?"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{c.name || "-"}</TableCell>
                <TableCell className="text-gray-700">{c.email || "-"}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {c.phoneNumber || "-"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {c.designation || "-"}
                </TableCell>
                {isBusinessUser && (
                  <TableCell
                    className={" flex justify-center items-center text-center"}
                  >
                    <Select
                      value={leadStatuses[c._id] || "New"}
                      onValueChange={(value) => handleLabelChange(c._id, value)}
                    >
                      <SelectTrigger
                        className={`h-9 border font-semibold justify-center items-center text-center transition-colors duration-200 ${statusColors[leadStatuses[c._id] || "New"]
                          }`}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className={""}>
                        <SelectItem
                          value="New"
                          className={`${statusColors.New} hover:!bg-teal-200 mb-1`}
                        >
                          New
                        </SelectItem>

                        <SelectItem
                          value="Hot"
                          className={`${statusColors.Hot} hover:!bg-green-200 mb-1`}
                        >
                          Hot
                        </SelectItem>

                        <SelectItem
                          value="Warm"
                          className={`${statusColors.Warm} hover:!bg-yellow-200 mb-1`}
                        >
                          Warm
                        </SelectItem>

                        <SelectItem
                          value="Cold"
                          className={`${statusColors.Cold} hover:!bg-red-200 mb-1`}
                        >
                          Cold
                        </SelectItem>

                        {/* No margin-bottom on the last item to avoid extra space at the bottom of the SelectContent */}
                        <SelectItem
                          value="Follow-up"
                          className={`${statusColors["Follow-up"]} hover:!bg-purple-200`}
                        >
                          Follow-up
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                )}
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => downloadVCard(c)}
                    aria-label="Save Contact"
                    className="gap-2 bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
