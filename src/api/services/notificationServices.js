// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const notificationService = {
    getAllNotifications: async () => {
        const { data } = await axiosInstance.get(
            API_ENDPOINTS.NOTIFICATION.GETALLNOTIFICATIONS
        );
        return data;
    }
};
