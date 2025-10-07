import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetAllOrders } from "@/hooks/tanstackHooks/useOrder";
import { Loader2, Send } from "lucide-react";
import PrintingDetailsModal from "./PrintingDetailsModal";
import { useUpdateProfileStatus } from "@/hooks/tanstackHooks/useProfile";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";
import { ViewUserModal } from "./ViewUserModal";
import TransferProfileDialog from "../ProfileTransfer/TransferProfileDialog";

const PER_PAGE = 10;

const OrderTable = () => {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [profileToTransfer, setProfileToTransfer] = useState(null);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewProfile, setViewProfile] = useState();

  const { data, isLoading } = useGetAllOrders({
    status: tab,
    page,
    search:debouncedSearch,
  });

  const { mutate, isPending } = useUpdateProfileStatus();

  
  const orders = data?.data || [];
  const totalCount = data?.pagination?.totalRecords || 0;
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  const handleTabChange = (val) => {
    setTab(val);
    setPage(1);
  };

  const tabs = ["all","Pending","Confirmed","Design Completed","Delivered"];


  const changeStatusOfActiveAndDeActive = (id, status) => {
    setUpdatingId(id);
    mutate(
      { id, isActive: status },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(`Profile ${status ? "Activated" : "Deactivated"} successfully`);
          } else {
            toast.error(res.message);
          }
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 justify-start">
        {tabs.map((tabName) => (
          <button
            key={tabName}
            onClick={() => handleTabChange(tabName)}
            className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              tabName === tab
                ? "bg-purple-600 text-white shadow"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center gap-3">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600">Manage and review all orders</p>
        </div>
        <Input
          placeholder="Search name, email, or designation..."
          value={search}
          onChange={handleSearch}
          className="w-full sm:w-72"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide border-b">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Order Status</th>
              <th className="px-4 py-3 text-left">Profile Status</th>
              <th className="px-4 py-3 text-left">Active</th>
              <th className="px-4 py-3 text-left">View</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Transfer</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="p-6">
                  <div className="flex flex-col items-center justify-center gap-3 mt-40">
                    <Loader className="animate-spin h-6 w-6 text-gray-500" />
                  </div>
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {(page - 1) * PER_PAGE + i + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {order.fullName}
                    </div>
                    <div className="text-xs text-gray-500">{order.email}</div>

                    {/* <div className="text-xs text-gray-500">{order.email}</div> */}
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-700">
                    {order.designation || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center">
                      <Badge
                        variant="outline"
                        className={`px-2 py-1  text-xs font-medium ${
                          order.status === "Pending"
                            ? "border-yellow-400 text-yellow-600 bg-yellow-50"
                            : order.status === "Confirmed"
                            ? "border-purple-400 text-purple-600 bg-purple-50"
                            : order.status === "Design Completed"
                            ? "border-indigo-400 text-indigo-600 bg-indigo-50"
                            : order.status === "Delivered"
                            ? "border-emerald-400 text-emerald-600 bg-emerald-50"
                            :
                            "border-blue-400 text-blue-600 bg-blue-50"
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={`px-2 py-1  text-xs w-15 font-medium ${
                        order.isActive
                          ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                          : "border-red-400 text-red-600 bg-gray-50"
                      }`}
                    >
                      {order.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>

                  <td className="px-4 py-3">
                    <Button
                      onClick={() => {
                        setIsModalOpen(true);
                        setViewProfile(order);
                      }}
                      variant="link"
                      className="p-0 text-purple-600 hover:text-purple-700"
                    >
                      View Details
                    </Button>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      onClick={() => {
                        setSelectedUser(order);
                        setIsUserModalOpen(true);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      View User
                    </Button>
                  </td>
                  <td className="px-4 py-3 flex justify-center items-center">
                    <Button
                      className={`text-sm font-medium px-3 py-1 rounded-md transition-colors w-25 flex items-center gap-2 ${
                        order.isActive
                          ? "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400"
                          : "bg-green-700 text-white hover:bg-green-900"
                      }`}
                      disabled={updatingId === order.profileId && isPending} // only disable current one
                      onClick={() =>
                        changeStatusOfActiveAndDeActive(
                          order.profileId,
                          !order.isActive
                        )
                      }
                    >
                      {updatingId === order.profileId && isPending ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4" />
                        </>
                      ) : order.isActive ? (
                        "Deactivate"
                      ) : (
                        "Activate"
                      )}
                    </Button>
                  </td>
                  <td className="px-4 py-3 text-white">
                    <Button
                      variant="outline"
                      className={
                        "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 hover:text-white"
                      }
                      size="sm"
                      onClick={() => {
                        setProfileToTransfer(order); // pass profile/order to modal
                        setIsTransferModalOpen(true);
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Transfer
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center px-4 py-6 text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-500">
          Showing {(page - 1) * PER_PAGE + 1} to{" "}
          {Math.min(page * PER_PAGE, totalCount)} of {totalCount}
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && viewProfile && (
        <PrintingDetailsModal
          isOpen={isModalOpen}
          profile={viewProfile}
          onClose={() => {
            setIsModalOpen(false);
            setViewProfile(null);
          }}
        />
      )}

      {isUserModalOpen && selectedUser && (
        <ViewUserModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          user={selectedUser}
        />
      )}

      {isTransferModalOpen && profileToTransfer && (
        <TransferProfileDialog
          open={isTransferModalOpen}
          onOpenChange={(open) => {
            setIsTransferModalOpen(open);
            if (!open) setProfileToTransfer(null);
          }}
          profile={{
            _id: profileToTransfer.profileId,
            fullName: profileToTransfer.fullName,
            designation: profileToTransfer.designation,
            email: profileToTransfer.email,
            phoneNumber: profileToTransfer.phoneNumber,
          }}
        />
      )}
    </div>
  );
};

export default OrderTable;













