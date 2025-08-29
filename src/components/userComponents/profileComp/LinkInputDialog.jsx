// InputLinkDialog.jsx - Simple implementation since not provided in original code

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LinkInputDialog = ({ open, platform, onClose, onSubmit }) => {
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    onSubmit(platform, link);
    setLink("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Link for {platform.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder={`Enter ${platform.name} link`}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
