"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, BarChart3, LogOut, Wind } from "lucide-react"

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const menuItems = [
  { href: "/use-cases", label: "Home", icon: Home },
  { href: "#", label: "Use Cases", icon: LayoutGrid, subMenu: [
      { href: "/use-cases/wind-solar-park", label: "Wind Solar Park", icon: Wind }
  ]},
  { href: "#", label: "Reports", icon: BarChart3 },
]

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <>
      <SidebarHeader>
        <h2 className="text-xl font-bold text-primary px-2">HyHub</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild className="justify-start">
                    <Link href="/">
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
