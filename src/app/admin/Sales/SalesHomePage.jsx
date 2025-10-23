import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useViewAllSalesStats } from "@/hooks/tanstackHooks/useSales";
import Loader from "@/components/ui/Loader";
import SalesCardItem from "@/components/adminComponents/SalesComp/SalesPersonCard";

const SalesCardsMain = () => {
  const { data, isLoading, isError } = useViewAllSalesStats();

  const sellersData = data?.data || [];

  return (
    <section className="">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sales List</h1>
            <p className="text-sm text-muted-foreground mt-1">
              View, filter, and manage all Sales.
            </p>
          </div>
          <div className="flex">
            <Input placeholder="Search sales..." className="md:w-64" />
            <Button className="bg-purple-600 ml-4">Search</Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-[60vh] col-span-full">
              <div className="flex flex-col items-center">
                <Loader className="animate-spin h-8 w-8 text-purple-600 mb-3" />
              </div>
            </div>
          ) : isError ? (
            <p className="col-span-full text-center text-red-500 py-10">
              Failed to load sales data.
            </p>
          ) : sellersData.length > 0 ? (
            sellersData.map((seller, idx) => (
              <SalesCardItem key={seller.salesmanId || idx} seller={seller} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">
              No sales data found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SalesCardsMain;
