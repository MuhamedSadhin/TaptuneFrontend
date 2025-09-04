"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import OrderTable from "@/components/adminComponents/OrderComp/OrderTable";
import { useGetOrderStatistics } from "@/hooks/tanstackHooks/useOrder";

import { PackageCheck, Users, Clock, CalendarDays } from "lucide-react";
import { useState } from "react";

export default function CardOrder() {
  const { data, isLoading } = useGetOrderStatistics();
  const [activeTab, setActiveTab] = useState("Active");

  const stats = [
    {
      label: "Total Orders",
      value: data?.data?.totalOrders ?? "-",
      icon: <PackageCheck className="w-5 h-5 text-muted-foreground" />,
    },
    {
      label: "Active Profiles",
      value: data?.data?.activeProfiles ?? "-",
      icon: <Users className="w-5 h-5 text-muted-foreground" />,
    },
    {
      label: "Pending Orders",
      value: data?.data?.pendingOrders ?? "-",
      icon: <Clock className="w-5 h-5 text-muted-foreground" />,
    },
    {
      label: "This Month",
      value: data?.data?.ordersThisMonth ?? "-",
      icon: <CalendarDays className="w-5 h-5 text-muted-foreground" />,
    },
  ];


  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-1 rounded-2xl overflow-hidden">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="shadow-sm">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Skeleton className="h-8 w-14" />
                  <Skeleton className="h-6 w-10" />
                </CardContent>
              </Card>
            ))
          : stats.map((stat, i) => (
              <Card
                key={i}
                className="rounded-none border-1"
              >
                <CardContent className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-gray-600 tracking-wide">
                      {stat.label}
                    </p>
                    <h3 className="text-3xl font-bold text-purple-600">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-500">All student count</p>
                  </div>

                  {/* Right side icon */}
                  {stat.icon}
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Order Table */}
      <OrderTable status={activeTab} />
    </div>
  );
}
