"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { getIcon } from "@/src/lib/icon-map"
import type { SidebarType } from "@/src/lib/db/items"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

export function NavTypes({ types }: { types: SidebarType[] }) {
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
                tooltip={type.name}
                render={<Link href={type.href} />}
              >
                <Icon style={{ color: type.color }} />
                <span>{type.name}</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>{type.count}</SidebarMenuBadge>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
