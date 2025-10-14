"use client";

import { memo, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiChevronRight } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Gift,
  Users,
  Calendar,
  Phone,
  Mail,
  Eye,
  ArrowRight,
} from "lucide-react";
import { useHomepageData } from "@/hooks/tanstackHooks/useUser";
import { downloadVCard } from "@/utils/contactSave";
import Loader from "@/components/ui/Loader";
import PhoneNumberModal from "@/components/authComponents/PhoneNumberModal";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

const img =
  "https://img.freepik.com/free-photo/3d-render-cyber-technology-with-flowing-particles_1048-12732.jpg?q=80&semt=ais_hybrid&w=740";

const HomePage = () => {
  const { data, isLoading } = useHomepageData();
  const navigate = useNavigate();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const { user } = useAuthUser()
  console.log("Authenticated User:", user);

  useEffect(() => {
    if (user) {
 
      const { accountType, phoneNumber } = user || {};

      if (accountType === "personal" && !phoneNumber) {
        const today = new Date().toLocaleDateString();
        const lastShown = localStorage.getItem("phoneModalLastShown");

        if (!lastShown || lastShown !== today) {
          setShowPhoneModal(true);
          localStorage.setItem("phoneModalLastShown", today);
        }
      }
    }
  }, [user]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  const {
    totalProfiles = 0,
    totalConnections = 0,
    totalProfileViews = 0,
    lastProfiles = [],
    lastConnections = [],
  } = data?.data || {};

  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <section className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome Back! 👋
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Here's what's happening with your professional network today.
          </p>
        </section>

        {/* Dashboard Grid */}
        <section className="flex flex-col lg:flex-row gap-6">
          {/* Insights */}
          <div className="flex-1 lg:flex-[3]">
            <div
              className="bg-violet-100 rounded-2xl p-4 sm:p-6 lg:p-8 bg-cover bg-center shadow-md"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="mb-6">
                <h2 className="text-white text-xl sm:text-2xl font-bold">
                  Insights
                </h2>
                <p className="text-white text-sm sm:text-base mt-1 opacity-90">
                  Track your total connections, new interactions, and taps
                  effortlessly.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                  title="Total Profiles"
                  value={totalProfiles}
                  icon={<CreditCard />}
                  link="/user/profiles"
                  linkText="View Profiles"
                />
                <StatCard
                  title="Connected Users"
                  value={totalConnections}
                  icon={<Users />}
                  link="/user/connections"
                  linkText="View Connects"
                />
                <StatCard
                  title="Profile Views"
                  value={totalProfileViews}
                  icon={<Eye />}
                />
              </div>
            </div>
          </div>

          {/* Expand Network */}
          <div className="flex-1">
            <Card className="flex flex-col justify-between bg-[#6C63FF] text-white rounded-2xl shadow-lg h-full">
              <CardHeader className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-white p-4 rounded-full shadow-md">
                  <Gift className="w-5 h-5 text-[#6C63FF]" />
                </div>
                <CardTitle className="text-xl font-bold">
                  Expand Network!
                </CardTitle>
                <CardDescription className="text-sm text-white/90">
                  Connect with professionals and build meaningful relationships.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-black text-white rounded-full hover:bg-gray-900"
                  onClick={() => navigate("/user/connections")}
                >
                  Find Connections
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Connections & Profiles */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Connections */}
          <Card className="rounded-2xl shadow-md border bg-white">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Users className="w-5 h-5" />
                Recent Connections
              </CardTitle>
              <Button
                variant="ghost"
                className="bg-purple-500 text-white hover:bg-purple-600"
                onClick={() => navigate("/user/connections")}
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {lastConnections.length > 0 ? (
                lastConnections
                  .slice(0, 5)
                  .map((c) => <ConnectionItem key={c._id} connection={c} />)
              ) : (
                <EmptyState
                  icon={<Users className="w-10 h-10 text-gray-400" />}
                  title="No connections yet"
                  desc="Start connecting with people to see them here."
                />
              )}
            </CardContent>
          </Card>

          {/* Profiles */}
          <Card className="rounded-2xl shadow-md border bg-white">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Calendar className="w-5 h-5 text-primary" />
                Your Profiles
              </CardTitle>
              <Button
                variant="ghost"
                className="bg-purple-500 text-white hover:bg-purple-600"
                onClick={() => navigate("/user/profiles")}
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {lastProfiles.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {lastProfiles.slice(0, 5).map((p) => (
                    <ProfileItem key={p._id} profile={p} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Calendar className="w-10 h-10 text-gray-400" />}
                  title="No profiles created"
                  desc="Create your first profile to showcase here."
                />
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      {/* ✅ Phone Number Modal */}
      <PhoneNumberModal
        open={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
      />
    </div>
  );
};

/* --------------------------- Helper Components --------------------------- */
const StatCard = memo(({ title, value, icon, link, linkText }) => (
  <div className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 sm:p-6">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs sm:text-sm uppercase tracking-wide text-gray-500">
          {title}
        </p>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
          {value}
        </h3>
      </div>
      <div className="flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-violet-600 text-white rounded-full shadow-md">
        {icon}
      </div>
    </div>
    {link && (
      <Link
        to={link}
        className="mt-4 inline-flex items-center gap-1 text-sm sm:text-base font-medium text-violet-600 hover:text-violet-700 transition-colors"
      >
        {linkText} <HiChevronRight className="w-4 h-4" />
      </Link>
    )}
  </div>
));

const ConnectionItem = memo(({ connection }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border hover:shadow transition">
    <div className="flex items-center gap-3 min-w-0">
      <Avatar className="w-14 h-14 flex-shrink-0">
        <AvatarFallback>
          {connection.name?.charAt(0)?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col min-w-0">
        <p className="font-medium truncate">{connection.fullName}</p>
        <p className="text-sm text-gray-600 truncate">
          {connection.designation}
        </p>
        <p className="text-xs text-gray-500 truncate">{connection.email}</p>
      </div>
    </div>
    <Button
      variant="outline"
      size="sm"
      onClick={() => downloadVCard(connection)}
      className="hover:bg-purple-600 hover:text-white"
    >
      Add Contact
    </Button>
  </div>
));

const ProfileItem = memo(({ profile }) => {
  let isActive = profile?.isActive;
  let cardOrderId = profile?.cardOrderId;
  let statusText = "";
  let badgeClasses = "";

  if (cardOrderId?.status?.toLowerCase() === "delivered") {
    if (isActive) {
      statusText = "Active";
      badgeClasses = "bg-green-100 text-green-700 border border-green-300";
    } else {
      statusText = "Inactive";
      badgeClasses = "bg-gray-100 text-gray-700 border border-gray-300";
    }
  } else {
    switch (cardOrderId?.status?.toLowerCase()) {
      case "pending":
        statusText = "Pending";
        badgeClasses = "bg-amber-100 text-amber-700 border border-amber-300";
        break;
      case "confirmed":
        statusText = "Confirmed";
        badgeClasses = "bg-blue-100 text-blue-700 border border-blue-300";
        break;
      case "design completed":
        statusText = "Design Completed";
        badgeClasses = "bg-indigo-100 text-indigo-700 border border-indigo-300";
        break;
      default:
        statusText = "Unknown";
        badgeClasses = "bg-gray-200 text-gray-600 border border-gray-300";
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl shadow-sm border">
      <Avatar className="w-16 h-16 flex-shrink-0">
        <AvatarImage
          src={profile.profilePic || "/placeholder.svg"}
          loading="lazy"
        />
        <AvatarFallback>
          {profile.fullName
            ?.split(" ")
            .map((n) => n[0])
            .join("") || "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold truncate">{profile.fullName}</p>
          <Badge className={`${badgeClasses} mt-1`}>{statusText}</Badge>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {profile.userName ||
            profile.fullName?.toLowerCase().replace(/\s/g, "")}
        </p>
        <div className="flex flex-wrap gap-3 text-sm mt-1 text-gray-600">
          <span className="flex items-center gap-1 truncate">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{profile.phoneNumber || "N/A"}</span>
          </span>
          <span className="flex items-center gap-1 truncate">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{profile.email || "N/A"}</span>
          </span>
        </div>
      </div>

      <a
        href={`#/profile?id=${profile.viewId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="outline"
          className="hover:bg-purple-600 hover:text-white"
        >
          View
        </Button>
      </a>
    </div>
  );
});

const EmptyState = memo(({ icon, title, desc }) => (
  <div className="flex flex-col items-center justify-center w-full h-60 text-center border border-dashed rounded-xl bg-gray-50 p-4">
    {icon}
    <p className="text-gray-700 font-medium mt-2">{title}</p>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
));

export default HomePage;
