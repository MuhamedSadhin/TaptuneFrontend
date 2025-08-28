// src/components/RedirectButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const RedirectButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth");
  };

  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <button
        onClick={handleClick}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        Go to Auth
      </button>
    </div>
  );
};

export default RedirectButton;
