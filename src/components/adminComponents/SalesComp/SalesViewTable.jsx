"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import SalesStatsCard from "./SalesStatsCard";
import { useViewAllSalesUsersWithProfiles } from "@/hooks/tanstackHooks/useSales";
import { useParams } from "react-router-dom";
import UserProfileCard from "./UserProfileCard";
import Loader from "@/components/ui/Loader";

const ITEMS_PER_PAGE = 10;

export default function SalesUsersTable() {
  const params = useParams();
  const salesmanId = params?.id || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [expandedUsers, setExpandedUsers] = useState({});
  const [accountTypeFilter, setAccountTypeFilter] = useState("all");
  const [isActiveFilter, setIsActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filters = {
    salesmanId,
    search: debouncedSearch,
    accountType: accountTypeFilter,
    isActive: isActiveFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  };

  const { data, isLoading } = useViewAllSalesUsersWithProfiles(filters);
  const users = data?.data || [];
  const totalUsers = data?.total || 0;
  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  // Destructure stats to send to SalesStatsCard
  const { stats = {} } = data || {};
  const {
    totalUsers: totalUsersStat = 0,
    usersThisMonth = 0,
    totalProfiles = 0,
    totalPendingOrders = 0,
  } = stats;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const toggleUser = (userId) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const goToPage = (page) => {
    const pageNum = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNum);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Pass destructured stats to SalesStatsCard */}
      <SalesStatsCard
        salesmanId={salesmanId}
        stats={{
          totalUsers: totalUsersStat,
          usersThisMonth,
          totalProfiles,
          totalPendingOrders,
        }}
      />

      <Separator />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Search by name, email, or profile email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/3"
        />

        <div className="flex gap-3">
          <Select
            value={accountTypeFilter}
            onValueChange={setAccountTypeFilter}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Account Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Account Types</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>

          <Select value={isActiveFilter} onValueChange={setIsActiveFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader className="animate-spin h-8 w-8" />
        </div>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 gap-1">
          {users.map((user) => (
            <UserProfileCard
              key={user._id}
              user={user}
              isExpanded={expandedUsers[user._id]}
              onToggle={() => toggleUser(user._id)}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No users found matching your search.
          </p>
        </Card>
      )}

      {/* Pagination */}
      {totalUsers > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, totalUsers)} of {totalUsers}{" "}
            users
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <span className="px-3 py-1 bg-primary text-white rounded">
              {currentPage}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              &gt;&gt;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
