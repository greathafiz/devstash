import { Clock, Pin } from "lucide-react"

import {
  getDashboardStats,
  getPinnedItems,
  getRecentCollections,
  getRecentItems,
} from "@/src/lib/dashboard-data"
import { CollectionCard } from "@/src/components/dashboard/CollectionCard"
import { ItemCard } from "@/src/components/dashboard/ItemCard"
import { SectionHeader } from "@/src/components/dashboard/SectionHeader"
import { StatsCards } from "@/src/components/dashboard/StatsCards"

export default function DashboardPage() {
  const stats = getDashboardStats()
  const recentCollections = getRecentCollections()
  const pinnedItems = getPinnedItems()
  const recentItems = getRecentItems()

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your developer knowledge hub</p>
      </div>

      <StatsCards stats={stats} />

      <section className="flex flex-col gap-4">
        <SectionHeader title="Collections" viewAllHref="/collections" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {pinnedItems.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeader title="Pinned" icon={Pin} />
          <div className="grid gap-3 lg:grid-cols-2">
            {pinnedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <SectionHeader title="Recent Items" icon={Clock} viewAllHref="/items" />
        <div className="grid gap-3 lg:grid-cols-2">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
