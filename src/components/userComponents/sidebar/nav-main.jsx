



"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";
import { useLogout } from "@/hooks/tanstackHooks/useAuth";

export function NavMain({ items }) {
    const navigate = useNavigate();
    const { mutate: logout } = useLogout();
    const { setUser } = useAuthUser();

    const handleItemClick = (item) => {
      if (item.action === "logout") {
        logout();
        setUser(null);
        navigate("/auth");
      } else {
        navigate(item.url);
      }
    };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem className={"NavLinkAdmin"}>
              <SidebarMenuButton
                className={"rounded-lg px-3"}
                asChild
                tooltip={item.title}
              >
                <NavLink
                  end
                  onClick={() => handleItemClick(item)}
                  to={item.url}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger className=" right-3" asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight className="opacity-40" />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}