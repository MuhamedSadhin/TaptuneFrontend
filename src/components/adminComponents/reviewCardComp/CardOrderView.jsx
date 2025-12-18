"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ExternalLink, ImageOff, Copy, CheckCircle, Package, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useGetAllReviewCardOrders, useUpdateReviewCardOrderStatus } from "@/hooks/tanstackHooks/useReviewCard";
import Loader from "@/components/ui/Loader";

/* ---------------- STATUS CONFIG ---------------- */

const statusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  design_completed: {
    label: "Design Completed",
    bg: "bg-violet-50 text-violet-700 border-violet-200",
  },
  delivered: {
    label: "Delivered",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

function StatusBadge({ status }) {
  const config = statusConfig[status];
  if (!config) return null;

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg}`}
    >
      {config.label}
    </span>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function AdminReviewCardOrders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, isLoading } = useGetAllReviewCardOrders(statusFilter);
    const { mutate } = useUpdateReviewCardOrderStatus()
    const orders = data?.data || [];
    console.log('Orders :', orders);

  const filteredOrders = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return orders.filter(
      (o) =>
        o.brandName?.toLowerCase().includes(q) ||
        o.googleReviewUrl?.toLowerCase().includes(q)
    );
  }, [orders, searchQuery]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const handleCopy = async (url) => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
    };

    const [selectedStatus, setSelectedStatus] = useState("pending");

    const handleUpdateStatus = ({ orderId, status }) => {
      mutate(
        { orderId, status },
        {
          onSuccess: () => {
            toast.success("Order status updated");
            setSelectedOrder(null);
          },
          onError: () => {
            toast.error("Failed to update status");
          },
        }
      );
    };
const STATUS_FLOW = {
  pending: {
    next: "confirmed",
    label: "Confirm",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  confirmed: {
    next: "design_completed",
    label: "Mark Design Completed",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    button: "bg-violet-600 hover:bg-violet-700",
  },
  design_completed: {
    next: "delivered",
    label: "Mark Delivered",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    button: "bg-emerald-700 hover:bg-emerald-800",
  },
};


const handleDownloadLogo = (url) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = "logo"; // force filename as "logo"
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div><Loader className="animate-spin"/></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Review Card Orders</h1>
        <p className="text-sm text-muted-foreground">
          View and manage all review card orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-row sm:flex-row gap-3 justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by brand or URL..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="design_completed">Design Completed</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="overflow-x-auto rounded-md px-0 py-0">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <Package className="h-10 w-10 text-slate-400" />
            </div>

            {/* Title */}
            <h3 className="mt-6 text-lg font-semibold text-slate-800">
              No Orders Found
            </h3>

            {/* Description */}
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              There are no review card orders matching your current filters. Try
              changing the status or search keywords.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Review URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    {order.brandName}
                  </TableCell>

                  <TableCell className="truncate max-w-[220px] text-slate-600">
                    {order.googleReviewUrl}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      {formatDate(order.createdAt)}
                      <div className="text-xs text-muted-foreground">
                        {formatTime(order.createdAt)}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* ---------------- VIEW MODAL ---------------- */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Review Card Details
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* -------- LOGO PREVIEW -------- */}
              <div className="flex justify-center">
                {selectedOrder.logo ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-40 h-40 rounded-xl border border-border bg-muted flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 animate-pulse bg-slate-200" />
                      <img
                        src={selectedOrder.logo}
                        alt="Brand Logo"
                        className="max-h-full max-w-full object-contain relative z-10"
                        onLoad={(e) => {
                          e.currentTarget.previousSibling.style.display =
                            "none";
                        }}
                      />
                    </div>

                  </div>
                ) : (
                  <div className="w-40 h-40 rounded-xl border border-dashed border-border bg-muted flex flex-col items-center justify-center text-muted-foreground">
                    <ImageOff className="h-8 w-8" />
                    <span className="text-xs mt-2">No logo uploaded</span>
                  </div>
                )}
              </div>

              {/* -------- REVIEW URL -------- */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Google Review URL</label>
                <div className="flex gap-2">
                  <Input
                    value={selectedOrder.googleReviewUrl}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(selectedOrder.googleReviewUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      window.open(selectedOrder.googleReviewUrl, "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* -------- STATUS + ACTION (SAME LINE) -------- */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border bg-muted/40 px-4 py-3">
                {/* LEFT : CURRENT STATUS */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Current Status:
                  </span>

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-semibold border capitalize
        ${
          STATUS_FLOW[selectedOrder.status]?.badge ||
          "bg-emerald-200 text-emerald-800 border-emerald-200"
        }`}
                  >
                    {selectedOrder.status.replace("_", " ")}
                  </span>
                </div>

                {/* RIGHT : ACTION BUTTON */}
                {STATUS_FLOW[selectedOrder.status] ? (
                  <Button
                    onClick={() =>
                      handleUpdateStatus({
                        orderId: selectedOrder._id,
                        status: STATUS_FLOW[selectedOrder.status].next,
                      })
                    }
                    className={`${
                      STATUS_FLOW[selectedOrder.status].button
                    } text-white px-6`}
                  >
                    {STATUS_FLOW[selectedOrder.status].label}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Order Delivered
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
