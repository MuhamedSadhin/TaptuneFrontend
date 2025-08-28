import { userService } from "@/api/services/userServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllUsers = ({ page=10, limit=10, search="" }) => {
  return useQuery({
    queryKey: ["allusers", page, limit, search],
    queryFn: () => userService.getAllUsers({ page, limit, search }),
    keepPreviousData: true,
  });
};
export const useGetAllAdmins = (filters) => {
  return useQuery({
    queryKey: ["alladmins", filters], 
    queryFn: () => userService.getAllAdmins(filters),
    keepPreviousData: true,
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createAdmin,
    onSuccess: () => {
       queryClient.invalidateQueries(["alladmins"]);
    }
  });
};


export const useUpdateAdmin = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["alladmins"]);
    },
  });
};


export const useHomepageData = () => {
  return useQuery({
    queryKey: ["homepageData"],
    queryFn: () => userService.getHomepageData(),
    keepPreviousData: true,
  });
};

