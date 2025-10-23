import React from "react";
import { FaUsers, FaCheckCircle, FaClock, FaBullseye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const formatNumber = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return num;
};

const SalesCardItem = ({ seller }) => {
  const navigate = useNavigate();

  // Determine if this is "Direct Leads"
  const isDirectLead =
    seller.email.toLowerCase() === "neptunemarkindia@gmail.com";

  return (
    <article
      className={`group relative rounded-2xl overflow-hidden text-gray-800 border shadow-md hover:shadow-lg transition-all duration-300 flex flex-col
      ${
        isDirectLead
          ? "border-yellow-400 bg-yellow-50"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h2
            className={`text-2xl font-bold ${
              isDirectLead ? "text-yellow-700" : "text-purple-700"
            }`}
          >
            {seller.name}
          </h2>
          <p className="text-sm text-gray-500"> - {seller.email}</p>
        </div>

        {/* Monthly Target */}
        <div
          className={`mb-3 border p-5 rounded-xl flex items-center justify-between
          ${
            isDirectLead
              ? "bg-yellow-100 border-yellow-200"
              : "bg-purple-50 border-purple-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <FaBullseye
              className={`${
                isDirectLead ? "text-yellow-600" : "text-purple-600"
              } text-xl`}
            />
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Monthly Target
              </p>
              <p className="text-xs text-gray-500">
                {formatNumber(seller.monthlyReferrals || 0)} referrals Acheive
              </p>
            </div>
          </div>
          <span
            className={`text-lg font-bold ${
              isDirectLead ? "text-yellow-700" : "text-purple-700"
            }`}
          >
            ₹{formatNumber(seller.monthlyReferrals || 0)}
          </span>
        </div>

        {/* Stats */}
        <div className="space-y-3 flex-1">
          {/* Total Referrals */}
          <div
            className={`flex items-center p-4 rounded-xl border ${
              isDirectLead
                ? "bg-yellow-100 border-yellow-200 text-yellow-800"
                : "bg-purple-50 border-purple-100 text-gray-800"
            }`}
          >
            <div>
              <FaUsers
                className={`${
                  isDirectLead ? "text-yellow-600" : "text-purple-600"
                } text-lg`}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-xs text-gray-500">Total Referrals</p>
              <p className="text-2xl font-bold">
                {formatNumber(seller.totalReferrals || 0)}
              </p>
            </div>
          </div>

          {/* Confirmed & Pending */}
          <div className="grid grid-cols-2 gap-3">
            {/* Confirmed */}
            <div
              className={`flex items-center p-4 rounded-xl border ${
                isDirectLead
                  ? "bg-yellow-100 border-yellow-200 text-yellow-800"
                  : "bg-green-50 border-green-100 text-green-700"
              }`}
            >
              <div
                className={`${
                  isDirectLead ? "text-yellow-600" : "text-green-600"
                }`}
              >
                <FaCheckCircle className="text-lg" />
              </div>
              <div className="ml-2 flex-1">
                <p className="text-xs">
                  {isDirectLead ? "Direct Confirmed" : "Confirmed"}
                </p>
                <p className="text-xl font-bold">
                  {formatNumber(seller.totalConfirmed || 0)}
                </p>
              </div>
            </div>

            {/* Pending */}
            <div
              className={`flex items-center p-4 rounded-xl border ${
                isDirectLead
                  ? "bg-yellow-100 border-yellow-200 text-yellow-800"
                  : "bg-amber-50 border-amber-100 text-amber-700"
              }`}
            >
              <div
                className={`${
                  isDirectLead ? "text-yellow-600" : "text-amber-500"
                }`}
              >
                <FaClock className="text-lg" />
              </div>
              <div className="ml-2 flex-1">
                <p className="text-xs">
                  {isDirectLead ? "Direct Pending" : "Pending"}
                </p>
                <p className="text-xl font-bold">
                  {formatNumber(seller.totalPending || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-6">
          <Button
            className={`w-full ${
              isDirectLead
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            onClick={() => navigate(`/admin/SalesReport/${seller.salesmanId}`)}
          >
            View All
          </Button>
        </div>
      </div>
    </article>
  );
};

export default SalesCardItem;
