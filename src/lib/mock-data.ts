export type ContentType = "TEXT" | "FILE" | "URL"

export type ItemType = {
  id: string
  name: string
  label: string
  icon: string
  color: string
  href: string
  count: number
}

export type Item = {
  id: string
  title: string
  description: string
  contentType: ContentType
  content: string | null
  url: string | null
  fileName: string | null
  language: string | null
  tags: string[]
  isFavorite: boolean
  isPinned: boolean
  itemTypeId: string
  collectionIds: string[]
  createdAt: string
  updatedAt: string
}

export type Collection = {
  id: string
  name: string
  description: string
  isFavorite: boolean
  itemCount: number
  accentColor: string
  itemTypeIds: string[]
  createdAt: string
  updatedAt: string
}

export type User = {
  id: string
  name: string
  email: string
  image: string | null
  isPro: boolean
}

export const currentUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: true,
}

export const itemTypes: ItemType[] = [
  {
    id: "type_snippet",
    name: "snippet",
    label: "Snippets",
    icon: "Code",
    color: "#3b82f6",
    href: "/items/snippets",
    count: 24,
  },
  {
    id: "type_prompt",
    name: "prompt",
    label: "Prompts",
    icon: "Sparkles",
    color: "#8b5cf6",
    href: "/items/prompts",
    count: 18,
  },
  {
    id: "type_command",
    name: "command",
    label: "Commands",
    icon: "Terminal",
    color: "#f97316",
    href: "/items/commands",
    count: 15,
  },
  {
    id: "type_note",
    name: "note",
    label: "Notes",
    icon: "StickyNote",
    color: "#fde047",
    href: "/items/notes",
    count: 12,
  },
  {
    id: "type_file",
    name: "file",
    label: "Files",
    icon: "File",
    color: "#6b7280",
    href: "/items/files",
    count: 5,
  },
  {
    id: "type_image",
    name: "image",
    label: "Images",
    icon: "Image",
    color: "#ec4899",
    href: "/items/images",
    count: 3,
  },
  {
    id: "type_link",
    name: "link",
    label: "Links",
    icon: "Link",
    color: "#10b981",
    href: "/items/links",
    count: 8,
  },
]

export const collections: Collection[] = [
  {
    id: "col_react_patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    accentColor: "#3b82f6",
    itemTypeIds: ["type_snippet", "type_note", "type_link"],
    createdAt: "2026-01-04T10:00:00.000Z",
    updatedAt: "2026-01-15T09:12:00.000Z",
  },
  {
    id: "col_python_snippets",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    accentColor: "#3b82f6",
    itemTypeIds: ["type_snippet", "type_note"],
    createdAt: "2026-01-05T14:30:00.000Z",
    updatedAt: "2026-01-13T16:40:00.000Z",
  },
  {
    id: "col_context_files",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    accentColor: "#6b7280",
    itemTypeIds: ["type_file", "type_note"],
    createdAt: "2026-01-06T08:20:00.000Z",
    updatedAt: "2026-01-14T11:05:00.000Z",
  },
  {
    id: "col_interview_prep",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    accentColor: "#fde047",
    itemTypeIds: ["type_note", "type_snippet", "type_link", "type_prompt"],
    createdAt: "2026-01-07T12:00:00.000Z",
    updatedAt: "2026-01-12T18:22:00.000Z",
  },
  {
    id: "col_git_commands",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    accentColor: "#f97316",
    itemTypeIds: ["type_command", "type_note"],
    createdAt: "2026-01-08T09:45:00.000Z",
    updatedAt: "2026-01-16T10:30:00.000Z",
  },
  {
    id: "col_ai_prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    accentColor: "#8b5cf6",
    itemTypeIds: ["type_prompt", "type_snippet", "type_note"],
    createdAt: "2026-01-09T15:10:00.000Z",
    updatedAt: "2026-01-17T13:55:00.000Z",
  },
]

export const items: Item[] = [
  {
    id: "item_use_auth_hook",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "TEXT",
    content:
      "export function useAuth() {\n  const { data: session, status } = useSession()\n  return { user: session?.user ?? null, isLoading: status === 'loading' }\n}",
    url: null,
    fileName: null,
    language: "typescript",
    tags: ["react", "auth", "hooks"],
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_snippet",
    collectionIds: ["col_react_patterns"],
    createdAt: "2026-01-15T09:12:00.000Z",
    updatedAt: "2026-01-15T09:12:00.000Z",
  },
  {
    id: "item_api_error_handling",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "TEXT",
    content:
      "export async function fetchWithRetry(url: string, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      return await fetch(url)\n    } catch {\n      await new Promise((r) => setTimeout(r, 2 ** i * 100))\n    }\n  }\n  throw new Error('Request failed')\n}",
    url: null,
    fileName: null,
    language: "typescript",
    tags: ["api", "error-handling", "fetch"],
    isFavorite: false,
    isPinned: true,
    itemTypeId: "type_snippet",
    collectionIds: ["col_react_patterns", "col_interview_prep"],
    createdAt: "2026-01-12T14:03:00.000Z",
    updatedAt: "2026-01-12T14:03:00.000Z",
  },
  {
    id: "item_code_review_prompt",
    title: "Code Review Prompt",
    description: "Thorough code review prompt for pull requests",
    contentType: "TEXT",
    content:
      "Review this pull request for correctness, security, and performance. List findings by severity with file and line references.",
    url: null,
    fileName: null,
    language: null,
    tags: ["review", "ai", "workflow"],
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai_prompts"],
    createdAt: "2026-01-11T08:40:00.000Z",
    updatedAt: "2026-01-11T08:40:00.000Z",
  },
  {
    id: "item_git_reset_hard",
    title: "git reset --hard HEAD~1",
    description: "Undo the last commit and discard all changes",
    contentType: "TEXT",
    content: "git reset --hard HEAD~1",
    url: null,
    fileName: null,
    language: "bash",
    tags: ["git", "undo"],
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_command",
    collectionIds: ["col_git_commands"],
    createdAt: "2026-01-10T17:25:00.000Z",
    updatedAt: "2026-01-10T17:25:00.000Z",
  },
  {
    id: "item_debounce_util",
    title: "Debounce Utility",
    description: "Generic debounce helper with cancel support",
    contentType: "TEXT",
    content:
      "export function debounce<T extends unknown[]>(fn: (...args: T) => void, ms = 300) {\n  let timer: ReturnType<typeof setTimeout>\n  return (...args: T) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn(...args), ms)\n  }\n}",
    url: null,
    fileName: null,
    language: "typescript",
    tags: ["utils", "performance"],
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_snippet",
    collectionIds: ["col_react_patterns"],
    createdAt: "2026-01-09T11:15:00.000Z",
    updatedAt: "2026-01-09T11:15:00.000Z",
  },
  {
    id: "item_docker_compose_note",
    title: "Docker Compose Cheatsheet",
    description: "Everyday docker compose commands and flags",
    contentType: "TEXT",
    content:
      "## Docker Compose\n\n- `docker compose up -d` — start detached\n- `docker compose logs -f api` — follow one service\n- `docker compose down -v` — stop and drop volumes",
    url: null,
    fileName: null,
    language: null,
    tags: ["docker", "devops"],
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    collectionIds: ["col_interview_prep"],
    createdAt: "2026-01-08T13:50:00.000Z",
    updatedAt: "2026-01-08T13:50:00.000Z",
  },
  {
    id: "item_next_docs_link",
    title: "Next.js App Router Docs",
    description: "Official routing and data fetching reference",
    contentType: "URL",
    content: null,
    url: "https://nextjs.org/docs/app",
    fileName: null,
    language: null,
    tags: ["nextjs", "docs"],
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_link",
    collectionIds: ["col_react_patterns"],
    createdAt: "2026-01-07T10:05:00.000Z",
    updatedAt: "2026-01-07T10:05:00.000Z",
  },
  {
    id: "item_project_context_file",
    title: "project-context.md",
    description: "Shared project context file for AI assistants",
    contentType: "FILE",
    content: null,
    url: null,
    fileName: "project-context.md",
    language: null,
    tags: ["context", "ai"],
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_file",
    collectionIds: ["col_context_files"],
    createdAt: "2026-01-06T16:30:00.000Z",
    updatedAt: "2026-01-06T16:30:00.000Z",
  },
  {
    id: "item_python_dedupe",
    title: "Dedupe List Preserving Order",
    description: "Remove duplicates from a Python list without losing order",
    contentType: "TEXT",
    content: "def dedupe(items):\n    return list(dict.fromkeys(items))",
    url: null,
    fileName: null,
    language: "python",
    tags: ["python", "lists"],
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_snippet",
    collectionIds: ["col_python_snippets"],
    createdAt: "2026-01-05T09:20:00.000Z",
    updatedAt: "2026-01-05T09:20:00.000Z",
  },
  {
    id: "item_architecture_diagram",
    title: "Architecture Diagram",
    description: "System architecture overview for the dashboard",
    contentType: "FILE",
    content: null,
    url: null,
    fileName: "architecture.png",
    language: null,
    tags: ["design", "architecture"],
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_image",
    collectionIds: ["col_context_files"],
    createdAt: "2026-01-04T15:00:00.000Z",
    updatedAt: "2026-01-04T15:00:00.000Z",
  },
]
