"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useUpdateAdmin } from "@/hooks/tanstackHooks/useUser";

export default function ChangeRoleModal({ isOpen, onClose, admin }) {
  const [selectedRole, setSelectedRole] = useState("");

  const { mutate, isPending } = useUpdateAdmin();

  const handleUpdateRole = () => {
    if (!selectedRole) return;
    mutate(
      {
        id: admin._id, 
        role:selectedRole,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Role updated successfully!");
            onClose();
          } else {
            toast.error(res.message || "Failed to update role");
          }
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      }
    );
  };

  const handleCancel = () => {
    setSelectedRole("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full mx-4 p-0 gap-0 bg-white rounded-2xl shadow-xl border-0">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="space-y-1">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Change Role
            </DialogTitle>
            <p className="text-sm text-gray-600">
              Change <span className="font-bold">{admin.name} </span> role and
              permissions.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Current Role Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Current Role
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <span className="text-sm font-medium text-gray-900">
                {admin.role}
              </span>
            </div>
          </div>

          {/* New Role Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              New Role
            </label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full h-12 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6 py-2 h-10 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-medium bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateRole}
              disabled={!selectedRole || isPending}
              className="px-6 py-2 h-10 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              {isPending ? "Updating..." : "Update Role"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
