import { cache } from "react"
import { connection } from "next/server"

import { prisma } from "@/src/lib/prisma"

const RECENT_COLLECTIONS_LIMIT = 6

// Auth isn't wired up yet, so the dashboard operates as the seeded demo user.
// Swap this for the real session (auth()) once NextAuth lands — everything else
// here keys off the returned user id.
const DEMO_EMAIL = "demo@devstash.io"

/**
 * Resolve the current user. Memoized per-request with React.cache so multiple
 * data functions in one render share a single query.
 */
export const getCurrentUser = cache(async () => {
  // The dashboard reflects live DB state, so exclude it from prerendering.
  // (Prisma's query is async, but Next would still snapshot it at build time
  // without this.) Remove once the real per-request session drives the query.
  await connection()

  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    select: { id: true },
  })

  if (!user) {
    throw new Error(`Current user (${DEMO_EMAIL}) not found — run \`npm run db:seed\`.`)
  }

  return user
})

/** A single item type present in a collection, for the card's icon row. */
export type CollectionType = {
  id: string
  name: string
  icon: string
  color: string
}

/** Collection shape the dashboard's CollectionCard renders. */
export type DashboardCollection = {
  id: string
  name: string
  description: string | null
  isFavorite: boolean
  itemCount: number
  /** Border accent — the color of the collection's most-used content type. */
  accentColor: string | null
  /** Distinct types present in the collection, most-used first. */
  types: CollectionType[]
}

export type CollectionStats = {
  collectionCount: number
  favoriteCollectionCount: number
}

/**
 * Derive a collection's accent color and type-icon row from its items. Types are
 * ordered by how many items use them (most-used first); the accent color is the
 * top type's color. Returns `null` accent for an empty collection.
 */
function summarizeTypes(
  items: { itemType: CollectionType }[],
): Pick<DashboardCollection, "accentColor" | "types"> {
  const counts = new Map<string, { type: CollectionType; count: number }>()

  for (const { itemType } of items) {
    const entry = counts.get(itemType.id)
    if (entry) {
      entry.count++
    } else {
      counts.set(itemType.id, { type: itemType, count: 1 })
    }
  }

  const ordered = [...counts.values()]
    .sort((a, b) => b.count - a.count)
    .map((entry) => entry.type)

  return {
    accentColor: ordered[0]?.color ?? null,
    types: ordered,
  }
}

/**
 * Fetch the current user's most recently updated collections for the dashboard.
 * Each collection includes its item count, accent color, and the set of content
 * types it contains (for the small type icons).
 */
export async function getRecentCollections(
  limit = RECENT_COLLECTIONS_LIMIT,
): Promise<DashboardCollection[]> {
  const user = await getCurrentUser()

  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      _count: { select: { items: true } },
      items: {
        select: {
          item: {
            select: {
              itemType: {
                select: { id: true, name: true, icon: true, color: true },
              },
            },
          },
        },
      },
    },
  })

  return collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
    description: collection.description,
    isFavorite: collection.isFavorite,
    itemCount: collection._count.items,
    ...summarizeTypes(collection.items.map(({ item }) => item)),
  }))
}

/** Collection counts for the dashboard stats cards. */
export async function getCollectionStats(): Promise<CollectionStats> {
  const user = await getCurrentUser()

  const [collectionCount, favoriteCollectionCount] = await Promise.all([
    prisma.collection.count({ where: { userId: user.id } }),
    prisma.collection.count({ where: { userId: user.id, isFavorite: true } }),
  ])

  return { collectionCount, favoriteCollectionCount }
}