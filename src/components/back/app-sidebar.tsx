"use client"

import { Settings, CircleHelp, Search, Database, ClipboardList, File, Command } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { APP_CONFIG } from "@/config/app-config"
import { sidebarItems } from "@/navigation/sidebar/sidebar-items"
import { useAuth } from "@/hooks/useAuth"

import { NavMain } from "@/components/back/nav-main"
import { NavUser } from "@/components/back/nav-user"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  // Default user data if not logged in
  const displayUser = user ? {
    name: user.fullName || 'Unknown User',
    email: user.email || 'unknown@example.com',
    avatar: ''
  } : {
    name: 'Guest User',
    email: 'guest@example.com',
    avatar: ''
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <Command />
                <span className="text-base font-semibold">{APP_CONFIG.appName}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
    </Sidebar>
  )
}