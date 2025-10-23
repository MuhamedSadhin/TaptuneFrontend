// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const salesService = {
  viewAllSalesStats: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.SALES.GETALLSALESSTATS);
    return data;
    },
    viewAllSalesUsersWithProfiles: async (filters) => {
        const { data } = await axiosInstance.post(API_ENDPOINTS.SALES.GETUSERSWITHPROFILES, filters);
        return data;
  },                
    getAllSalesman: async () => {
        const { data } = await axiosInstance.get(API_ENDPOINTS.SALES.GETALLSALESMAN);
        return data;
  },
  assignUserToSalesman: async (assignmentData) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.SALES.ASSIGNUSERTOSALESMAN, assignmentData);
    return data;
  },
  getEachSalesmanStats: async (salesmanId) => {
    const { data } = await axiosInstance.post(API_ENDPOINTS.SALES.GETEACHSALESMANSTATS, {
      salesmanId
    });
    return data;
  },
};
