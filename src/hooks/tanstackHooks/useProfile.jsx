// src/tanstackHooks/auth.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileServices } from "@/api/services/profileServices";

export const useGetAllProfile = () =>
  useQuery({
    queryKey: ["allProfiles"],
    queryFn: () => profileServices.fetchViewProfile(),
  });
export const useViewProfileByTap = (viewId) =>
  useQuery({
    queryKey: ["profile", viewId],
    queryFn: () => profileServices.viewProfilebyTap(viewId),
    enabled: !!viewId,
  });

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => profileServices.editProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["allProfiles"]);
    },
  });
};
 
export const useUpdateProfileStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileServices.updateProfileStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
  });
};

export const useIncrementProfileViews = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => profileServices.incrementProfileViews(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["allProfiles"]);
    }
  });
  
}

export const useGetProfilesCreatedByAdmin = () => { 
  return useQuery({
    queryKey: ["profilesCreatedByAdmin"],
    queryFn: () => profileServices.getProfilesCreatedByAdmin(),
  });
}

export const useGetUserForTransfer = (email) => {
  return useQuery({
    queryKey: ["userForTransfer", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await profileServices.getUserForTransfer(email);
      return res.data; 
    },
    enabled: !!email, 
    staleTime: 5 * 60 * 1000, 
    retry: 1, 
  });
};

export const useTransferProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => profileServices.transferProfileToUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["allProfiles"]);
    },
  });
}