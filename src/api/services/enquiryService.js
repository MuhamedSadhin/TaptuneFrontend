// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const enquiryService = {
  getAllEnquiries: async (filters = {}) => {
    const { search = ""} = filters;

    const { data } = await axiosInstance.get(
      API_ENDPOINTS.ENQUIRY.GETALLENQUIRY,
      {
        params: { search}, 
      }
    );

    return data;
  },
  createEnquiry: async (enquiryData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.ENQUIRY.CREATEENQUIRY,
      enquiryData
    );

    return data;
  }
};
