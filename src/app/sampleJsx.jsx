"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  CreditCard,
  Users,
  Link,
  Settings,
  Bell,
  User,
  FileText,
  LogOut,
  Star,
  Heart,
  Search,
  Filter,
  Grid3X3,
  List,
  Menu,
  X,
} from "lucide-react";

const cardData = [
  {
    id: 1,
    name: "Gold Card",
    category: "Premium",
    price: "₹1200",
    originalPrice: "₹1500",
    rating: 4.8,
    reviews: 124,
    image:
      "https://firebasestorage.googleapis.com/v0/b/taptune-b3b03.appspot.com/o/image%2F544ea5f3-b234-42f3-8b73-a29e8553391astandard-1.jpg?alt=media&token=9940106e-f49a-4247-8f1e-71adb9d84f9e",
    gradient: "from-yellow-600 via-yellow-500 to-amber-400",
    popular: true,
    features: ["Premium Material", "Gold Foiling", "Custom Design"],
    discount: "20% OFF",
  },
  {
    id: 2,
    name: "Standard Card",
    category: "Standard",
    price: "₹999",
    originalPrice: "₹1199",
    rating: 4.6,
    reviews: 89,
    image:
      "https://firebasestorage.googleapis.com/v0/b/taptune-b3b03.appspot.com/o/image%2Fd4786e0e-215b-412d-a44a-e9637b1c464bExecutive-1.jpg?alt=media&token=8ccbcc99-e743-47ee-8ee1-0f3107bec9a1",
    gradient: "from-blue-800 via-blue-700 to-blue-600",
    popular: false,
    features: ["Quality Print", "Standard Design", "Fast Delivery"],
    discount: "17% OFF",
  },
  {
    id: 3,
    name: "Classic Card",
    category: "Classic",
    price: "₹999",
    originalPrice: "₹1199",
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=480&text=Classic+Business+Card",
    gradient: "from-gray-800 via-gray-700 to-gray-600",
    popular: false,
    features: ["Elegant Design", "Premium Finish", "Timeless Style"],
    discount: "17% OFF",
  },
  {
    id: 4,
    name: "Executive Card",
    category: "Executive",
    price: "₹1599",
    originalPrice: "₹1999",
    rating: 4.9,
    reviews: 67,
    image: "/images/executive-card.jpg",
    gradient: "from-purple-800 via-purple-700 to-purple-600",
    popular: false,
    features: ["Luxury Material", "Embossed Text", "VIP Treatment"],
    discount: "20% OFF",
  },
  {
    id: 5,
    name: "Digital Pro",
    category: "Digital",
    price: "₹799",
    originalPrice: "₹999",
    rating: 4.5,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=480&text=Digital+NFC+Card",
    gradient: "from-green-700 via-green-600 to-emerald-500",
    popular: false,
    features: ["NFC Enabled", "QR Code", "Digital Sharing"],
    discount: "20% OFF",
  },
  {
    id: 6,
    name: "Minimalist",
    category: "Modern",
    price: "₹899",
    originalPrice: "₹1099",
    rating: 4.4,
    reviews: 91,
    image: "/placeholder.svg?height=300&width=480&text=Minimalist+Design",
    gradient: "from-slate-700 via-slate-600 to-slate-500",
    popular: false,
    features: ["Clean Design", "Modern Look", "Sustainable"],
    discount: "18% OFF",
  },
];

const sidebarItems = [
  { icon: Home, label: "Home", active: false },
  { icon: CreditCard, label: "Card Orders", active: true },
  { icon: Users, label: "Profiles", active: false },
  { icon: Link, label: "Connections", active: false },
  { icon: Settings, label: "Settings", active: false },
  { icon: Bell, label: "Notifications", active: false },
  { icon: User, label: "Manage Account", active: false },
  { icon: FileText, label: "Report", active: false },
];

const categories = [
  "All",

];

export default function CardOrdersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredCards =
    selectedCategory === "All"
      ? cardData
      : cardData.filter((card) => card.category === selectedCategory);

  const toggleFavorite = (cardId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(cardId)) {
      newFavorites.delete(cardId);
    } else {
      newFavorites.add(cardId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Card Orders
                </h1>
                <p className="text-gray-600 mt-1">
                  Choose from our premium collection of digital business cards
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search cards..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </header>

        {/* Filters and View Controls */}
        <div className="px-4 lg:px-8 py-6 bg-white border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700"
                      : ""
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {filteredCards.length} cards
              </span>
              <div className="flex border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <main className="px-4 lg:px-8 py-8">
          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Container */}
                <Card className="relative w-full aspect-[1.6/1] border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-105 rounded-xl">
                  {/* Card Image */}
                  <div className="absolute inset-0">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/taptune-b3b03.appspot.com/o/image%2Fd4786e0e-215b-412d-a44a-e9637b1c464bExecutive-1.jpg?alt=media&token=8ccbcc99-e743-47ee-8ee1-0f3107bec9a1"
                      alt={card.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Top Corner Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                    <div className="flex gap-2">
                      {card.popular && (
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 text-xs shadow-lg">
                          Popular
                        </Badge>
                      )}
                      {card.discount && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 text-xs shadow-lg">
                          {card.discount}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(card.id);
                      }}
                      className="text-white hover:bg-white/20 p-2 h-auto bg-black/20 backdrop-blur-sm rounded-full"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.has(card.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/90 backdrop-blur-sm rounded-xl transition-all duration-300 flex items-center justify-center ${
                      hoveredCard === card.id
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="text-center text-white p-6 space-y-4 max-w-full">
                      {/* Card Title */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">
                          {card.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-white/20 text-white border-0"
                        >
                          {card.category}
                        </Badge>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-center space-x-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{card.rating}</span>
                        <span className="text-sm opacity-70">
                          ({card.reviews} reviews)
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-3">
                          <span className="text-2xl sm:text-3xl font-bold">
                            {card.price}
                          </span>
                          <span className="text-lg opacity-60 line-through">
                            {card.originalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <div className="text-sm opacity-80">Key Features:</div>
                        <div className="flex flex-wrap justify-center gap-1">
                          {card.features.map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Order Button */}
                      <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold mt-4">
                        Order Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
