import * as React from "react"
import {
  GalleryVerticalEnd,
  Command,
  SquareTerminal,
  Frame,
  Bot,
  Settings2,
  Map,
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
import {  Notification03Icon } from "hugeicons-react";

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
  navMain: [
    {
      title: "Home",
      url: "/admin",
      icon: SquareTerminal,
    },
    {
      title: "Card Orders",
      url: "/admin/card-order",
      icon: Frame,
    },
    {
      title: "Users List",
      url: "/admin/user-list",
      icon: Bot,
    },
    {
      title: "Designs",
      url: "/admin/card-list",
      icon: GalleryVerticalEnd,
    },
    {
      title: "Manage Admin",
      url: "/admin/admin-list",
      icon: Settings2,
    },
    {
      title: "Enquiries",
      url: "/admin/enquiry",
      icon: Map,
    },
    {
      title: "Notification",
      url: "/admin/notification",
      icon: Notification03Icon,
    },
    // {
    //   title: "Settings",
    //   url: "/admin/manage-account",
    //   icon: Map,
    // },
    // {
    //   title: "Notification",
    //   url: "/admin/report",
    //   icon: PieChart,
    // },
    {
      title: "Sign Out",
      icon: Command,
      action: "logout",
      url: "/c",
    },
  ],
};

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
