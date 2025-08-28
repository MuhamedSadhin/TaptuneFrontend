"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ConnectionCard from "@/components/userComponents/connectionComp/connectionCard";
import { useGetAllConnections } from "@/hooks/tanstackHooks/useConnections";
import Loader from "@/components/ui/Loader";

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading } = useGetAllConnections({ search: debouncedSearch });
  const connections = data?.data || [];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Connected Users
            </h1>
            <p className="text-gray-600">
              Manage your professional connections
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search connections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64 bg-white border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Connections Grid */}
        <div className="min-h-[300px] flex justify-center items-center">
          {isLoading ? (
            <Loader />
          ) : connections.length === 0 ? (
            <div className="text-center py-12 w-full">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No connections found
              </h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 w-full">
              {connections.map((connection) => (
                <div
                  key={connection._id}
                  className="flex-1 min-w-[280px] max-w-full sm:max-w-[48%] lg:max-w-[32%]"
                >
                  <ConnectionCard connection={connection} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
