// src/tanstackHooks/auth.js
import { enquiryService } from "@/api/services/enquiryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllEnquiries = (filters) => {
  return useQuery({
    queryKey: ["enquiries", filters], 
    queryFn: () => enquiryService.getAllEnquiries(filters),
    keepPreviousData: true, 
  });
};



export const useCreateEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (enquiry) => enquiryService.createEnquiry(enquiry),
    onSuccess: () => {
      queryClient.invalidateQueries(["enquiries"]);
    },
  });

}


export const useUpdateEnquiryStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status) => enquiryService.updateEnquiryStatus(status),
    onSuccess: () => {
      queryClient.invalidateQueries(["enquiries"]);
    },        
  });
}
