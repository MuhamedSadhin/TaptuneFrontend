import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/userComponents/sidebar/nav-main"
import { NavProjects } from "@/components/userComponents/sidebar/nav-projects"
import { NavUser } from "@/components/userComponents/sidebar/nav-user"
import { TeamSwitcher } from "@/components/userComponents/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

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
      url: "/user",
      icon: SquareTerminal,
    },
    {
      title: "Card Orders",
      url: "/user/cards",
      icon: Frame,
    },
    {
      title: "Profiles",
      url: "/user/profiles",
      icon: Bot,
    },
    {
      title: "Connections",
      url: "/user/connections",
      icon: GalleryVerticalEnd,
    },
    {
      title: "Settings",
      url: "/user/settings",
      icon: Settings2,
    },
    {
      title: "Sign Out",
      icon: Command,
      action: "logout",
      url: "/auth",
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
