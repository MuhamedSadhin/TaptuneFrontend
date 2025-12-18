import { reviewCardOrderService } from "@/api/services/reviewCardServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllReviewCardOrders = (status = "all") => {
  return useQuery({
    queryKey: ["reviewCardOrders", status],
    queryFn: () => reviewCardOrderService.getAllReviewCardOrders(status),
    keepPreviousData: true,
  });
};

export const useCreateReviewCardOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData) =>
      reviewCardOrderService.createReviewCardOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviewCardOrders"]);
    },
  });
};

export const useUpdateReviewCardOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (statusData) =>
      reviewCardOrderService.updateReviewCardOrderStatus(statusData),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviewCardOrders"]);
    },
  });
};
