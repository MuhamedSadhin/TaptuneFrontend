import { useMutation, useQuery } from "@tanstack/react-query";
import { connectionServices } from "@/api/services/connectionServices";
import { toast } from "sonner";
import { wabtuneServices } from "@/api/services/wabtuneServices";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: wabtuneServices.sendMessage,
    onSuccess: (res) => {
      if(res.success) {
        toast.success(res.message || "Message sent successfully!");
      } else {
        toast.error(res.message || "Failed to send message");
      }
    },
    onError: (error) => {
      const err = error.response?.data?.error || "Failed to send message";
      toast.error(err);
    },
  });
};
