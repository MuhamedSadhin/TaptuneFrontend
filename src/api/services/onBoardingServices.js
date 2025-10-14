// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const onBoardingServices = {
  fillOnBoardingAnswers: async (payload) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.ONBOARDING.ONBOARDINGANSWERS,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting onboarding answers:", error);
      throw (
        error.response?.data || new Error("Failed to submit onboarding answers")
      );
    }
  },
};
