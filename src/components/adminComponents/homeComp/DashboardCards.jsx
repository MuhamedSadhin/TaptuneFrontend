"use client";

import { useGetAdminStats } from "@/hooks/tanstackHooks/useOrder";
import { Users, ShoppingCart, Calendar, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StatsCards() {
  const { data, isLoading } = useGetAdminStats();
  const stats = data?.data || {};

  const cards = [
    {
      title: "TOTAL MEMBERS",
      value: stats.totalUsers ?? 0,
      icon: <Users className="w-5 h-5 text-white" />,
      path: "/admin/user-list",
    },
    {
      title: "TOTAL ORDERS",
      value: stats.totalCardOrders ?? 0,
      icon: <ShoppingCart className="w-5 h-5 text-white" />,
      path: "/admin/card-order",
    },
    {
      title: "THIS MONTH",
      value: stats.cardOrdersThisMonth ?? 0,
      icon: <Calendar className="w-5 h-5 text-white" />,
      path: "/admin/card-order",
    },
    {
      title: "ENQUIRIES",
      value: stats.totalEnquiries ?? 0,
      icon: <Mail className="w-5 h-5 text-white" />,
      path: "/admin/enquiry",
    },
  ];
    const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            </div>
            <div className="border-t mt-4 pt-3">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {cards.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between"
        >
          {/* Top section */}
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {item.title}
              </p>
              <h2 className="text-2xl font-bold text-gray-900">{item.value}</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              {item.icon}
            </div>
          </div>

          {/* Bottom section */}
              <div className="border-t px-5 py-3 text-sm font-medium text-gray-600 flex items-center justify-between cursor-pointer hover:text-purple-600 transition"
              onClick={()=>navigate(item.path)}>
            <span>View All</span>
            <span>›</span>
          </div>
        </div>
      ))}
    </div>
  );
}
