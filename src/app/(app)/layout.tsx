"use client"

import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/common/AppSidebar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="absolute top-4 right-4 z-20">
            <Button asChild variant="outline" size="sm">
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Link>
            </Button>
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
