import { onBoardingServices } from "@/api/services/onBoardingServices";
import { useMutation } from "@tanstack/react-query";

export const useFillOnBoardingAnswers = () => {
  return useMutation({
    mutationKey: ["onboardingAnswers"],
    mutationFn: onBoardingServices.fillOnBoardingAnswers,
  });
};
