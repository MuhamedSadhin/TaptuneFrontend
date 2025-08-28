// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const orderServices = {
  getAllOrders: async (params = {}) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ORDER.GETALLORDERS, {
      params,
    });
    return data;
  },
  getOrderStatistics: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ORDER.GETORDERSTATS);
    return data;
  },
  getAdminStats: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ORDER.GETADMINSTATS);
    return data;
  },
  getOrderAndUserForAdminHomePage: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ORDER.GETORDERANDUSERDATA);
    return data;
  },
  getChartData: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ORDER.GETCHARTDATA);
    return data;
  },
};
