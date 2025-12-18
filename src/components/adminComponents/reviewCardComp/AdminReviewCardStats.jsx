"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Clock, Palette, CheckCircle, TrendingUp } from "lucide-react";
import { useGetAllReviewCardOrders } from "@/hooks/tanstackHooks/useReviewCard";

/* ---------------- STAT CARD ---------------- */

function StatCard({ title, value, icon: Icon, color }) {
  const colorMap = {
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      icon: "text-amber-600",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: "text-blue-600",
    },
    violet: {
      bg: "bg-violet-50",
      text: "text-violet-700",
      icon: "text-violet-600",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      icon: "text-emerald-600",
    },
  };

  const styles = colorMap[color];

  return (
    <Card className="shadow-sm hover:shadow-md transition p-0">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className={`text-3xl font-semibold ${styles.text}`}>{value}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            Live data
          </div>
        </div>
        <div className={`p-3 rounded-xl ${styles.bg}`}>
          <Icon className={`h-6 w-6 ${styles.icon}`} />
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- MAIN STATS COMPONENT ---------------- */

export default function AdminReviewCardStats() {
  const { data, isLoading } = useGetAllReviewCardOrders("all");

  const orders = data?.data || [];

  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      designCompleted: orders.filter((o) => o.status === "design_completed")
        .length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    };
  }, [orders]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="h-28 animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={stats.total}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Confirmed"
          value={stats.confirmed}
          icon={CheckCircle}
          color="blue"
        />
        <StatCard
          title="Design Completed"
          value={stats.designCompleted}
          icon={Palette}
          color="violet"
        />
      </div>
    </div>
  );
}
