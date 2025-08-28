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
