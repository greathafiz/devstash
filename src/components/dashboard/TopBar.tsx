import { Layers, Plus, Search } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"

export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b px-4">
      <div className="flex items-center gap-2 font-semibold">
        <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Layers className="size-4" />
        </span>
        <span>DevStash</span>
      </div>

      <div className="relative mx-auto w-full max-w-xl">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items..."
          aria-label="Search items"
          className="pr-14 pl-9"
        />
        <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Plus />
          New Collection
        </Button>
        <Button>
          <Plus />
          New Item
        </Button>
      </div>
    </header>
  )
}
