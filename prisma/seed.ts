import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import { ContentType, PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL/DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

// System item types — immutable, seeded at install. Colors/icons mirror the
// table in context/project-overview.md. userId is null so they belong to no
// user and are shared across the app. Names stay capitalized to match what the
// DB was originally seeded with (the spec's lowercase names are informal).
const SYSTEM_ITEM_TYPES = [
  { name: "Snippet", icon: "Code", color: "#3b82f6" },
  { name: "Prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "Note", icon: "StickyNote", color: "#fde047" },
  { name: "Command", icon: "Terminal", color: "#f97316" },
  { name: "Link", icon: "Link", color: "#10b981" },
  { name: "File", icon: "File", color: "#6b7280" },
  { name: "Image", icon: "Image", color: "#ec4899" },
];

async function seedSystemItemTypes() {
  for (const type of SYSTEM_ITEM_TYPES) {
    // Can't upsert on (userId, name) when userId is NULL — a NULL never matches
    // in a unique lookup — so guard with a manual existence check instead.
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, isSystem: true, userId: null },
    });

    if (existing) {
      await prisma.itemType.update({
        where: { id: existing.id },
        data: { icon: type.icon, color: type.color },
      });
    } else {
      await prisma.itemType.create({
        data: { ...type, isSystem: true },
      });
    }
  }

  const types = await prisma.itemType.findMany({
    where: { isSystem: true, userId: null },
  });

  // Map by name for quick lookup when creating items below.
  return new Map(types.map((t) => [t.name, t.id]));
}

const DEMO_EMAIL = "demo@devstash.io";

async function seedDemoUser() {
  const password = await bcrypt.hash("12345678", 12);

  return prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {
      name: "Demo User",
      password,
      isPro: false,
      emailVerified: new Date(),
    },
    create: {
      email: DEMO_EMAIL,
      name: "Demo User",
      password,
      isPro: false,
      emailVerified: new Date(),
    },
  });
}

// Shape of a seed item before we attach the userId / itemTypeId. `type` is the
// system item type name; `tags` are per-user tag names.
type SeedItem = {
  type: string;
  title: string;
  description?: string;
  content?: string;
  url?: string;
  language?: string;
  contentType?: (typeof ContentType)[keyof typeof ContentType];
  isFavorite?: boolean;
  isPinned?: boolean;
  lastUsedAt?: Date;
  tags?: string[];
};

type SeedCollection = {
  name: string;
  description: string;
  defaultType?: string;
  isFavorite?: boolean;
  items: SeedItem[];
};

const days = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    defaultType: "Snippet",
    isFavorite: true,
    items: [
      {
        type: "Snippet",
        title: "useDebounce hook",
        description: "Debounce a rapidly-changing value.",
        language: "typescript",
        isPinned: true,
        isFavorite: true,
        lastUsedAt: days(1),
        tags: ["react", "hooks"],
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
      },
      {
        type: "Snippet",
        title: "useLocalStorage hook",
        description: "State synced to localStorage.",
        language: "typescript",
        lastUsedAt: days(4),
        tags: ["react", "hooks"],
        content: `import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initial;
  });

  const set = useCallback(
    (next: T) => {
      setValue(next);
      window.localStorage.setItem(key, JSON.stringify(next));
    },
    [key],
  );

  return [value, set] as const;
}`,
      },
      {
        type: "Snippet",
        title: "Theme context provider",
        description: "Compound Context provider with a typed consumer hook.",
        language: "typescript",
        tags: ["react", "context"],
        content: `import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    defaultType: "Prompt",
    items: [
      {
        type: "Prompt",
        title: "Code review prompt",
        description: "Ask an LLM for a focused code review.",
        isPinned: true,
        lastUsedAt: days(2),
        tags: ["ai", "review"],
        content: `You are a senior engineer reviewing a pull request. Review the diff below for:
1. Correctness and edge cases
2. Security issues (injection, auth, secrets)
3. Performance (N+1 queries, unnecessary work)
4. Readability and naming

Reply with a bulleted list grouped by severity (Blocker / Warning / Nit). Reference specific lines. Do not restate the code back to me.

Diff:
"""
{{diff}}
"""`,
      },
      {
        type: "Prompt",
        title: "Documentation generator",
        description: "Generate reference docs from a source file.",
        lastUsedAt: days(6),
        tags: ["ai", "docs"],
        content: `Write reference documentation for the module below. For each exported function or component, produce:
- A one-sentence summary
- Parameters (name, type, description)
- Return value
- A short usage example

Use Markdown. Infer intent from names and types; flag anything genuinely ambiguous instead of guessing.

Source:
"""
{{source}}
"""`,
      },
      {
        type: "Prompt",
        title: "Refactoring assistant",
        description: "Propose a safe, incremental refactor.",
        tags: ["ai", "refactor"],
        content: `Act as a refactoring assistant. Given the code below, propose an incremental refactor that improves clarity without changing behavior.

Constraints:
- Preserve the public interface unless you flag the break explicitly
- Break the change into small, independently-committable steps
- For each step, explain the intent in one line

Do not rewrite everything at once. Start with the single highest-impact change.

Code:
"""
{{code}}
"""`,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        type: "Snippet",
        title: "Multi-stage Node Dockerfile",
        description: "Small production image for a Node app.",
        language: "dockerfile",
        tags: ["docker", "ci"],
        content: `# syntax=docker/dockerfile:1
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
      },
      {
        type: "Command",
        title: "Build and push a tagged image",
        description: "Deployment script: build, tag with the git SHA, push.",
        language: "bash",
        lastUsedAt: days(3),
        tags: ["docker", "deploy"],
        content: `TAG=$(git rev-parse --short HEAD)
docker build -t registry.example.com/devstash:$TAG .
docker push registry.example.com/devstash:$TAG
docker tag registry.example.com/devstash:$TAG registry.example.com/devstash:latest
docker push registry.example.com/devstash:latest`,
      },
      {
        type: "Link",
        title: "GitHub Actions documentation",
        description: "Reference for workflow syntax and CI/CD.",
        url: "https://docs.github.com/en/actions",
        contentType: ContentType.url,
        tags: ["ci", "docs"],
      },
      {
        type: "Link",
        title: "Docker reference documentation",
        description: "Dockerfile and CLI reference.",
        url: "https://docs.docker.com/reference/",
        contentType: ContentType.url,
        tags: ["docker", "docs"],
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    defaultType: "Command",
    isFavorite: true,
    items: [
      {
        type: "Command",
        title: "Undo the last commit, keep changes",
        description: "Soft-reset one commit back, leaving the work staged.",
        language: "bash",
        isFavorite: true,
        lastUsedAt: days(1),
        tags: ["git"],
        content: "git reset --soft HEAD~1",
      },
      {
        type: "Command",
        title: "Remove all stopped containers and dangling images",
        description: "Reclaim Docker disk space.",
        language: "bash",
        lastUsedAt: days(5),
        tags: ["docker"],
        content: "docker system prune -f",
      },
      {
        type: "Command",
        title: "Kill the process listening on a port",
        description: "Find and terminate whatever holds a port (Linux/macOS).",
        language: "bash",
        tags: ["process"],
        content: "lsof -ti tcp:3000 | xargs kill -9",
      },
      {
        type: "Command",
        title: "List globally-installed npm packages",
        description: "Top-level global packages only.",
        language: "bash",
        tags: ["npm"],
        content: "npm list -g --depth=0",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    defaultType: "Link",
    items: [
      {
        type: "Link",
        title: "Tailwind CSS documentation",
        description: "Utility-first CSS framework reference.",
        url: "https://tailwindcss.com/docs",
        contentType: ContentType.url,
        isFavorite: true,
        lastUsedAt: days(2),
        tags: ["css", "tailwind"],
      },
      {
        type: "Link",
        title: "shadcn/ui",
        description: "Copy-paste React component library.",
        url: "https://ui.shadcn.com",
        contentType: ContentType.url,
        tags: ["components", "react"],
      },
      {
        type: "Link",
        title: "Radix UI Primitives",
        description: "Unstyled, accessible component primitives.",
        url: "https://www.radix-ui.com/primitives",
        contentType: ContentType.url,
        tags: ["components", "a11y"],
      },
      {
        type: "Link",
        title: "Lucide icons",
        description: "Open-source icon library used across DevStash.",
        url: "https://lucide.dev/icons/",
        contentType: ContentType.url,
        tags: ["icons"],
      },
    ],
  },
];

// Resolve (or create) per-user tags, returning a name -> id map. Tags are
// unique per (userId, name), so upsert is safe here.
async function resolveTags(userId: string, names: Iterable<string>) {
  const unique = new Set(names);
  const map = new Map<string, string>();

  for (const name of unique) {
    const tag = await prisma.tag.upsert({
      where: { userId_name: { userId, name } },
      update: {},
      create: { userId, name },
    });
    map.set(name, tag.id);
  }

  return map;
}

async function seedDemoContent(
  userId: string,
  typeIds: Map<string, string>,
) {
  // Clean & recreate: wipe the demo user's collections and items so re-runs are
  // deterministic. Cascades remove ItemCollection joins and detach tags.
  await prisma.item.deleteMany({ where: { userId } });
  await prisma.collection.deleteMany({ where: { userId } });

  // Gather every tag name up front so each tag is created once.
  const allTagNames = COLLECTIONS.flatMap((c) =>
    c.items.flatMap((i) => i.tags ?? []),
  );
  const tagIds = await resolveTags(userId, allTagNames);

  let itemCount = 0;

  for (const collection of COLLECTIONS) {
    const defaultTypeId = collection.defaultType
      ? typeIds.get(collection.defaultType)
      : undefined;

    const created = await prisma.collection.create({
      data: {
        name: collection.name,
        description: collection.description,
        isFavorite: collection.isFavorite ?? false,
        userId,
        defaultTypeId,
      },
    });

    for (const item of collection.items) {
      const itemTypeId = typeIds.get(item.type);
      if (!itemTypeId) {
        throw new Error(`Unknown item type "${item.type}"`);
      }

      const tagConnect = (item.tags ?? []).map((name) => {
        const id = tagIds.get(name);
        if (!id) throw new Error(`Unresolved tag "${name}"`);
        return { id };
      });

      await prisma.item.create({
        data: {
          title: item.title,
          description: item.description,
          content: item.content,
          url: item.url,
          language: item.language,
          contentType: item.contentType ?? ContentType.text,
          isFavorite: item.isFavorite ?? false,
          isPinned: item.isPinned ?? false,
          lastUsedAt: item.lastUsedAt,
          userId,
          itemTypeId,
          tags: { connect: tagConnect },
          collections: { create: { collectionId: created.id } },
        },
      });
      itemCount++;
    }
  }

  return { collectionCount: COLLECTIONS.length, itemCount };
}

async function main() {
  const typeIds = await seedSystemItemTypes();
  console.log(`Seeded system item types (${typeIds.size} total).`);

  const user = await seedDemoUser();
  console.log(`Seeded demo user (${user.email}).`);

  const { collectionCount, itemCount } = await seedDemoContent(user.id, typeIds);
  console.log(
    `Seeded ${collectionCount} collections and ${itemCount} items for the demo user.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });