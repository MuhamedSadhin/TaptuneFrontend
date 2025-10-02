// src/tanstackHooks/auth.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useUpdateConnectionLabel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ connectionId, leadLabel }) => connectionServices.updateConnectionLabel({ connectionId, leadLabel }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    }
  });
  
}