import { ReactNode } from "react";

import { cookies } from "next/headers";

import { AppSidebar } from "@/components/back/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SearchDialog } from "@/app/(back)/admin/dashboard/_components/search-dialog"
import { AccountSwitcher } from "@/app/(back)/admin/dashboard/_components/account-switcher"
import { AuthProvider } from "@/hooks/useAuth"
import { AuthGuard } from "@/components/back/auth-guard"

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <AuthProvider>
      <AuthGuard>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar variant="sidebar" collapsible="icon" />
          <SidebarInset
            className="w-full"
          >
            <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex w-full items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-1 lg:gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                  <SearchDialog />
                </div>
                <div className="flex items-center gap-2">
                  <AccountSwitcher />
                </div>
              </div>
            </header>
            <div className="p-4 md:p-6">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </AuthGuard>
    </AuthProvider>
  )
}