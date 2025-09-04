"use client";

import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronLeft, ChevronRight, Copy, Loader2, XCircle } from "lucide-react";
import { IoCheckboxOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useGetAllUsers } from "@/hooks/tanstackHooks/useUser";
import { useSendMessage } from "@/hooks/tanstackHooks/useWabtune";
import Loader from "@/components/ui/Loader";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [localSearch, setLocalSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const sendMessageMutation = useSendMessage();
  const [sendingUserId, setSendingUserId] = useState(null);

  const tableRef = useRef(null); 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(localSearch);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [localSearch]);

  const { data, isLoading } = useGetAllUsers({
    page: currentPage,
    limit,
    search,
  });

  const users = data?.data || [];
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage, search]);

  const handleSendMessageClick = (user) => {
    setSendingUserId(user._id);

    sendMessageMutation.mutate(
      { phoneNumber: user.phoneNumber, name: user.name },
      {
        onSettled: () => setSendingUserId(null),
      }
    );
  };


  return (
    <div ref={tableRef} className="">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div>
          <h2 className="text-2xl font-bold">User</h2>
          <p className="text-sm text-muted-foreground">
            All Users are displayed Here .
          </p>
        </div>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Input
            placeholder="Search"
            className="h-10 w-full sm:w-64 rounded-md border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none px-3 text-sm"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table className="w-full text-sm border md:mt-5">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[60px] text-left">No</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Contact</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-center">Ordered</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-left">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex flex-col items-center justify-center gap-3 mt-40">
                  <Loader className="animate-spin h-6 w-6 text-gray-500" />
                  {/* <span className="text-sm text-gray-500">Loading...</span> */}
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="text-center text-gray-500 py-6">
                  No users found
                </div>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow key={user._id} className="border-t">
                <TableCell>{index + 1 + (currentPage - 1) * limit}</TableCell>
                <TableCell className="space-y-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </TableCell>
                <TableCell>{user.phoneNumber || "-"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-center">
                  {user.isOrdered ? (
                    <CheckCircle className="text-green-600 w-5 h-5 mx-auto" />
                  ) : (
                    <XCircle className="text-red-600 w-5 h-5 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {user.isOrdered ? (
                    <Button variant={"outline"}>Profile Ordered</Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="bg-green-700 text-white hover:bg-green-900"
                      onClick={() => handleSendMessageClick(user)}
                      disabled={
                        sendingUserId === user._id &&
                        sendMessageMutation.isPending
                      }
                    >
                      {sendingUserId === user._id &&
                      sendMessageMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="animate-spin h-4 w-4 mx-auto" />
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserTable;
