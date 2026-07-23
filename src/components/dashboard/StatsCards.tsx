import { Folder, FolderHeart, Layers, Star } from "lucide-react"

export type DashboardStats = {
  itemCount: number
  collectionCount: number
  favoriteItemCount: number
  favoriteCollectionCount: number
}

type Stat = {
  label: string
  value: number
  icon: typeof Layers
  color: string
}

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards: Stat[] = [
    { label: "Items", value: stats.itemCount, icon: Layers, color: "#3b82f6" },
    {
      label: "Collections",
      value: stats.collectionCount,
      icon: Folder,
      color: "#8b5cf6",
    },
    {
      label: "Favorite Items",
      value: stats.favoriteItemCount,
      icon: Star,
      color: "#fde047",
    },
    {
      label: "Favorite Collections",
      value: stats.favoriteCollectionCount,
      icon: FolderHeart,
      color: "#10b981",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {card.label}
              </span>
              <Icon className="size-4" style={{ color: card.color }} />
            </div>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
          </div>
        )
      })}
    </div>
  )
}
