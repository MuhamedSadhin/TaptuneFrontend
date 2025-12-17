
"use client";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { iconObj } from "@/assets/Icons/icons.jsx";
import { HiMiniPhone, HiMiniEye } from "react-icons/hi2"; 
import { HiMiniUser, HiMiniPencilSquare } from "react-icons/hi2"; // Heroicons 2
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

export const ProfileCard = ({ profile }) => {
  const { user } = useAuthUser();
  const role = user?.role; // "admin" | "user" | "sales"
  const navigate = useNavigate();
  const {
    _id,
    viewId,
    fullName,
    designation,
    profilePic,
    banner,
    phoneNumber,
    socialMedia,
    cardOrderId,
    isActive,
  } = profile;
  const handleEditProfile = () => {
    if( role === "sales" ){
    navigate(`/admin/profile/edit/${_id}`, { state: { profile } });
    } else {
      navigate(`/user/profile/edit/${_id}`, { state: { profile } });
    }
  }

   let statusText = "";
   let styles = "";
   let dotStyles = "";

   // Main Logic: Check for 'Delivered' status first.
   if (cardOrderId?.status.toLowerCase() === "delivered") {
     if (isActive) {
       statusText = "Active";
       styles = "bg-green-100 text-green-800 shadow-lg shadow-green-500/40";
       dotStyles = "bg-green-500";
     } else {
       statusText = "Inactive";
       styles = "bg-gray-200 text-gray-800";
       dotStyles = "bg-gray-500";
     }
   } else {
     // Handle all other order statuses.
     switch (cardOrderId?.status.toLowerCase()) {
       case "pending":
         statusText = "Pending";
         styles = "bg-yellow-100 text-yellow-800";
         dotStyles = "bg-yellow-500";
         break;
       case "confirmed":
         statusText = "Confirmed";
         styles = "bg-blue-100 text-blue-800";
         dotStyles = "bg-blue-500";
         break;
       case "design completed":
         statusText = "Design Completed";
         styles = "bg-indigo-100 text-indigo-800";
         dotStyles = "bg-indigo-500";
         break;
       default:
          statusText = cardOrderId?.status || "Unknown";
          styles = "bg-gray-100 text-gray-800";
          dotStyles = "bg-gray-500";
         break;
     }
   }

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl md:max-w-lg">
        {/* Banner Image */}
        <div className="relative h-40 sm:h-48">
          {/* --- Active Status Badge --- */}
          <div
            className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${styles}`}
          >
            <span className={`w-2 h-2 rounded-full ${dotStyles}`}></span>
            <span>{statusText}</span>
          </div>

          <img
            className="w-full h-full object-cover"
            src={
              banner ||
              "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=60"
            }
            alt="Banner"
          />
        </div>

        {/* Profile Content */}
        <div className="relative -mt-16 px-4 sm:px-6 pb-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-white rounded-full overflow-hidden shadow-md">
              {profilePic ? (
                <img
                  className="w-full h-full object-cover  bg-gray-200"
                  src={profilePic}
                  alt="Profile"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-400">
                  <FaUser className="w-15 h-15 text-gray-900" />{" "}
                  {/* Profile icon */}
                </div>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-4 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
              {fullName || "Unknown"}
            </h2>

            <p className="text-sm sm:text-md text-gray-500 truncate">
              {designation || "Professional"}
            </p>

            {/* Phone Number */}
            <p className="flex items-center justify-center gap-2 text-sm sm:text-md text-gray-500 truncate mt-1">
              <HiMiniPhone className="w-4 h-4 text-blue-900" />
              {phoneNumber || "Not Provided"}
            </p>

            {/* Profile Views */}
            <div className="mt-2 flex items-center justify-center gap-2 text-gray-600">
              <HiMiniEye className="w-5 h-5 text-purple-600" />
              <span className="text-sm sm:text-md font-medium">
                {profile?.profileViews || 0}{" "}
                <span className="text-gray-500">views</span>
              </span>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center mt-2">
              {socialMedia.length === 0 ? (
                <p className="text-center text-gray-500 text-sm sm:text-base">
                  No social media accounts added yet.
                </p>
              ) : (
                <div className="flex flex-wrap justify-center gap-2">
                  {iconObj
                    .filter((icon) =>
                      socialMedia.some(
                        (s) =>
                          s.platform.toLowerCase() === icon.name.toLowerCase()
                      )
                    )
                    .slice(0, 7)
                    .map((platform) => (
                      <button
                        key={platform.name}
                        className="relative flex flex-col items-center justify-center  transition-all duration-200 hover:scale-105"
                      >
                        <div className="w-6 h-6 flex items-center  justify-center">
                          <img
                            src={platform.icon}
                            alt={platform.name}
                            className="object-contain rounded-sm w-full h-full"
                          />
                        </div>
                      </button>
                    ))}

                  {socialMedia.length > 8 && (
                    <div className="flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-600">
                        ...
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-3 mt-3">
               <a
                href={`#/profile?id=${viewId}`}
                target="_blank"
                className="flex items-center gap-2 bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                <HiMiniUser className="w-4 h-4" />
                View Profile
              </a>

              {/* Edit Profile */}
              <button
                onClick={handleEditProfile}
                className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                <HiMiniPencilSquare className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};