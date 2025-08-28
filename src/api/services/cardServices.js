// src/api/services/authService.js
import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const cardService = {
  viewAllCards: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.CARD.VIEWALLCARDS);
    return data;
  },
  viewOneCard: async (id) => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.CARD.VIEWONECARD}/${id}`
    );
    return data;
  },
  orderCardAndCreateProfile: async (cardData) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CARD.CREATECARDANDPROFILE,
      cardData
    );
    return data;
  },
  createCard: async (cardData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CARD.CREATECARD,
      cardData
    );
    return response.data;
  },
  updateCard: async (cardData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CARD.EDITCARD,
      cardData
    );
    return response.data;
  },
  updateCardOrderStatus : async ({ orderId, status }) => {
  const res = await axiosInstance.post(API_ENDPOINTS.CARD.UPDATEORDERSTATUS, {
    orderId,
    status,
  });
    return res.data;
  },
  toggleCardStatus : async ({ id, isActive }) => {
  const res = await axiosInstance.post(API_ENDPOINTS.CARD.EDITISACTIVESTATUS, {
    id,
    isActive,
  });
    return res.data;
  },
  

  
};