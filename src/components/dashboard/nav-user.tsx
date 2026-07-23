import Link from "next/link"
import { Settings } from "lucide-react"

import type { User } from "@/src/lib/mock-data"
import { Button } from "@/src/components/ui/button"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function NavUser({ user }: { user: User }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton size="lg" tooltip={user.name} className="flex-1">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-medium text-sidebar-primary-foreground">
            {initials(user.name)}
          </span>
          <span className="grid flex-1 text-left leading-tight">
            <span className="truncate text-sm font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </span>
        </SidebarMenuButton>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Settings"
          className="shrink-0 group-data-[collapsible=icon]:hidden"
          render={<Link href="/settings" />}
        >
          <Settings />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
