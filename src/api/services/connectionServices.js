// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const connectionServices = {
  viewAllConnections: async (params) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CONNECTION.VIEWALLCONNECTIONS,
      params
    );
    return data;
  },
  connectToProfile: async (payload) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CONNECTION.MAKECONNECTION,
      payload
    );
    return data;
  },
  updateConnectionLabel: async ({ connectionId, leadLabel }) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CONNECTION.UPDATECONNECTIONLEADLABEL,
      { label: leadLabel },
      { params: { connectionId } }
    );
    return data;
  }
};

