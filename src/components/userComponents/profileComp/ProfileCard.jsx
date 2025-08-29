
"use client";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { iconObj } from "@/assets/Icons/icons.jsx";


export const ProfileCard = ({ profile }) => {
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
  } = profile;
  const handleEditProfile = () => {
    navigate(`/user/profile/edit/${_id}`, { state: { profile } });
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl md:max-w-lg">
        {/* Banner Image */}
        <div className="relative h-40 sm:h-48">
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
            <p className="text-sm sm:text-md text-gray-500 truncate mt-1">
              {phoneNumber || "Not Provided"}
            </p>

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

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-5">
              <a
                href={`#/profile?id=${viewId}`}
                target="_blank"
                className="bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                View Profile
              </a>
              <button
                onClick={handleEditProfile}
                className="border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};