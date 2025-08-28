// src/tanstackHooks/auth.js
import { useMutation, useQuery } from "@tanstack/react-query";
import { connectionServices } from "@/api/services/connectionServices";

export const useGetAllConnections = (filters) =>
  useQuery({
    queryKey: ["connections", filters], 
    queryFn: () => connectionServices.viewAllConnections(filters),
  });

export const useConnectProfile = () => {
  return useMutation({
    mutationFn: (payload) => connectionServices.connectToProfile(payload),
  });
};
