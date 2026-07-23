import {
  collections,
  items,
  itemTypes,
  type Collection,
  type Item,
  type ItemType,
} from "@/src/lib/mock-data"

const RECENT_COLLECTIONS_LIMIT = 6
const RECENT_ITEMS_LIMIT = 10

export type DashboardStats = {
  itemCount: number
  collectionCount: number
  favoriteItemCount: number
  favoriteCollectionCount: number
}

/** Look up an item type by id, used for color-coding cards. */
export function getItemType(id: string): ItemType | undefined {
  return itemTypes.find((type) => type.id === id)
}

export function getDashboardStats(): DashboardStats {
  return {
    itemCount: items.length,
    collectionCount: collections.length,
    favoriteItemCount: items.filter((item) => item.isFavorite).length,
    favoriteCollectionCount: collections.filter(
      (collection) => collection.isFavorite,
    ).length,
  }
}

export function getRecentCollections(): Collection[] {
  return [...collections]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, RECENT_COLLECTIONS_LIMIT)
}

export function getPinnedItems(): Item[] {
  return items
    .filter((item) => item.isPinned)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function getRecentItems(): Item[] {
  return [...items]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, RECENT_ITEMS_LIMIT)
}
