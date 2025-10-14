// src/tanstackHooks/auth.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../api/services/authServices";

export const useGetUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getUser(),
    keepPreviousData: true,
  });

// Export a function called useLogin
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["user"] });
    // },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateUser,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(["user"]); 
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};






export const useSendOTP = () => {
  return useMutation({
    mutationFn: (data) => {
      return authService.forgotPassword(data);
    },
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: (data) => {
      return authService.verifyOTP(data);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => {
      console.log("Reset password data:", data);
      return authService.resetPassword(data);
    },
  });
};