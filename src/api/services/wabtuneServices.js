// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const wabtuneServices = {
sendMessage : async ({ phoneNumber, name }) => {
  const response = await axiosInstance.post(API_ENDPOINTS.WABTUNE.SENDMESSAGE, {
    phoneNumber,
    name,
  });

  return response.data;
}
};
