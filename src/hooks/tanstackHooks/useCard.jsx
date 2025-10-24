// src/tanstackHooks/auth.js
import { useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query";
import { cardService } from "@/api/services/cardServices";

export const useGetAllCards = () =>
  useQuery({
    queryKey: ["allCards"],
    queryFn: () => cardService.viewAllCards(),
  });
  
  export const useGetOneCard = ({ id }) => {
    return useQuery({
      queryKey: ["card", id],
      queryFn: () => cardService.viewOneCard(id),
      enabled: !!id, 
    });
};
  
export const useCreateCardOrderAndProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cardService.orderCardAndCreateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cardService.createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCards"] });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cardService.updateCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCards"] });
    },
  });
};


export const useUpdateCardOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:cardService.updateCardOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]); 
    },
  });
};


export const useToggleCardStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cardService.toggleCardStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["allCards"]);
    },
  });
};

export const useCreateProfileByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cardService.createProfileByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    }
  })
};