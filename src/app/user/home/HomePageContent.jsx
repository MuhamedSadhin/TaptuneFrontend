
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { HiChevronRight } from "react-icons/hi2";
// import { Link, useNavigate } from "react-router-dom";
// import { CreditCardIcon, Gift } from "lucide-react";
// import { ArrowRight01Icon, FileViewIcon } from "hugeicons-react";
// import {
//   Target,
//   Users,
//   Calendar,
//   MessageSquare,
//   ArrowRight,
//   Plus,
// } from "lucide-react";
// import { useHomepageData } from "@/hooks/tanstackHooks/useUser";
// import { downloadVCard } from "@/utils/contactSave";

// export default function HomePage() {
//   const [currentTime, setCurrentTime] = useState("");
//   const { data, isLoading } = useHomepageData();
//   const navigate = useNavigate();
//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       setCurrentTime(
//         now.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         })
//       );
//     };
//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, []);
//     const handleViewProfile = (viewId) => {
//       window.open(`/profile?id=${viewId}`, "_blank", "noopener,noreferrer");
//     };
//   // const img =
//   //   "https://img.freepik.com/free-photo/3d-render-abstract-background-with-floating-cyber-particles_1048-14513.jpg?t=st=1731921177~exp=1731924777~hmac=2e2bf557fd0f768fc87eca2e148accce0ddb08184b7fc24efff44d7a60c4c249&w=1060";
//     const img =
//       "https://img.freepik.com/free-photo/3d-render-cyber-technology-with-flowing-particles_1048-12732.jpg?q=80&semt=ais_hybrid&w=740";
//   if (isLoading) return <div className="text-center py-20">Loading...</div>;

//   const { totalProfiles, totalConnections, lastProfiles, lastConnections } =
//     data.data;

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="space-y-8">
//         {/* Welcome Section */}
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold text-foreground">
//             Welcome Back ! 👋
//           </h1>
//           <p className="text-muted-foreground">
//             Here's what's happening with your professional network today.
//           </p>
//         </div>

//         {/* Main Dashboard Grid */}
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Insights Card */}
//           <div className="flex-1 lg:flex-[3] max-w-full">
//             <div
//               className="bg-violet-100 rounded-lg p-4 sm:p-6 lg:p-8 bg-center bg-cover bg-no-repeat"
//               style={{ backgroundImage: `url(${img})` }}
//             >
//               <div className="">
//                 <div className="mb-8">
//                   <h1 className="text-white text-2xl sm:text-3xl font-bold">
//                     Insights
//                   </h1>
//                   <p className="text-white max-w-3xl text-sm sm:text-base font-light mt-1">
//                     Track your total connections, new interactions, and taps
//                     effortlessly with real-time insights
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {/* Total Profiles */}
//                   <div className="flex flex-col bg-white/85 border rounded-xl backdrop-blur-[3px] shadow-lg ring-1 ring-black/5">
//                     <div className="p-4 md:p-5 flex justify-between gap-x-3">
//                       <div>
//                         <p className="text-xs uppercase tracking-wide text-gray-700">
//                           Total Profiles
//                         </p>
//                         <div className="mt-1 flex items-center gap-x-2">
//                           <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//                             {totalProfiles}
//                           </h3>
//                         </div>
//                       </div>
//                       <div className="flex justify-center items-center w-12 h-12 bg-violet-600 text-white rounded-full">
//                         <CreditCardIcon />
//                       </div>
//                     </div>
//                     <Link
//                       to="/user/profiles"
//                       className="py-3 px-4 md:px-5 inline-flex justify-between items-center text-sm text-gray-900 border-t border-gray-100/30 transition-all duration-300 hover:bg-white/25 rounded-b-xl"
//                     >
//                       View Profiles
//                       <HiChevronRight strokeWidth={0.5} />
//                     </Link>
//                   </div>

//                   {/* Connected Users */}
//                   <div className="flex flex-col bg-white/85 border rounded-xl backdrop-blur-[3px] shadow-lg ring-1 ring-black/5">
//                     <div className="p-4 md:p-5 flex justify-between gap-x-3">
//                       <div>
//                         <p className="text-xs uppercase tracking-wide text-gray-700">
//                           Connected Users
//                         </p>
//                         <div className="mt-1 flex items-center gap-x-2">
//                           <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//                             {totalConnections}
//                           </h3>
//                         </div>
//                       </div>
//                       <div className="flex justify-center items-center w-12 h-12 bg-violet-600 text-white rounded-full">
//                         <CreditCardIcon />
//                       </div>
//                     </div>
//                     <Link
//                       to="/user/connections"
//                       className="py-3 px-4 md:px-5 inline-flex justify-between items-center text-sm text-gray-900 border-t border-gray-100/30 transition-all duration-300 hover:bg-white/25 rounded-b-xl"
//                     >
//                       View Connects
//                       <HiChevronRight strokeWidth={0.5} />
//                     </Link>
//                   </div>

//                   {/* Profile Views Placeholder */}
//                   <div className="flex flex-col bg-white/85 border rounded-xl backdrop-blur-[3px] shadow-lg ring-1 ring-black/5">
//                     <div className="p-4 md:p-5 flex justify-between gap-x-3">
//                       <div>
//                         <p className="text-xs uppercase tracking-wide text-gray-700">
//                           Profile Views
//                         </p>
//                         <div className="mt-1 flex items-center gap-x-2">
//                           <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//                             10
//                           </h3>
//                         </div>
//                       </div>
//                       <div className="flex justify-center items-center w-12 h-12 bg-violet-600 text-white rounded-full">
//                         <FileViewIcon />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Expand Network Card */}
//           <div className="flex-1 justify-between">
//             <Card className="flex flex-col justify-between bg-[#6C63FF] rounded-2xl p-6 text-center text-white shadow-lg">
//               <CardHeader className="flex flex-col items-center space-y-4">
//                 {/* Icon section */}
//                 <div className="bg-white p-4 rounded-full shadow-md">
//                   <Gift className="w-5 h-5 text-[#6C63FF]" />
//                 </div>

//                 {/* Title */}
//                 <CardTitle className="text-xl font-bold">
//                   Expand Network!
//                 </CardTitle>

//                 {/* Description */}
//                 <CardDescription className="text-sm text-white/90 leading-relaxed">
//                   Connect with professionals, share opportunities, and start
//                   building meaningful relationships today!
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="mt-6">
//                 <Button
//                   className="w-full bg-black text-white rounded-full py-2 px-4 hover:bg-gray-900"
//                   onClick={() => navigate("/user/connections")}
//                 >
//                   Find Connections
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Recent Activity & Profiles */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Recent Connections */}
//           <Card className="rounded-2xl shadow-md border border-gray-100 bg-white">
//             <CardHeader className="flex items-center justify-between pb-2">
//               <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
//                 <Users className="w-5 h-5 text-purple-600" />
//                 Recent Connections
//               </CardTitle>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50"
//                 onClick={() => navigate("/user/connections")}
//               >
//                 View All
//                 <ArrowRight className="w-4 h-4 ml-1" />
//               </Button>
//             </CardHeader>

//             <CardContent className="space-y-3">
//               {lastConnections.length > 0 ? (
//                 lastConnections.map((connection) => (
//                   <div
//                     key={connection._id}
//                     className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow-sm transition"
//                   >
//                     {/* Left side: Avatar + Info */}
//                     <div className="flex items-center gap-3">
//                       <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-purple-700">
//                         {connection.name?.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex flex-col">
//                         <p className="font-medium text-gray-900">
//                           {connection.name}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           {connection.designation}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {connection.email}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right side: Button */}
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className=" border text-purple-600 hover:bg-purple-600 hover:text-white transition"
//                       onClick={() => downloadVCard(connection)}
//                     >
//                       Add Contact
//                     </Button>
//                   </div>
//                 ))
//               ) : (
//                 // Empty state
//                 <div className="flex flex-col items-center justify-center h-48 w-full text-center border border-dashed border-gray-200 rounded-xl bg-gray-50">
//                   <Users className="w-10 h-10 text-gray-400 mb-2" />
//                   <p className="text-gray-600 font-medium">
//                     No connections yet
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Start connecting with people to see them here.
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Recent Profiles */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 <span className="flex items-center gap-2">
//                   <Calendar className="w-5 h-5 text-primary" />
//                   Your Profiles
//                 </span>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => navigate("/user/profiles")}
//                 >
//                   View All
//                   <ArrowRight className="w-4 h-4 ml-1" />
//                 </Button>
//               </CardTitle>
//             </CardHeader>

//             <CardContent>
//               {lastProfiles.length > 0 ? (
//                 <div className="flex flex-col gap-4">
//                   {lastProfiles.map((profile) => (
//                     <div
//                       key={profile._id}
//                       className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 w-full max-w-full overflow-hidden"
//                     >
//                       {/* Avatar */}
//                       <div className="relative flex-shrink-0">
//                         <Avatar className="w-16 h-16">
//                           <AvatarImage
//                             src={profile.profilePic || "/placeholder.svg"}
//                           />
//                           <AvatarFallback>
//                             {profile.fullName
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                         {/* Online Indicator */}
//                         <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
//                       </div>

//                       {/* User Info */}
//                       <div className="flex-1 flex flex-col overflow-hidden">
//                         <div className="truncate">
//                           <p className="font-semibold text-gray-900 truncate">
//                             {profile.fullName}
//                           </p>
//                           <p className="text-sm text-gray-500 truncate">
//                             {profile.userName ||
//                               profile.fullName.toLowerCase().replace(/\s/g, "")}
//                           </p>
//                         </div>

//                         <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 overflow-hidden">
//                           <div className="flex items-center gap-1 min-w-[120px] max-w-[200px] truncate">
//                             <svg
//                               className="w-4 h-4 text-black flex-shrink-0"
//                               fill="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
//                             </svg>
//                             <span className="truncate">
//                               {profile.phoneNumber || "N/A"}
//                             </span>
//                           </div>

//                           <div className="flex items-center gap-1 min-w-[120px] max-w-[200px] truncate">
//                             <svg
//                               className="w-4 h-4 text-black flex-shrink-0"
//                               fill="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path d="M4 4h16v16H4V4zm8 8l8-5V6L12 11 4 6v1l8 5z" />
//                             </svg>
//                             <span className="truncate">
//                               {profile.email || "N/A"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* View Profile Button */}
//                       <div className="flex-shrink-0">
//                         <Button
//                           variant="outline"
//                           className="text-sm bg-white text-black border-gray-300 hover:bg-gray-100"
//                           onClick={() => handleViewProfile(profile.viewId)}
//                         >
//                           View Profile
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 // Empty state
//                 <div className="flex flex-col items-center justify-center h-48 w-full text-center border border-dashed border-gray-200 rounded-xl bg-gray-50">
//                   <Calendar className="w-10 h-10 text-gray-400 mb-2" />
//                   <p className="text-gray-600 font-medium">
//                     No profiles created
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Create your first profile to showcase here.
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useHomepageData } from "@/hooks/tanstackHooks/useUser";
import { downloadVCard } from "@/utils/contactSave";

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("");
  const { data, isLoading } = useHomepageData();
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleViewProfile = (viewId) => {
    if (!viewId) return;
    window.open(`/profile?id=${viewId}`, "_blank", "noopener,noreferrer");
  };

  const img =
    "https://img.freepik.com/free-photo/3d-render-cyber-technology-with-flowing-particles_1048-12732.jpg?q=80&semt=ais_hybrid&w=740";

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  // Safe destructuring
  const {
    totalProfiles = 0,
    totalConnections = 0,
    lastProfiles = [],
    lastConnections = [],
  } = data?.data || {};

  return (
    <div className="min-h-screen bg-background ">
      <main className="space-y-8">
        {/* Welcome Section */}
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome Back! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your professional network today.
          </p>
        </section>

        {/* Dashboard Grid */}
        <section className="flex flex-col lg:flex-row gap-6">
          {/* Insights */}
          <div className="flex-1 lg:flex-[3]">
            <div
              className="bg-violet-100 rounded-2xl p-6 sm:p-8 bg-cover bg-center shadow-md"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="mb-6">
                <h2 className="text-white text-2xl sm:text-3xl font-bold">
                  Insights
                </h2>
                <p className="text-white text-sm sm:text-base mt-1 opacity-90">
                  Track your total connections, new interactions, and taps
                  effortlessly with real-time insights.
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
                <StatCard title="Profile Views" value={10} icon={<Eye />} />
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
                <CardDescription className="text-sm text-white/90 leading-relaxed">
                  Connect with professionals, share opportunities, and build
                  meaningful relationships today.
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
                lastConnections.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-center justify-between p-4 rounded-xl border hover:shadow transition"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-14 h-14">
                        <AvatarFallback>
                          {c.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-sm text-gray-600">{c.designation}</p>
                        <p className="text-xs text-gray-500">{c.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadVCard(c)}
                      className="hover:bg-purple-600 hover:text-white"
                    >
                      Add Contact
                    </Button>
                  </div>
                ))
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
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Your Profiles
              </CardTitle>
              <Button
                variant="ghost"
                className="bg-purple-500 text-white hover:bg-purple-600 "
                onClick={() => navigate("/user/profiles")}
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {lastProfiles.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {lastProfiles.map((p) => (
                    <div
                      key={p._id}
                      className="flex items-center gap-4 p-4 rounded-xl shadow-sm border"
                    >
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={p.profilePic || "/placeholder.svg"} />
                        <AvatarFallback>
                          {p.fullName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{p.fullName}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {p.userName ||
                            p.fullName?.toLowerCase().replace(/\s/g, "")}
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm mt-1 text-gray-600">
                          <span className="flex items-center gap-1 truncate">
                            <Phone className="w-4 h-4" />{" "}
                            {p.phoneNumber || "N/A"}
                          </span>
                          <span className="flex items-center gap-1 truncate">
                            <Mail className="w-4 h-4" /> {p.email || "N/A"}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(p.viewId)}
                      >
                        View
                      </Button>
                    </div>
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
    </div>
  );
}

/* ---------------- Helper Components ---------------- */
const StatCard = ({ title, value, icon, link, linkText }) => (
  <div className="flex flex-col bg-white/90 border rounded-xl shadow-lg backdrop-blur p-5">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-600">{title}</p>
        <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
      </div>
      <div className="flex justify-center items-center w-12 h-12 bg-violet-600 text-white rounded-full">
        {icon}
      </div>
    </div>
    {link && (
      <Link
        to={link}
        className="mt-3 inline-flex justify-between items-center text-sm text-gray-900 hover:underline"
      >
        {linkText} <HiChevronRight />
      </Link>
    )}
  </div>
);

const EmptyState = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center justify-center h-48 w-full text-center border border-dashed rounded-xl bg-gray-50">
    {icon}
    <p className="text-gray-700 font-medium mt-2">{title}</p>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);
