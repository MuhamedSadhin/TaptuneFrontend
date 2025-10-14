import React from "react";
import SelectionIcon from "./SelectionIcon";


// Reusable card-style button for selections, now more compact
const SelectionCard = ({ value, isSelected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={`
      flex flex-col items-center justify-center p-2 text-center border-2 rounded-xl 
      cursor-pointer transition-all duration-300 transform hover:scale-105
      ${
        isSelected
          ? "bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500 shadow-md"
          : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
      }
    `}
  >
    <div className="mb-1">
      <SelectionIcon type={value} />
    </div>
    <span className="font-semibold text-xs leading-tight">{value}</span>
  </button>
);

export default SelectionCard;
