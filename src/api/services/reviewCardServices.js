// src/api/services/reviewCardOrderService.js
import { API_ENDPOINTS } from "../apiEndpoints";
import axiosInstance from "../axiosConfig";

export const reviewCardOrderService = {
  createReviewCardOrder: async (orderData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.REVIEW_CARD_ORDERS.CREATE_ORDER,
      orderData
    );
    return data;
  },

  updateReviewCardOrderStatus: async (statusData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.REVIEW_CARD_ORDERS.UPDATE_ORDER_STATUS,
      statusData
    );
    return data;
  },

  getAllReviewCardOrders: async (status = "all") => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.REVIEW_CARD_ORDERS.GET_ALL_ORDERS}?status=${status}`
    );
    return data;
  },
};
