"use client"

import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/common/AppSidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
