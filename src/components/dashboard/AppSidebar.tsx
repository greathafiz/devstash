import Link from "next/link"
import { Layers } from "lucide-react"

import { collections, currentUser, itemTypes } from "@/src/lib/mock-data"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/src/components/ui/sidebar"

import { NavCollections } from "./nav-collections"
import { NavTypes } from "./nav-types"
import { NavUser } from "./nav-user"

const RECENT_LIMIT = 5

export function AppSidebar() {
  const favorites = collections.filter((collection) => collection.isFavorite)
  const recent = collections
    .filter((collection) => !collection.isFavorite)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, RECENT_LIMIT)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-2 py-1 font-semibold"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Layers className="size-4" />
          </span>
          <span className="group-data-[collapsible=icon]:hidden">DevStash</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavTypes types={itemTypes} />
        <SidebarSeparator />
        <NavCollections favorites={favorites} recent={recent} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
