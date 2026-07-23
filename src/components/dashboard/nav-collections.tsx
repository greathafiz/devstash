"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Folder, Star } from "lucide-react"

import type { Collection } from "@/src/lib/mock-data"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

function CollectionItem({
  collection,
  active,
  showStar,
}: {
  collection: Collection
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
        <Folder style={{ color: collection.accentColor }} />
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
  favorites: Collection[]
  recent: Collection[]
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
    </SidebarGroup>
  )
}
