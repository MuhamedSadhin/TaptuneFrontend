// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const authService = {
  login: async (credentials) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return data;
  },

  signup: async (userData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH.SIGNUP,
      userData
    );
    return data;
  },
  getUser: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.AUTH.ISAUTH);
    return data;
  },
  updateUser: async (payload) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH.UPDATESETTINGS,
      payload
    );
    return data;
  },
  logoutUser: async () => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return data;
  }
};
