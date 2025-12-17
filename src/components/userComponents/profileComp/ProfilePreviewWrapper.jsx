"use client";

import { useState } from "react";

import ProfilePremiumBlack from "@/app/user/externalProfileView.jsx/profileBlackPremium";
import ProfilePremium from "@/app/user/externalProfileView.jsx/ProfileCardView";
import ProfileElite from "@/app/user/externalProfileView.jsx/ProfileElite";
import SalesProfilePremium from "@/app/user/externalProfileView.jsx/SalesProfile";
import { useParams } from "react-router-dom";

function ProfilePreviewWrapper() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const design = useParams()?.name || "premium"; 

  const profileComponents = {
    premium: ProfilePremium,
    elite: ProfileElite,
    black: ProfilePremiumBlack,
    salestemplate: SalesProfilePremium,
  };

const demoProfile = {
  fullName: "Sophia Martinez",
  designation: "Senior Product Designer",
  profilePic:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=400&h=400&q=80",
  banner:
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?fit=crop&w=1200&h=400&q=80",
  isActive: true,
  locationLink: "https://www.google.com/maps?q=San+Francisco,USA",
  bio: `Passionate product designer with over 7 years of experience in creating intuitive 
  and visually appealing user experiences. Adept at translating complex problems into 
  elegant design solutions. Skilled in collaborating with cross-functional teams, 
  conducting user research, and building scalable design systems. Strong advocate for 
  inclusive and accessible design. Outside of work, Sophia enjoys mentoring young 
  designers, photography, and traveling to explore new cultures and design trends.`,
  phoneNumber: "+91 5555666677",
  email: "sophia.martinez@example.com",
  watsappNumber: "5555666677",
  website: "https://sophiamartinez.design",
  company: "BrightPixel Labs",
  skills: [
    "Figma",
    "Sketch",
    "Photoshop",
    "Illustrator",
    "InVision",
    "React",
    "Design Systems",
    "User Research",
  ],
  socialMedia: [
    { platform: "Facebook", link: "https://facebook.com/sophia.martinez" },
    { platform: "Instagram", link: "https://instagram.com/sophia.designs" },
    { platform: "LinkedIn", link: "https://linkedin.com/in/sophia-martinez" },
    { platform: "Twitter", link: "https://twitter.com/sophia_design" },
    { platform: "YouTube", link: "https://youtube.com/@sophiaDesigns" },
    { platform: "WhatsApp", link: "https://wa.me/15559876543" },
    { platform: "reddit", link: "https://reddit.com/sophia-martinez" },
    { platform: "Behance", link: "https://behance.net/sophiamartinez" },
    { platform: "threads", link: "https://threads.com/sophia-design" },
    { platform: "telegram", link: "https://telegram.com/sophia-design" },
    { platform: "Pinterest", link: "https://pinterest.com/sophia_creative" },
    { platform: "amazon", link: "https://amazon.com/sophia_creative" },
    { platform: "snapchat", link: "https://snapchat.com/sophia_creative" },
    { platform: "youtube", link: "https://youtube.com/sophia_creative" },
    { platform: "messenger", link: "https://messenger.com/sophia_creative" },
    { platform: "spotify", link: "https://spotify.com/sophia_creative" },
  ],
  joinDate: "August 2021",
};



  const SelectedProfile = profileComponents[design] || ProfilePremium;

  return (
    <div>
      <SelectedProfile
        profile={demoProfile}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />
    </div>
  );
}

export default ProfilePreviewWrapper;
