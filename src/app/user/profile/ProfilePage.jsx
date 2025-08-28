"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Menu, Plus } from "lucide-react";
import { useGetAllProfile } from "@/hooks/tanstackHooks/useProfile";
import { ProfileCard } from "@/components/userComponents/profileComp/ProfileCard";
import { useNavigate } from "react-router-dom";

import Loader from  "@/components/ui/Loader";

export default function ProfilesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [favorites, setFavorites] = useState(new Set());
    const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAllProfile();
    const profiles = data?.profile || [];

  const toggleFavorite = (profileId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(profileId)) {
      newFavorites.delete(profileId);
    } else {
      newFavorites.add(profileId);
    }
    setFavorites(newFavorites);
  };


  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500 mb-2">
            Error loading profiles
          </h2>
          <p className="text-gray-600">
            Please try again later or refresh the page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Profiles
                </h1>
                <p className="text-gray-600">Discover talented professionals</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate(`/user/cards`)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Profile
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[60vh]">
            {isLoading ? (
              <Loader />
            ) : profiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {profiles.map((profile) => (
                  <ProfileCard
                    key={profile._id}
                    profile={profile}
                    isFavorite={favorites.has(profile._id)}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No profiles available
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  There are currently no profiles to display
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
