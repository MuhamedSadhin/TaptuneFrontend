import React from "react";
import { SalesBarChart } from "./SalesBarChart";
import SalesCardOrders from "./SalesCardOrdersTable";
import SalesStatics from "./SalesStatics";

const SalesDashboard = ({ user }) => {
  return (
    <div>
      <SalesStatics />
      <div className="flex  flex-col lg:flex-row gap-4 w-full">
        {/* Left: Bar Chart */}
        <div className="flex-1">
          <SalesBarChart user={user} />
        </div>

        {/* Right: Orders Table */}
        <div className="flex-1">
          <SalesCardOrders />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
