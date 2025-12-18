import * as React from "react"
import {
  GalleryVerticalEnd,
  Command,
  SquareTerminal,
  Frame,
  Bot,
  Settings2,
  Map,
  PersonStandingIcon,
} from "lucide-react";
import {
  Home,
  User,
  CreditCard,
  Star,
  Users,
  LayoutGrid,
  Shield,
  Briefcase,
  MessageSquare,
  IdCard,
  Link2,
  Bell,
  LogOut,
} from "lucide-react";

import { NavMain } from "@/components/adminComponents/sidebar/nav-main"
import { NavUser } from "@/components/adminComponents/sidebar/nav-user";
import { TeamSwitcher } from "@/components/adminComponents/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Notification03Icon } from "hugeicons-react";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

// This is sample data.
const data = {
  user: {
    name: "Taptune",
    email: "Taptune.in",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Taptune",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
 navMain : [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: User,
    roles: ["sales", "Sales"],
  },
  {
    title: "Card Orders",
    url: "/admin/card-order",
    icon: CreditCard,
  },
  {
    title: "Review Card Orders",
    url: "/admin/reviewcard",
    icon: Star,
  },
  {
    title: "Users List",
    url: "/admin/user-list",
    icon: Users,
  },
  {
    title: "Designs",
    url: "/admin/card-list",
    icon: LayoutGrid,
  },
  {
    title: "Manage Admin",
    url: "/admin/admin-list",
    icon: Shield,
    roles: ["admin", "Admin"],
  },
  {
    title: "Sales",
    url: "/admin/sales",
    icon: Briefcase,
    roles: ["admin", "Admin"],
  },
  {
    title: "Enquiries",
    url: "/admin/enquiry",
    icon: MessageSquare,
  },
  {
    title: "Profiles Created",
    url: "/admin/profiles",
    icon: IdCard,
  },
  {
    title: "Lead Connections",
    url: "/admin/connections",
    icon: Link2,
    roles: ["sales"],
  },
  {
    title: "Notifications",
    url: "/admin/notification",
    icon: Bell,
  },
  {
    title: "Sign Out",
    icon: LogOut,
    action: "logout",
    url: "/c",
  },
]
};

export function AppSidebar({
  ...props
}) {

  const { user } = useAuthUser();
  const role = user?.role || "user"; 
  console.log("User Role in Sidebar:", role);

    const filteredNav = data.navMain.filter((item) => {
      if (!item.roles) return true; 
      return item.roles.includes(role); 
    });
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
