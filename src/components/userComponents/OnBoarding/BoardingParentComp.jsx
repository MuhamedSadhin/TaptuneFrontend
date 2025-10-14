import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import OnBoardingForm1 from "./OnBoardingForm1";
import { OnboardingForm2 } from "./OnboardingForm2";
import { OnboardingForm3 } from "./OnboardingForm3";
import { useFillOnBoardingAnswers } from "@/hooks/tanstackHooks/useOnBoarding";
import { useNavigate } from "react-router-dom";

const BoardingParentComp = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    tagline: "",
    businessType: "",
    location: "",

    mainGoals: [],
    targetAudiences: [],
    industryCategory: "",
    heardAboutTapTune: "",
  });

  const { mutate, isPending } = useFillOnBoardingAnswers();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFinalSubmit = () => {
    mutate(formData, {
      onSuccess: (res) => {
        if(res.success){
          toast.success("🎉 Onboarding details submitted successfully!");
          setStep(1);
          setFormData({
            businessName: "",
            tagline: "",
            businessType: "",
            location: "",

            mainGoals: [],
            targetAudiences: [],
            industryCategory: "",
            heardAboutTapTune: "",
          });
          navigate("/user", { replace: true });
        } else {
          toast.error(res.message || "Failed to submit onboarding details. Try again!");
        }
      },
      onError: (error) => {
        console.error("❌ Onboarding submission failed:", error);
        toast.error(
          error?.message || "Failed to submit onboarding details. Try again!"
        );
      },
    });
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <OnBoardingForm1
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <OnboardingForm2
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <OnboardingForm3
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            handleFinalSubmit={handleFinalSubmit}
            isLoading={isPending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-sans p-4 bg-gray-50">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="bg-[#f7f8fc] flex flex-col items-center justify-between p-8 md:p-16 relative">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-purple-600 mb-2">
              WE'RE HERE TO HELP YOU
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Discuss Your Networking Solution Needs
            </h1>
            <p className="text-gray-600 mb-10">
              Are you looking for top-quality networking solutions tailored to
              your needs? Reach out to us.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-500 text-sm">E-mail</p>
                  <a
                    href="mailto:soluvent***@gmail.com"
                    className="text-gray-800 font-bold"
                  >
                    soluvent***@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-500 text-sm">
                    Phone number
                  </p>
                  <a href="tel:+1234567890" className="text-gray-800 font-bold">
                    +123 - 456 - 7890
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="w-full flex items-center justify-start mt-10">
            <div className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-xl font-medium shadow-md">
              Step {step} of 3
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-gray-50 dark:bg-gray-900 flex flex-col justify-center overflow-y-auto">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default BoardingParentComp;












