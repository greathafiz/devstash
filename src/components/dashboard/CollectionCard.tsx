import Link from "next/link"
import { Star } from "lucide-react"

import { getIcon } from "@/src/lib/icon-map"
import { getItemType } from "@/src/lib/dashboard-data"
import type { Collection } from "@/src/lib/mock-data"

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className="group flex flex-col gap-3 rounded-lg border border-l-4 bg-card p-4 transition-colors hover:bg-accent/50"
      style={{ borderLeftColor: collection.accentColor }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex items-center gap-1.5 font-medium">
          {collection.name}
          {collection.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-current text-yellow-400" />
          )}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground">
        {collection.itemCount} items
      </p>

      <p className="line-clamp-1 text-sm text-muted-foreground">
        {collection.description}
      </p>

      <div className="mt-auto flex items-center gap-2 pt-1">
        {collection.itemTypeIds.map((typeId) => {
          const type = getItemType(typeId)
          if (!type) return null
          const Icon = getIcon(type.icon)
          return (
            <Icon
              key={typeId}
              className="size-4"
              style={{ color: type.color }}
              aria-label={type.label}
            />
          )
        })}
      </div>
    </Link>
  )
}
