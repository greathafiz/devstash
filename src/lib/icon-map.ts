import {
  Code,
  File,
  FileQuestion,
  Folder,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react"

/**
 * Maps the string `icon` names stored on item types (mock data / DB) to their
 * lucide component. Only the icons DevStash actually uses are registered;
 * anything unknown falls back to a neutral placeholder.
 */
const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link,
  Folder,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? FileQuestion
}
