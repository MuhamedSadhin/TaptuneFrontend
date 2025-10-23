import { API_ENDPOINTS } from "../apiEndpoints";
import axiosInstance from "../axiosConfig";

export const userService = {
  getAllUsers: async ({ page = 1, limit = 10, search = "", salesmanId }) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.GETALLUSERS, {
      params: {
        page,
        limit,
        search,
        salesmanId,
      },
    });
    return data;
  },

  getAllAdmins: async (filters) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.USER.GETALLADMINS, {
      params: filters,
    });
    return data;
  },
  createAdmin: async (payload) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USER.CREATEADMIN,
      payload
    );
    return data;
  },
  updateAdmin: async (data) => {
    const res = await axiosInstance.post(API_ENDPOINTS.USER.UPDATEADMIN, data);
    return res.data;
  },
  getHomepageData: async () => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.USER.GETHOMEPAGEDATA
    );
    return data;
  },
  updatePhoneNumber: async (phoneNumber) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USER.UPDATEPHONENUMBER,
      { phoneNumber }
    );
    return data;
  },
};
