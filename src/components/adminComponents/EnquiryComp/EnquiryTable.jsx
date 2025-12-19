"use client";

import { useState } from "react";
import Loader from "@/components/ui/Loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useUpdateEnquiryStatus } from "@/hooks/tanstackHooks/useEnquiries";

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    badge: "bg-gray-100 text-gray-700 border-gray-200",
    dot: "bg-gray-500",
  },
  {
    value: "contacted",
    label: "Contacted",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  {
    value: "follow-up",
    label: "Follow Up",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
  },
  {
    value: "ordered",
    label: "Ordered",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
  },
  {
    value: "closed",
    label: "Closed",
    badge: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
];



export default function EnquiriesTable({
  data = [],
  total = 0,
  loading = false,
}) {
  const { mutate: updateStatus } = useUpdateEnquiryStatus();
  const [updatingId, setUpdatingId] = useState(null);

  const truncateText = (text, limit = 30) => {
    if (!text) return "";
    return text.length > limit ? `${text.slice(0, limit)}......` : text;
  };

  const getStatusStyles = (statusValue) => {
    return (
      STATUS_OPTIONS.find((opt) => opt.value === statusValue) ||
      STATUS_OPTIONS[0]
    );
  };

  const handleStatusChange = (enquiryId, value) => {
    setUpdatingId(enquiryId);
    updateStatus(
      { enquiryId, status: value },
      { onSettled: () => setUpdatingId(null) }
    );
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="w-full">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow>
                <TableHead className="w-12 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                  #
                </TableHead>
                <TableHead className="font-bold text-gray-700">
                  Customer
                </TableHead>
                <TableHead className="font-bold text-gray-700">
                  Contact
                </TableHead>
                <TableHead className="font-bold text-gray-700 w-[280px]">
                  Message
                </TableHead>
                <TableHead className="font-bold text-gray-700">Date</TableHead>
                <TableHead className="text-center font-bold text-gray-700">
                  Status
                </TableHead>
                <TableHead className="text-right font-bold text-gray-700 pr-6">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((enquiry, index) => {
                  const currentStatus = getStatusStyles(enquiry.status);
                  return (
                    <TableRow
                      key={enquiry._id}
                      className="group hover:bg-blue-50/30 transition-colors"
                    >
                      <TableCell className="text-center text-gray-400 text-xs font-medium">
                        {index + 1}
                      </TableCell>

                      <TableCell className="font-semibold text-gray-900">
                        {enquiry.name}
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <span className="text-gray-600 truncate max-w-[150px]">
                            {enquiry.email || "—"}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {enquiry.phoneNumber || "—"}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="max-w-[280px]">
                        {enquiry.message ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-sm text-muted-foreground cursor-help leading-relaxed">
                                {truncateText(enquiry.message, 33)}
                              </p>
                            </TooltipTrigger>

                            <TooltipContent
                              side="top"
                              align="start"
                              className="max-w-sm text-sm leading-relaxed"
                            >
                              {enquiry.message}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <span className="text-sm italic text-muted-foreground">
                            No message provided
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border uppercase tracking-tight ${currentStatus.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${currentStatus.dot}`}
                          />
                          {currentStatus.label}
                        </span>
                      </TableCell>

                      <TableCell className="text-right pr-6">
                        <div className="flex flex-col items-end gap-1">
                          <Select
                            value={enquiry.status}
                            disabled={updatingId === enquiry._id}
                            onValueChange={(val) =>
                              handleStatusChange(enquiry._id, val)
                            }
                          >
                            <SelectTrigger className="w-[130px] h-8 text-xs bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent
                              align="end"
                              className="min-w-[150px]"
                            >
                              {STATUS_OPTIONS.map((opt) => (
                                <SelectItem
                                  key={opt.value}
                                  value={opt.value}
                                  className="focus:bg-gray-50 cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`h-2 w-2 rounded-full ${opt.dot}`}
                                    />
                                    <span className="text-xs font-medium text-gray-700">
                                      {opt.label}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {updatingId === enquiry._id && (
                            <span className="text-[10px] text-blue-500 font-bold animate-pulse uppercase pr-1">
                              Updating...
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-gray-400 font-medium"
                  >
                    No enquiries found in the database.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
