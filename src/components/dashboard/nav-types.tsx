"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { getIcon } from "@/src/lib/icon-map"
import type { ItemType } from "@/src/lib/mock-data"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

export function NavTypes({ types }: { types: ItemType[] }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Types</SidebarGroupLabel>
      <SidebarMenu>
        {types.map((type) => {
          const Icon = getIcon(type.icon)
          return (
            <SidebarMenuItem key={type.id}>
              <SidebarMenuButton
                isActive={pathname === type.href}
                tooltip={type.label}
                render={<Link href={type.href} />}
              >
                <Icon style={{ color: type.color }} />
                <span>{type.label}</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>{type.count}</SidebarMenuBadge>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
