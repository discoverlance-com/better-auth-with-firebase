"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { siteInfo, siteLinks } from "@/config/site";
import Link from "next/link";
import { CogIcon, LayoutDashboardIcon } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: siteLinks.dashoard.index,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Settings",
      url: siteLinks.dashoard.settings.index,
      icon: CogIcon,
    },
    {
      title: "Account",
      url: siteLinks.dashoard.account,
      icon: CogIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={siteLinks.dashoard.index}>
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  {siteInfo.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
