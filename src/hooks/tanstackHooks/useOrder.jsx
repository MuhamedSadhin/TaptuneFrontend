import { orderServices } from "@/api/services/orderServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllOrders = ({
  page = 1,
  limit = 10,
  search = "",
  status = "all",
}) =>
  useQuery({
    queryKey: ["orders", { page, limit, search, status }],
    queryFn: () => orderServices.getAllOrders({ page, limit, search, status }),
    keepPreviousData: true,
  });
export const useGetOrderStatistics = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: () => orderServices.getOrderStatistics(),
    keepPreviousData: true,
  });


export const useGetAdminStats = () =>
  useQuery({
    queryKey: ["adminStats"],
    queryFn: () => orderServices.getAdminStats(),
    keepPreviousData: true,
  });

  export const useGetOrderAndUserForAdminHomePage = () => {
    return useQuery({
      queryKey: ["orderAndUserForAdminHomePage"],
      queryFn: () => orderServices.getOrderAndUserForAdminHomePage(),
      keepPreviousData: true,
    });
};
  
export const useGetChartData = () => {
  return useQuery({
    queryKey: ["chartData"],
    queryFn: () => orderServices.getChartData(),
    keepPreviousData: true,
  });
}