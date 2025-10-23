"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { Loader2, Users, CheckCircle2, Target } from "lucide-react";
import {
  useAssignUserToSalesman,
  useGetAllSalesman,
} from "@/hooks/tanstackHooks/useSales";
import { toast } from "sonner";

const SelectSalesmanModal = ({
  open,
  onClose,
  selectedUsers = [],
  onRemoveUserFromParent,
}) => {
  const [search, setSearch] = useState("");
  const [selectedSalesman, setSelectedSalesman] = useState(null);
  const [isDirectLead, setIsDirectLead] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { data, isLoading, isError } = useGetAllSalesman();
  const salesmen = Array.isArray(data?.data) ? data.data : [];

  const { mutateAsync: assignMutation, isPending } = useAssignUserToSalesman();

  const userCount = Array.isArray(selectedUsers) ? selectedUsers.length : 0;

  const toggleSalesman = (salesman) => {
    if (selectedSalesman?._id === salesman._id) {
      setSelectedSalesman(null);
    } else {
      setSelectedSalesman(salesman);
      setIsDirectLead(false);
    }
  };

  const toggleDirectLead = () => {
    setIsDirectLead((prev) => {
      if (!prev) setSelectedSalesman(null);
      return !prev;
    });
  };

  const filteredSalesmen = salesmen.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    if (userCount === 0) {
      toast.error("Please select at least one user.");
      return;
    }

    const assignmentData = {
      userIds: selectedUsers.map((u) => u._id),
      salesmanId: selectedSalesman?._id || null,
      isDirectLead,
    };

    try {
      const res = await assignMutation(assignmentData);
      if (res.success) toast.success(res.message);

      if (onRemoveUserFromParent) {
        selectedUsers.forEach((user) => onRemoveUserFromParent(user._id));
      }

      setSelectedSalesman(null);
      setIsDirectLead(false);
      setIsConfirmed(false);

      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to assign users.");
    }
  };

  const isSubmitDisabled =
    !isConfirmed ||
    (userCount > 0 && !selectedSalesman && !isDirectLead) ||
    isLoading;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="border-b border-border pb-4 mb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Assign to Sales Team
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Select a salesman or mark as direct lead, then confirm your
                assignment.
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg w-fit">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Selected:{" "}
                <span className="font-bold text-primary">{userCount}</span>
              </span>
            </div>
          </div>
        </DialogHeader>

        {/* Search */}
        <div className="mt-2">
          <Input
            placeholder="Search salesman..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        {/* Salesmen List */}
        <div className="mt-2 space-y-2 max-h-55 ">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="text-center py-6 px-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-sm text-destructive font-medium">
                Failed to load salesmen
              </p>
            </div>
          ) : filteredSalesmen.length === 0 ? (
            <div className="text-center py-6 px-4 border border-dashed border-gray-300 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">No salesmen found</p>
            </div>
          ) : (
            filteredSalesmen.map((salesman) => (
              <button
                key={salesman._id}
                onClick={() => toggleSalesman(salesman)}
                className={`w-full text-left rounded-lg p-4 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400/50 border ${
                  selectedSalesman?._id === salesman._id
                    ? "bg-purple-50 border-purple-500 shadow-sm"
                    : "bg-white border-gray-300 hover:shadow-sm"
                }`}
                aria-pressed={selectedSalesman?._id === salesman._id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {salesman.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {salesman.email || "No email"}
                    </p>
                  </div>
                  {selectedSalesman?._id === salesman._id && (
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  )}
                </div>
              </button>
            ))
          )}

          {/* Direct Lead Button */}
          <button
            onClick={toggleDirectLead}
            className={`w-full text-left rounded-lg p-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 border ${
              isDirectLead
                ? "bg-amber-50 border-amber-400 shadow-sm"
                : "bg-white border-gray-300 hover:shadow-sm"
            }`}
            aria-pressed={isDirectLead}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-foreground">Direct Lead</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Users won't be assigned to any salesman
                </p>
              </div>
              {isDirectLead && (
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
            </div>
          </button>
        </div>

        {/* Confirmation & Actions */}
        <div className="border-t border-gray-300 pt-4 mt-6 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 bg-background text-primary focus:ring-2 focus:ring-primary/50 cursor-pointer"
            />
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              I confirm this assignment
            </span>
          </label>

          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="rounded-lg bg-transparent"
            >
              Close
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className="rounded-lg w-27 bg-purple-600 hover:bg-purple-700 text-primary-foreground font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                "Assign Leads"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectSalesmanModal;
