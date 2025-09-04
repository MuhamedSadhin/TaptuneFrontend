// src/tanstackHooks/auth.js
import { notificationService } from "@/api/services/notificationServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNotifications = () => {
  return useQuery({
    queryKey: ["notification"],
    queryFn: () => notificationService.getAllNotifications(),
    keepPreviousData: true,
  });
};

