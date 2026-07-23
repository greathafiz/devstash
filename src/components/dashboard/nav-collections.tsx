"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Folder, Star } from "lucide-react"

import type { SidebarCollection } from "@/src/lib/db/collections"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

/** Small colored dot marking a collection's most-used item type. */
function TypeDot({ color }: { color: string | null }) {
  return (
    <span
      className="size-3.5 shrink-0 rounded-full border border-border"
      style={color ? { backgroundColor: color } : undefined}
      aria-hidden
    />
  )
}

function CollectionItem({
  collection,
  active,
  showStar,
}: {
  collection: SidebarCollection
  active: boolean
  showStar?: boolean
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={active}
        tooltip={collection.name}
        render={<Link href={`/collections/${collection.id}`} />}
      >
        {showStar ? (
          <Folder style={{ color: collection.accentColor ?? undefined }} />
        ) : (
          <TypeDot color={collection.accentColor} />
        )}
        <span>{collection.name}</span>
      </SidebarMenuButton>
      <SidebarMenuBadge>
        {showStar ? (
          <Star className="size-3.5 fill-current text-yellow-400" />
        ) : (
          collection.itemCount
        )}
      </SidebarMenuBadge>
    </SidebarMenuItem>
  )
}

export function NavCollections({
  favorites,
  recent,
}: {
  favorites: SidebarCollection[]
  recent: SidebarCollection[]
}) {
  const pathname = usePathname()
  const isActive = (id: string) => pathname === `/collections/${id}`

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Collections</SidebarGroupLabel>

      {favorites.length > 0 && (
        <>
          <SidebarGroupLabel className="mt-1 text-[10px] tracking-wider">
            Favorites
          </SidebarGroupLabel>
          <SidebarMenu>
            {favorites.map((collection) => (
              <CollectionItem
                key={collection.id}
                collection={collection}
                active={isActive(collection.id)}
                showStar
              />
            ))}
          </SidebarMenu>
        </>
      )}

      {recent.length > 0 && (
        <>
          <SidebarGroupLabel className="mt-1 text-[10px] tracking-wider">
            Recent
          </SidebarGroupLabel>
          <SidebarMenu>
            {recent.map((collection) => (
              <CollectionItem
                key={collection.id}
                collection={collection}
                active={isActive(collection.id)}
              />
            ))}
          </SidebarMenu>
        </>
      )}

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={pathname === "/collections"}
            tooltip="View all collections"
            className="text-muted-foreground"
            render={<Link href="/collections" />}
          >
            <Folder />
            <span>View all collections</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
