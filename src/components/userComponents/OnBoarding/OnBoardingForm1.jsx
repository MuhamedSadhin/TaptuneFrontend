import React, { useState } from "react";
import FormInput from "./childComp/FormInput";
import SelectionCard from "./childComp/SelectionCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const OnBoardingForm1 = ({ formData, setFormData, nextStep }) => {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); 
  const businessTypes = [
    "Retail",
    "Service",
    "Agency",
    "Creator",
    "Startup",
    "Organization",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (submitted && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSelection = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitted && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.businessName.trim()) newErrors.businessName = true;
    if (!formData.tagline.trim()) newErrors.tagline = true;
    if (!formData.businessType.trim()) newErrors.businessType = true;
    if (!formData.location.trim()) newErrors.location = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm()) {
      nextStep();
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8 rounded">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2">
              Business Identity
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-3">
              Let's start with the basics. Tell us about your business.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Business Name & Tagline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="businessName"
                name="businessName"
                label="Business Name"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="e.g., TapTune Media"
                className={`${
                  submitted && errors.businessName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300"
                }`}
              />

              <FormInput
                id="tagline"
                name="tagline"
                label="Tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                placeholder="e.g., Empowering your brand"
                className={`${
                  submitted && errors.tagline
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300"
                }`}
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                What type of business are you?
              </label>
              <div
                className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 p-2 rounded-lg ${
                  submitted && errors.businessType
                    ? "border border-red-500"
                    : "border border-transparent"
                }`}
              >
                {businessTypes.map((type) => (
                  <SelectionCard
                    key={type}
                    value={type}
                    isSelected={formData.businessType === type}
                    onSelect={(value) => handleSelection("businessType", value)}
                  />
                ))}
              </div>
            </div>

            {/* Location */}
            <FormInput
              id="location"
              name="location"
              label="Location"
              placeholder="e.g., San Francisco, CA"
              value={formData.location}
              onChange={handleInputChange}
              className={`${
                submitted && errors.location
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
            />

            {/* Buttons */}
            <div className="flex gap-2 flex-col sm:flex-row">
              {/* Next Step - Solid Purple */}

              {/* Skip - Outline Purple */}
              <Button
                type="button"
                variant="outline"
                className="
      flex-1
      py-3 sm:py-4 md:py-6
      border-purple-600 text-purple-600
      hover:text-purple-600
      hover:bg-purple-50 dark:hover:bg-purple-900
      transition-all duration-300
    "
                onClick={() => navigate("/user",{ replace: true })}
              >
                Skip for now
              </Button>

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
    </div>
  );
};

export default OnBoardingForm1;
