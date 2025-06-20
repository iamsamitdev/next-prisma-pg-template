"use client"

import { toast } from "sonner"

import { BadgeCheck, Bell, CreditCard, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { getInitials } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

export function AccountSwitcher() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("ออกจากระบบสำเร็จ")
      // Redirect to login page
      window.location.href = "/auth/login"
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ")
    }
  }

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-lg">
          <AvatarImage src={displayUser.avatar || undefined} alt={displayUser.name} />
          <AvatarFallback className="rounded-lg">{getInitials(displayUser.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 space-y-1 rounded-lg" side="bottom" align="end" sideOffset={4}>
        <DropdownMenuItem className="p-0">
          <div className="flex w-full items-center justify-between gap-2 px-1 py-1.5">
            <Avatar className="size-9 rounded-lg">
              <AvatarImage src={displayUser.avatar || undefined} alt={displayUser.name} />
              <AvatarFallback className="rounded-lg">{getInitials(displayUser.name)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{displayUser.name}</span>
              <span className="truncate text-xs text-muted-foreground">{displayUser.email}</span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}