
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, BarChart3, LogOut, Wind, Tractor } from "lucide-react"

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import React from "react"

const menuItems = [
  { href: "/use-cases", label: "Home", icon: Home },
  { 
    href: "#", 
    label: "Use Cases", 
    icon: LayoutGrid, 
    subMenu: [
      { href: "/use-cases/wind-solar-park", label: "Wind Solar Park", icon: Wind },
      { href: "/use-cases/dairy-farm", label: "Dairy Farm", icon: Tractor }
    ]
  },
  { href: "#", label: "Reports", icon: BarChart3 },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const [openSubMenu, setOpenSubMenu] = React.useState('Use Cases');

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
                asChild={!item.subMenu}
                isActive={pathname === item.href || (item.subMenu && item.subMenu.some(sub => pathname.startsWith(sub.href)))}
                className="justify-start"
                onClick={() => item.subMenu && setOpenSubMenu(openSubMenu === item.label ? '' : item.label)}
              >
                {item.subMenu ? (
                  <>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </>
                ) : (
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </SidebarMenuButton>
              {item.subMenu && openSubMenu === item.label && (
                <SidebarMenuSub>
                  {item.subMenu.map(subItem => (
                    <SidebarMenuSubItem key={subItem.label}>
                      <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                        <Link href={subItem.href}>
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.label}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
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
