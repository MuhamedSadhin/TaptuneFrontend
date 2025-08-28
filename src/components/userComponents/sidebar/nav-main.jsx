// "use client";

// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";
// import { useLogout } from "@/hooks/tanstackHooks/useAuth";
// import { useAuthUser } from "@/hooks/tanstackHooks/useUserContext";

// export function NavMain({ items }) {
//     const navigate = useNavigate();
//     const { mutate: logout } = useLogout();
//     const { setUser } = useAuthUser();

//     const handleItemClick = (item) => {
//       if (item.action === "logout") {
//         logout();
//         setUser(null);
//         navigate("/auth");
//       } else {
//         navigate(item.url);
//       }
//     };
//   return (
//     <div className="navparentclass">
//       <SidebarGroup>
//         <SidebarGroupLabel>Platform</SidebarGroupLabel>
//         <SidebarMenu>
//           {items.map((item) => {
//             const hasSubItems = item.items && item.items.length > 0;

//             return hasSubItems ? (
//               <Collapsible
//                 key={item.title}
//                 asChild
//                 defaultOpen={item.isActive}
//                 className="group/collapsible"
//               >
//                 <SidebarMenuItem>
//                   <CollapsibleTrigger asChild>
//                     <SidebarMenuButton tooltip={item.title} asChild>
//                       <NavLink
//                         to={item.url}
//                         end
//                         onClick={() => handleItemClick(item)}
//                         className="flex items-center gap-3 px-3 py-2 rounded-full transition-colors font-medium nav-link"
//                       >
//                         {item.icon && <item.icon className="w-5 h-5" />}
//                         <span>{item.title}</span>
//                       </NavLink>
//                     </SidebarMenuButton>
//                   </CollapsibleTrigger>
//                   <CollapsibleContent>
//                     <SidebarMenuSub>
//                       {item.items.map((subItem) => (
//                         <SidebarMenuSubItem key={subItem.title}>
//                           <SidebarMenuSubButton asChild>
//                             <NavLink
//                               to={subItem.url}
//                               end
//                               className={({ isActive }) =>
//                                 `flex items-center gap-2 pl-8 py-2 rounded-md transition-colors font-medium
//                               ${
//                                 isActive
//                                   ? "bg-purple-100 text-purple-700"
//                                   : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
//                               }`
//                               }
//                             >
//                               <span>{subItem.title}</span>
//                             </NavLink>
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       ))}
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                 </SidebarMenuItem>
//               </Collapsible>
//             ) : (
//               <SidebarMenuItem key={item.title}>
//                 <SidebarMenuButton tooltip={item.title} asChild>
//                   <NavLink
//                     to={item.url}
//                     end
//                     onClick={() => handleItemClick(item)}
//                     className={({ isActive }) =>
//                       `flex items-center gap-3 px-3 py-2 rounded-full transition-colors font-medium
//                     ${
//                       isActive
//                         ? "bg-purple-600 text-white"
//                         : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
//                     }`
//                     }
//                   >
//                     {item.icon && <item.icon className="w-5 h-5" />}
//                     <span>{item.title}</span>
//                   </NavLink>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             );
//           })}
//         </SidebarMenu>
//       </SidebarGroup>
//     </div>
//   );
// }






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