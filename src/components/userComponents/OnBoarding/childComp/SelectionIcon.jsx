import React from "react";
import {
  FiShoppingCart,
  FiSettings,
  FiUsers,
  FiStar,
  FiActivity,
  FiBriefcase,
  FiCpu,
  FiHeart,
  FiScissors,
  FiCoffee,
  FiBookOpen,
  FiHome,
  FiTarget,
  FiUserCheck,
  FiPhone,
  FiMail,
  FiGlobe,
  FiShare2,
  FiUserPlus,
} from "react-icons/fi";

// SelectionIcon component using React Icons
const SelectionIcon = ({ type, size = 20, className = "text-gray-700" }) => {
  const iconMap = {
    // Business Types / Industries (Step 1)
    Retail: FiShoppingCart,
    Service: FiSettings,
    Agency: FiUsers,
    Creator: FiStar,
    Startup: FiActivity,
    Organization: FiBriefcase,
    Technology: FiCpu,
    "Health & Wellness": FiHeart,
    "Fashion & Apparel": FiScissors,
    "Food & Beverage": FiCoffee,
    Education: FiBookOpen,
    "Real Estate": FiHome,

    // Main Goals (Step 2)
    "Promote Business": FiTarget,
    "Attract Clients": FiUserCheck,
    "Recruit Team Members": FiUserPlus,
    Networking: FiShare2,
    "Build Brand Awareness": FiStar,
    Other: FiActivity,

    // Target Audiences (Step 2)
    Customers: FiUsers,
    Partners: FiBriefcase,
    Students: FiBookOpen,
    Investors: FiActivity,
    Community: FiUsers,
    OtherAudience: FiActivity, // fallback for "Other" audience

    // Contact Preferences (Step 2)
    Email: FiMail,
    WhatsApp: FiPhone,
    "Booking Link": FiGlobe,
    "Website Form": FiGlobe,
    "Social Media": FiShare2,

    // Heard About TapTune (Step 3)
    Friend: FiUsers,
    Ads:  FiStar,
    Website: FiGlobe,
    OtherInfo: FiActivity, 
  };

  // Handle "Other" cases
  let normalizedType = type;
  if (type === "Other" && !iconMap[type]) normalizedType = "OtherAudience";
  if (
    ["Friend", "Ad", "Website", "Social Media", "Other"].includes(type) &&
    !iconMap[type]
  )
    normalizedType = "OtherInfo";

  const IconComponent = iconMap[normalizedType];

  if (!IconComponent) return null;

  return <IconComponent size={size} className={className} />;
};

export default SelectionIcon;
