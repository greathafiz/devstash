import { Pin, Star } from "lucide-react"
import { DynamicIcon } from "@/src/lib/icon-map"
import { getItemType } from "@/src/lib/dashboard-data"
import type { Item } from "@/src/lib/mock-data"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function ItemCard({ item }: { item: Item }) {
  const type = getItemType(item.itemTypeId)
  const color = type?.color ?? "#6b7280"

  return (
    <div
      className="flex gap-3 rounded-lg border border-l-4 bg-card p-4 transition-colors hover:bg-accent/50"
      style={{ borderLeftColor: color }}
    >
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted"
        style={{ color }}
      >
        <DynamicIcon name={type?.icon ?? ""} className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="flex items-center gap-1.5 font-medium">
            <span className="truncate">{item.title}</span>
            {item.isPinned && (
              <Pin className="size-3.5 shrink-0 text-muted-foreground" />
            )}
            {item.isFavorite && (
              <Star className="size-3.5 shrink-0 fill-current text-yellow-400" />
            )}
          </h4>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatDate(item.updatedAt)}
          </span>
        </div>

        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {item.description}
        </p>

        {item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
