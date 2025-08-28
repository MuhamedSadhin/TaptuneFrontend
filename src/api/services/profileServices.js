// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const profileServices = {
  fetchViewProfile: async () => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.PROFILE.VIEWALLPROFILES
    );
    return data;
  },
  viewProfilebyTap: async (viewId) => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.PROFILE.VIEWPROFILEBYTAP}/${viewId}`
    );
    return data;
  },
  editProfile: async (formData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.PROFILE.EDITPROFILE,
      formData
    );
    return data;
  },
  updateProfileStatus: async ({ id, isActive }) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.PROFILE.UPDATESTATUSOFPROFILE,
      { id, isActive }
    );
    return data;
  },
};

