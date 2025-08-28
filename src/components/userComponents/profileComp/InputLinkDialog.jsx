"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LinkInputDialog({ open, onClose, onSubmit, platform }) {
  const [link, setLink] = useState("");

  useEffect(() => {
    if (open) {
      setLink("");
    }
  }, [open, platform]);

  const handleAdd = () => {
    if (link.trim()) {
      onSubmit(platform, link); 
      setLink(""); 
    }
  };

  const handleCancel = () => {
    setLink(""); // Clear input on cancel
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add Link for{" "}
            <span className="capitalize">{platform?.name || "Platform"}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="link">Enter Link</Label>
            <Input
              id="link"
              type="url"
              placeholder={`https://www.${platform?.name?.toLowerCase()}.com/your-profile`}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
