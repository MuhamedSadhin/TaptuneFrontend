"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllAdmins, useUpdateAdmin } from "@/hooks/tanstackHooks/useUser";
import { useEffect, useState } from "react";
import AddAdminModal from "@/components/adminComponents/addAdmin/AddAdminModal";
import { toast } from "sonner";
import ChangeRoleModal from "./ChangeRoleModal";

// ✅ Simple debounce hook (inside the same page)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function AdminListPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data } = useGetAllAdmins({
    search: debouncedSearch,
    role,
  });

  const { mutate: updateAdmin, isPending } = useUpdateAdmin();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
  const [adminToChangeRole, setAdminToChangeRole] = useState(null);

  const admins = data?.data || [];

  const handleAddAdminModal = () => {
    setIsModelOpen(true);
  };

  const handleToggleStatus = (admin) => {
    updateAdmin(
      {
        id: admin._id,
        isActive: !admin.isActive,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message || "Admin updated successfully");
          } else {
            toast.error(res.message || "Failed to update admin");
          }
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin List</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View, filter, and manage all admins.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* 🔍 Search & Filter */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              <Input
                placeholder="Search admin..."
                className="md:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className={"bg-purple-600"} onClick={handleAddAdminModal}>Create Admin</Button>
          </div>

          {/* 📋 Table */}
          <div className="w-full overflow-auto rounded-lg border">
            <table className="w-full text-sm text-left border-collapse min-w-[700px]">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wide">
                <tr className="border-b">
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Role</th>
                  <th className="py-3 px-4 font-medium">Password</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Created</th>
                  <th className="py-3 px-4 font-medium">Edit</th>
                  <th className="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {admins
                  .filter(
                    (admin) => admin.email !== "neptunemarkindia@gmail.com"
                  )
                  .map((admin, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/30">
                      <td className="py-4 px-4 flex items-center gap-3">
                        <div className="">
                          <div className="font-medium">{admin.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {admin.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{admin.role}</td>
                      <td className="py-4 px-4">********</td>
                      <td className="py-4 px-4">
                        <Badge
                          variant="outline"
                          className={
                            admin.isActive
                              ? "bg-green-100 text-green-800 border-none w-16"
                              : "bg-red-100 text-red-800 border-none w-16"
                          }
                        >
                          {admin.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        {admin.createdAt.slice(0, 10)}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          className="text-violet-600 font-medium mr-4 hover:underline"
                          onClick={() => {
                            setIsChangeRoleModalOpen(true);
                            setAdminToChangeRole(admin);
                          }}
                        >
                          ChangeRole
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isPending}
                          onClick={() => handleToggleStatus(admin)}
                          className={
                            admin.isActive
                              ? "border-red-500 text-red-600 hover:bg-red-50"
                              : "border-green-500 text-green-600 hover:bg-green-50"
                          }
                        >
                          {admin.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            {admins.length -1} results found
          </div>
        </CardContent>
      </Card>

      {isModelOpen && (
        <AddAdminModal
          open={isModelOpen}
          onClose={() => setIsModelOpen(false)}
        />
      )}
      {isChangeRoleModalOpen && adminToChangeRole && (
        <ChangeRoleModal
          isOpen={isChangeRoleModalOpen}
          admin={adminToChangeRole}
          onClose={() => {
            setIsChangeRoleModalOpen(false);
            setAdminToChangeRole(null);
          }}
        />
      )}
    </div>
  );
}
