import { prisma } from "@/src/lib/prisma"

import { getCurrentUser } from "./collections"

const RECENT_ITEMS_LIMIT = 10

/** Item shape the dashboard's ItemCard renders. */
export type DashboardItem = {
  id: string
  title: string
  description: string | null
  tags: string[]
  isFavorite: boolean
  isPinned: boolean
  updatedAt: Date
  /** Icon/border accent derived from the item's type. */
  type: {
    name: string
    icon: string
    color: string
  }
}

export type ItemStats = {
  itemCount: number
  favoriteItemCount: number
}

// Shared select so pinned/recent items return the same shape.
const dashboardItemSelect = {
  id: true,
  title: true,
  description: true,
  isFavorite: true,
  isPinned: true,
  updatedAt: true,
  tags: { select: { name: true } },
  itemType: { select: { name: true, icon: true, color: true } },
} as const

type ItemRow = {
  id: string
  title: string
  description: string | null
  isFavorite: boolean
  isPinned: boolean
  updatedAt: Date
  tags: { name: string }[]
  itemType: { name: string; icon: string; color: string }
}

function toDashboardItem(item: ItemRow): DashboardItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    tags: item.tags.map((tag) => tag.name),
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    updatedAt: item.updatedAt,
    type: item.itemType,
  }
}

/**
 * Fetch the current user's pinned items, most recently updated first.
 * The dashboard hides the Pinned section entirely when this is empty.
 */
export async function getPinnedItems(): Promise<DashboardItem[]> {
  const user = await getCurrentUser()

  const items = await prisma.item.findMany({
    where: { userId: user.id, isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: dashboardItemSelect,
  })

  return items.map(toDashboardItem)
}

/** Fetch the current user's most recently updated items for the Recent section. */
export async function getRecentItems(
  limit = RECENT_ITEMS_LIMIT,
): Promise<DashboardItem[]> {
  const user = await getCurrentUser()

  const items = await prisma.item.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: dashboardItemSelect,
  })

  return items.map(toDashboardItem)
}

/** Item counts for the dashboard stats cards. */
export async function getItemStats(): Promise<ItemStats> {
  const user = await getCurrentUser()

  const [itemCount, favoriteItemCount] = await Promise.all([
    prisma.item.count({ where: { userId: user.id } }),
    prisma.item.count({ where: { userId: user.id, isFavorite: true } }),
  ])

  return { itemCount, favoriteItemCount }
}
