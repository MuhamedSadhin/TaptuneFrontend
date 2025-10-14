import React from "react";
import FormInput from "./childComp/FormInput";
import SelectionCard from "./childComp/SelectionCard";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";

export const OnboardingForm3 = ({
  formData,
  setFormData,
  prevStep,
  handleFinalSubmit,
  isLoading,
}) => {
  const heardAboutOptions = [
    "Friend",
    "Ads",
    "Website",
    "Social Media",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelection = (value) => {
    setFormData((prev) => ({ ...prev, heardAboutTapTune: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFinalSubmit(); // Call parent submission handler
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto rounded-3xl shadow-lg bg-white p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Business & TapTune Info
          </h1>
          <p className="text-gray-600">
            Tell us about your industry and how you heard about TapTune.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Industry Category */}
          <div>
            <FormInput
              id="industryCategory"
              name="industryCategory"
              label="Industry Category"
              placeholder="e.g., Technology, Health, Real Estate"
              value={formData.industryCategory}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Heard About TapTune */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              How did you hear about TapTune?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
              {heardAboutOptions.map((option) => (
                <SelectionCard
                  key={option}
                  value={option}
                  isSelected={formData.heardAboutTapTune === option}
                  onSelect={() => handleSelection(option)}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Back Button */}
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
              disabled={isLoading}
            >
              Back
            </Button>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="
      flex-1
      py-3 sm:py-4 md:py-6
      bg-purple-600 text-white
      hover:bg-purple-700
      focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800
      transition-all duration-300
              "
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className=" animate-spin h-5 w-5" />
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
