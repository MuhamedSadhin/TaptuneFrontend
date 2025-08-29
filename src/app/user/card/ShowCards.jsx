"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wifi, TrendingUp, Heart, Star } from "lucide-react";
import { useGetAllCards } from "@/hooks/tanstackHooks/useCard";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/ui/Loader";

export default function ShowCards() {
  const [favorites, setFavorites] = useState(new Set());
  const { data , isLoading } = useGetAllCards();
  const navigate = useNavigate();

  const toggleFavorite = (cardId) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(cardId)
      ? newFavorites.delete(cardId)
      : newFavorites.add(cardId);
    setFavorites(newFavorites);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Premium":
        return "text-purple-600 bg-purple-50";
      case "Standard":
        return "text-blue-600 bg-blue-50";
      case "Classic":
        return "text-pink-600 bg-pink-50";
      case "Basic":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Card Orders
            </h1>
            <p className="text-gray-600 text-sm">
              Choose from our premium collection of digital business cards
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <Loader />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {data?.data?.map((card) => (
                <Card
                  key={card._id}
                  className="group relative border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl bg-white"
                >
                  {/* Badge */}
                  {card.category === "Premium" && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 text-xs px-2 py-1 shadow">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
                    <img
                      src={card.frontImage}
                      alt={card.cardName}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(card._id)}
                      className="absolute bottom-3 right-3 h-8 w-8 p-0 bg-white/30 hover:bg-white/50 text-white"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.has(card._id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Content */}
                  <CardContent className="">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight mb-1 line-clamp-1">
                      {card.cardName}
                    </h3>

                    <div className="flex items-center gap-2 text-xs sm:text-sm mb-2">
                      <span className="text-gray-500">Category:</span>
                      <Badge
                        variant="secondary"
                        className={getCategoryColor(card.category)}
                      >
                        {card.category}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Rating:
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                              i < 4
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-bold text-gray-800">
                        ₹{card.price}/-
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-sm"
                        onClick={() => navigate(`/user/booking/${card._id}`)}
                      >
                        Order Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
