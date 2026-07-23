import { createElement } from "react"
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
  type LucideProps,
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

/**
 * Renders a lucide icon by its string name. Uses `createElement` rather than
 * `<Icon />` so the React Compiler's `static-components` rule doesn't flag the
 * dynamically resolved icon as a component created during render.
 */
export function DynamicIcon({
  name,
  color,
  ...props
}: { name: string; color?: string } & LucideProps) {
  return createElement(getIcon(name), {
    ...props,
    style: color ? { color, ...props.style } : props.style,
  })
}
