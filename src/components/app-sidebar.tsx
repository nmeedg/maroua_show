"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconHome,
  IconListDetails,
  IconReport,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Empire By K'role",
    email: "m@example.com",
    avatar: "/logo.png",
  },
  navMain: [
    {
      title: "Tableau de bord",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Tous les tickets",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Tickets classique",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Ticket V.I.P",
      url: "#",
      icon: IconFolder,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Acceuil",
      url: "/",
      icon: IconHome,
    }
  ],
  documents: [
    {
      name: "Statiques Globales",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Google Analytics",
      url: "#",
      icon: IconReport,
    }
  ],
}

export function AppSidebar({user, ...props }: React.ComponentProps<typeof Sidebar> & {
  user: {
    email:string,
    accessToken: string,
    uid: string
  }
} ) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <img src="/logo.png" className=" w-8 h-8" alt="app logo" />
                <span className="text-base font-semibold">Empire By K'role</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
