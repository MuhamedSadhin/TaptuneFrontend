import React from "react";

// A reusable input field component for consistency
const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-300 ${className}`}
    />
  </div>
);

export default FormInput;
