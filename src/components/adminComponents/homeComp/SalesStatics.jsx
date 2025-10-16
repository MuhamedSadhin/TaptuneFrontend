import { useGetAdminStats } from "@/hooks/tanstackHooks/useOrder";
import React from "react";
import {
  FiTrendingUp,
  FiUsers,
  FiUserPlus,
  FiAward,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

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
    "rounded-2xl p-4 shadow-sm transition-all duration-300 ease-in-out relative overflow-hidden hover:shadow-md";

  // Primary (first card) is purple; others are white
  const themeClasses = isPrimary
    ? "bg-purple-500 text-white"
    : "bg-white text-gray-900 border border-gray-100";

  const changeColor = isPrimary
    ? changeType === "increase"
      ? "text-green-200"
      : "text-red-200"
    : changeType === "increase"
    ? "text-green-600"
    : "text-red-500";

  return (
    <div className={`${baseClasses} ${themeClasses}`}>
      {/* Only show pattern on the primary card */}
      {isPrimary && <CardBackgroundPattern />}

      <div className="flex flex-col justify-between h-full relative ">
        {/* Top Section */}
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

        {/* Bottom Section */}
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

        {/* Icon */}
        <div
          className={`absolute bottom-0 right-0 p-3 rounded-xl ${
            isPrimary ? "bg-white/20" : "bg-purple-200"
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

export default function SalesStatics() {
  const { data, isLoading } = useGetAdminStats();
  const stats = data?.data || {};

  const statsData = [
    {
      title: "TOTAL MEMBERS",
      value: stats.totalUsers ?? 0,
      change: "4.2%",
      changeType: "increase",
      period: "from last month",
      Icon: FiTrendingUp,
      isPrimary: true, // Only first card gets purple bg
    },
    {
      title: "TOTAL ORDERS",
      value: stats.totalCardOrders ?? 0,
      change: "1.7%",
      changeType: "increase",
      period: "from last month",
      Icon: FiUsers,
    },
    {
      title: "THIS MONTH",
      value: stats.cardOrdersThisMonth ?? 0,
      change: "29%",
      changeType: "decrease",
      period: "from last month",
      Icon: FiUserPlus,
    },
    {
      title: "ENQUIRIES",
      value: stats.totalEnquiries ?? 0,
      change: "0.9%",
      changeType: "increase",
      period: "from last month",
      Icon: FiAward,
    },
  ];

  return (
    <div className="w-full font-sans flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
