import { salesService } from "@/api/services/salesServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useViewAllSalesStats = () => {
    return useQuery({
        queryKey: ["salesStats"],
        queryFn: () => salesService.viewAllSalesStats(),
        keepPreviousData: true,
    });
}


export const useViewAllSalesUsersWithProfiles = (filters) => {
    return useQuery({
        queryKey: ["salesUsersWithProfiles", filters],
        queryFn: () => salesService.viewAllSalesUsersWithProfiles(filters),
        keepPreviousData: true,
    });
}



export const useGetAllSalesman = () => {
    return useQuery({
        queryKey: ["salesman"],
        queryFn: () => salesService.getAllSalesman(),
        keepPreviousData: true,
    });
}

export const useAssignUserToSalesman = () => {
      const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (assignmentData) => salesService.assignUserToSalesman(assignmentData),
        onSuccess: () => {
            queryClient.invalidateQueries(["salesUsersWithProfiles"]);
        }
    });
}


export const useGetEachSalesmanStats = (salesmanId) => {
    return useQuery({
        queryKey: ["eachSalesmanStats", salesmanId],
        queryFn: () => salesService.getEachSalesmanStats(salesmanId),
        keepPreviousData: true,
    });
}