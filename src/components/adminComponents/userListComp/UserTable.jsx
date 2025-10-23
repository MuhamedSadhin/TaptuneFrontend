
"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Loader from "@/components/ui/Loader";
import { useGetAllUsers } from "@/hooks/tanstackHooks/useUser";
import { useGetAllSalesman } from "@/hooks/tanstackHooks/useSales";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import SelectSalesmanModal from "./SelectSalesmanModal";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [localSearch, setLocalSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsersState, setSelectedUsersState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalesmanFilter, setSelectedSalesmanFilter] = useState("all");
  const limit = 10;
  const tableRef = useRef(null);

  // Fetch all salesmen
  const { data: salesmenResponse } = useGetAllSalesman();
  const salesmen = Array.isArray(salesmenResponse?.data)
    ? salesmenResponse.data
    : [];

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(localSearch);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [localSearch]);

  // Fetch users
  const { data, isLoading } = useGetAllUsers({
    page: currentPage,
    limit,
    search,
    salesmanId: selectedSalesmanFilter,
  });

  const users = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // Scroll to top on page change
  useEffect(() => {
    if (tableRef.current)
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage, search, selectedSalesmanFilter]);

  // Selected IDs
  const selectedIds = useMemo(
    () => selectedUsersState.map((u) => u._id),
    [selectedUsersState]
  );

  // Toggle user selection
  const handleCheckboxChange = (user) => {
    setSelectedUsersState((prev) => {
      const exists = prev.some((p) => p._id === user._id);
      if (exists) return prev.filter((p) => p._id !== user._id);
      return [...prev, user];
    });
  };

  // Select all on current page
  const isAllSelectedOnPage =
    users.length > 0 && users.every((u) => selectedIds.includes(u._id));

  const handleSelectAll = () => {
    if (isAllSelectedOnPage) {
      setSelectedUsersState((prev) =>
        prev.filter((p) => !users.some((u) => u._id === p._id))
      );
    } else {
      setSelectedUsersState((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newOnes = users.filter((u) => !existingIds.has(u._id));
        return [...prev, ...newOnes];
      });
    }
  };

  // Open modal only when assign button is clicked
  const handleAssignLeads = () => {
    if (selectedUsersState.length === 0) {
      alert("Please select at least one user before assigning.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleRemoveUserFromParent = (userId) => {
    setSelectedUsersState((prev) => prev.filter((u) => u._id !== userId));
  };

  // After selecting salesman
  const handleSalesmanSelected = ({ salesman, selectedUsers }) => {
    if (!salesman || !selectedUsers || selectedUsers.length === 0) return;

    console.log(
      "Assigning to salesman:",
      salesman._id,
      "users:",
      selectedUsers.map((u) => u._id)
    );

    // Remove assigned users from parent selection
    setSelectedUsersState((prev) =>
      prev.filter((u) => !selectedUsers.some((su) => su._id === u._id))
    );

    setIsModalOpen(false);
  };

  return (
    <div ref={tableRef} className="w-full">
      <div className="mb-6 md:mb-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-2xl font-bold text-foreground tracking-tight">
            Users
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            All registered users are listed here.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 flex-1">
            <Input
              placeholder="Search users by name or email..."
              className="h-10 flex-1 sm:w-64 border border-border rounded-lg px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              aria-label="Search users"
            />

            <select
              className="h-10 border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all cursor-pointer"
              value={selectedSalesmanFilter}
              onChange={(e) => {
                setSelectedSalesmanFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by salesman"
            >
              <option value="all">All Salesmen</option>
              <option value="directLead">Direct Lead</option>
              {salesmen.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 justify-start">
            <Button
              className="h-10 px-6 bg-purple-600 hover:bg-purple-700 text-primary-foreground font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAssignLeads}
              disabled={selectedUsersState.length === 0 || isLoading}
            >
              Assign Leads
            </Button>
          </div>
        </div>
        <div className="flex justify-end px-2 py-1">
          {selectedUsersState.length > 0 && (
            <span className="text-xs sm:text-sm md:text-base text-blue-600 font-medium ml-2">
              ({selectedUsersState.length} user
              {selectedUsersState.length !== 1 ? "s" : ""} selected)
            </span>
          )}
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card ">
        <div className="overflow-x-auto">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
                <TableHead className="w-12 text-center px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isAllSelectedOnPage}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-border cursor-pointer focus:ring-2 focus:ring-primary"
                    aria-label="Select all users on this page"
                  />
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-foreground">
                  No
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-foreground">
                  Name
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-foreground hidden sm:table-cell">
                  Phone
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-foreground hidden md:table-cell">
                  Email
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-foreground hidden lg:table-cell">
                  Lead By
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-foreground text-center">
                  Ordered
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-foreground hidden sm:table-cell">
                  Created
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                <div className="flex justify-center items-center w-full h-64">
                  <Loader className="animate-spin h-6 w-6 text-muted-foreground" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="text-muted-foreground">
                      <p className="text-sm md:text-base">No users found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, idx) => (
                  <TableRow
                    key={user._id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="text-center px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user._id)}
                        onChange={() => handleCheckboxChange(user)}
                        className="w-4 h-4 rounded border-border cursor-pointer focus:ring-2 focus:ring-primary"
                        aria-label={`Select ${user.name}`}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-foreground font-medium">
                      {idx + 1 + (currentPage - 1) * limit}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="font-medium text-foreground">
                        {user.name}
                      </div>
                      <div className="text-xs text-muted-foreground md:hidden">
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-foreground hidden sm:table-cell">
                      {user.phoneNumber || "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-foreground hidden md:table-cell truncate">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-4 py-3  lg:table-cell text-center">
                      {user.referalId?.name ? (
                        <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                          {user.referalId.name}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full">
                          Direct Lead
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-center">
                      {user.isOrdered ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                          <Check className="text-green-600 dark:text-green-400 w-4 h-4" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30">
                          <X className="text-red-600 dark:text-red-400 w-4 h-4" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-foreground hidden sm:table-cell text-xs md:text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6 flex flex-row gap-4 sm:flex-row items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <span>
            Page cd{" "}
            <span className="font-medium text-foreground">{currentPage}</span>{" "}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="h-9 px-3 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to first page"
            title="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="h-9 px-3 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to previous page"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium text-foreground px-3 py-2 bg-muted rounded-lg">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-9 px-3 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to next page"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="h-9 px-3 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to last page"
            title="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <SelectSalesmanModal
        selectedUsers={selectedUsersState}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSalesmanSelected}
        onRemoveUserFromParent={handleRemoveUserFromParent}
      />
    </div>
  );
};

export default UserTable;
