"use client";

import React from "react";
import {
  FiUserPlus,
  FiUsers,
  FiClock,
  FiAward,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { useGetEachSalesmanStats } from "@/hooks/tanstackHooks/useSales";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ shadcn skeleton component

const CardBackgroundPattern = () => (
  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
    <svg
      className="absolute right-0 top-0 h-full w-auto translate-x-1/3 -translate-y-1/4 text-white/10"
      width="278"
      height="278"
      viewBox="0 0 278 278"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M278 139C278 215.755 215.755 278 139 278C62.2451 278 0 215.755 0 139C0 62.2451 62.2451 0 139 0C215.755 0 278 62.2451 278 139Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

const StatCard = ({
  title,
  value,
  change,
  changeType,
  period,
  Icon,
  isPrimary = false,
}) => {
  const baseClasses =
    "relative overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md";

  const themeClasses = isPrimary
    ? "bg-purple-600 text-white"
    : "bg-white text-gray-900 border border-gray-100";

  const changeColor =
    changeType === "increase"
      ? isPrimary
        ? "text-green-200"
        : "text-green-600"
      : isPrimary
      ? "text-red-200"
      : "text-red-500";

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      {isPrimary && <CardBackgroundPattern />}
      <div className="relative flex flex-col justify-between h-full">
        <div>
          <h3
            className={`text-sm font-medium ${
              isPrimary ? "text-purple-100" : "text-gray-500"
            }`}
          >
            {title}
          </h3>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
        </div>

        <div className="mt-5 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${changeColor}`}>
              {changeType === "increase" ? (
                <FiArrowUp className="h-4 w-4" />
              ) : (
                <FiArrowDown className="h-4 w-4" />
              )}
              <span>{change}</span>
            </div>
            <span
              className={`${isPrimary ? "text-purple-100" : "text-gray-500"}`}
            >
              {period}
            </span>
          </div>
        </div>

        <div
          className={`absolute bottom-3 right-3 p-3 rounded-xl ${
            isPrimary ? "bg-white/20" : "bg-purple-100"
          }`}
        >
          <Icon
            className={`h-6 w-6 ${
              isPrimary ? "text-white" : "text-purple-700"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

// ✅ Skeleton card for loading state
const SkeletonCard = ({ isPrimary = false }) => {
  const baseClasses =
    "relative overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-300 ease-in-out";
  const themeClasses = isPrimary
    ? "bg-purple-600 text-white"
    : "bg-white border border-gray-100";

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      {isPrimary && <CardBackgroundPattern />}
      <div className="relative flex flex-col justify-between h-full space-y-4">
        <Skeleton
          className={`h-3 w-20 ${
            isPrimary ? "bg-white/30" : "bg-gray-200"
          } rounded`}
        />
        <Skeleton
          className={`h-6 w-20 ${
            isPrimary ? "bg-white/40" : "bg-gray-200"
          } rounded`}
        />
        <div className="flex justify-between items-center mt-5">
          <Skeleton
            className={`h-3 w-16 ${
              isPrimary ? "bg-white/30" : "bg-gray-200"
            } rounded`}
          />
          <Skeleton
            className={`h-4 w-6 rounded-xl ${
              isPrimary ? "bg-white/30" : "bg-gray-200"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default function SalesStatsCard({ salesmanId }) {
  const { data, isLoading, isError } = useGetEachSalesmanStats(salesmanId);

  const stats = data?.data || {
    totalUsers: 0,
    totalProfiles: 0,
    usersThisMonth: 0,
    pendingOrders: 0,
  };

  const statsData = [
    {
      title: "TOTAL USERS",
      value: stats.totalUsers,
      change: "0%",
      changeType: "increase",
      period: "overall",
      Icon: FiUsers,
      isPrimary: true,
    },
    {
      title: "USERS THIS MONTH",
      value: stats.usersThisMonth,
      change: "0%",
      changeType: "increase",
      period: "this month",
      Icon: FiUserPlus,
    },
    {
      title: "TOTAL PROFILES",
      value: stats.totalProfiles,
      change: "0%",
      changeType: "increase",
      period: "overall",
      Icon: FiAward,
    },
    {
      title: "PENDING ORDERS",
      value: stats.pendingOrders,
      change: "0%",
      changeType: "decrease",
      period: "current",
      Icon: FiClock,
    },
  ];

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        Failed to load stats.
      </div>
    );
  }

  return (
    <div className="w-full font-sans flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading
            ? // ✅ Show skeletons while loading
              statsData.map((stat, index) => (
                <SkeletonCard key={index} isPrimary={stat.isPrimary} />
              ))
            : // ✅ Show real stats once loaded
              statsData.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
        </div>
      </div>
    </div>
  );
}
