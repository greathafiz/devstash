import Link from "next/link"
import { Star } from "lucide-react"

import { DynamicIcon } from "@/src/lib/icon-map"
import type { DashboardCollection } from "@/src/lib/db/collections"

export function CollectionCard({
  collection,
}: {
  collection: DashboardCollection
}) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className="group flex flex-col gap-3 rounded-lg border border-l-4 bg-card p-4 transition-colors hover:bg-accent/50"
      style={
        collection.accentColor
          ? { borderLeftColor: collection.accentColor }
          : undefined
      }
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

      {collection.description && (
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {collection.description}
        </p>
      )}

      <div className="mt-auto flex items-center gap-2 pt-1">
        {collection.types.map((type) => (
          <DynamicIcon
            key={type.id}
            name={type.icon}
            color={type.color}
            className="size-4"
            aria-label={type.name}
          />
        ))}
      </div>
    </Link>
  )
}