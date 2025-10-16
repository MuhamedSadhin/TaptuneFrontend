import StatsCards from "@/components/adminComponents/homeComp/DashboardCards";
import SalesDashboard from "@/components/adminComponents/homeComp/SalesDashboard";
import SalesStatics from "@/components/adminComponents/homeComp/SalesStatics";
import DashboardSection from "@/components/adminComponents/homeComp/tables";
import Loader from "@/components/ui/Loader";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";
import React from "react";

const AdminHomepage = () => {
  const { user } = useAuthUser();
  console.log(user);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader/>
        </div>
    );
  }

  return (
    <div className="">
      {user.role === "sales" ? (
        <SalesDashboard />
      ) : (
        <>
          <StatsCards />
          <DashboardSection />
        </>
      )}
    </div>
  );
};

export default AdminHomepage;
