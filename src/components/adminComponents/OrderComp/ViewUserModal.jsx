import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { User as UserIcon } from "lucide-react";

export const ViewUserModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-bold">
            Order User Information
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Customer & profile details from this order
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Customer Details */}
          <div className="p-3 rounded-lg border bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Customer Details
            </h3>
            <p>
              <strong>Name:</strong> {user?.customerName || "-"}
            </p>
            <p>
              <strong>Email:</strong> {user?.customerEmail || "-"}
            </p>
          </div>

          {/* Profile Details with Image */}
          <div className="p-3 rounded-lg border bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Profile Details
            </h3>
            <div className="flex items-center gap-4">
              {/* Profile Image */}
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.profileFullName || "Profile"}
                  className="w-16 h-16 rounded-full object-cover border shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 border shadow-sm">
                  <UserIcon className="w-8 h-8" />
                </div>
              )}

              {/* Profile Info */}
              <div>
                <p>
                  <strong>Name:</strong> {user?.profileFullName || "-"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.profileEmail || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full bg-purple-600 text-white hover:bg-purple-700 hover:text-white">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
