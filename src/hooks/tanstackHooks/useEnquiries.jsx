// src/tanstackHooks/auth.js
import { enquiryService } from "@/api/services/enquiryService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllEnquiries = (filters) => {
  return useQuery({
    queryKey: ["enquiries", filters], 
    queryFn: () => enquiryService.getAllEnquiries(filters),
    keepPreviousData: true, 
  });
};

