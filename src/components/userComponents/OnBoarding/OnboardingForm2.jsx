import React, { useState } from "react";
import SelectionCard from "./childComp/SelectionCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const OnboardingForm2 = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  const [touched, setTouched] = useState(false);

  const mainGoalsOptions = [
    "Promote Business",
    "Attract Clients",
    "Recruit Team Members",
    "Networking",
    "Build Brand Awareness",
    "Other",
  ];

  const targetAudiencesOptions = [
    "Customers",
    "Partners",
    "Students",
    "Investors",
    "Community",
    "Other",
  ];

  const handleSelection = (field, value) => {
    setFormData((prev) => {
      const currentArray = prev[field] || [];
      if (currentArray.includes(value)) {
        return {
          ...prev,
          [field]: currentArray.filter((item) => item !== value),
        };
      } else {
        return { ...prev, [field]: [...currentArray, value] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (
      formData.mainGoals.length === 0 ||
      formData.targetAudiences.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    nextStep();
  };

  const getBorderClass = (field) => {
    if (!touched) return "";
    return formData[field]?.length === 0 ? "border-red-500" : "border-gray-200";
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-7 font-sans">
      <div className="w-full max-w-5xl mx-auto rounded-xl shadow-lg bg-white p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Business Goals & Preferences
          </h1>
          <p className="text-gray-600">
            Help us understand your business goals, audience, and preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What are your main goals?
            </label>
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 border p-3 rounded-lg ${getBorderClass(
                "mainGoals"
              )}`}
            >
              {mainGoalsOptions.map((goal) => (
                <SelectionCard
                  key={goal}
                  value={goal}
                  isSelected={formData.mainGoals.includes(goal)}
                  onSelect={() => handleSelection("mainGoals", goal)}
                />
              ))}
            </div>
          </div>

          {/* Target Audiences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Who are your target audiences?
            </label>
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 border p-3 rounded-lg ${getBorderClass(
                "targetAudiences"
              )}`}
            >
              {targetAudiencesOptions.map((audience) => (
                <SelectionCard
                  key={audience}
                  value={audience}
                  isSelected={formData.targetAudiences.includes(audience)}
                  onSelect={() => handleSelection("targetAudiences", audience)}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
            {/* Back Button - Left */}
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="
                flex-1 
      py-3 sm:py-4 md:py-6
                border-purple-600 text-purple-600
                hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900 
                transition-all duration-300
              "
            >
              Back
            </Button>

            {/* Next Step - Right */}
            <Button
              type="submit"
              className="
      flex-1
      py-3 sm:py-4 md:py-6
      bg-purple-600 text-white
      hover:bg-purple-700
      focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800
      transition-all duration-300
              "
            >
              Next Step
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
