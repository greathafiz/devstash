import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL/DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

// System item types — immutable, seeded at install. Colors/icons mirror the
// table in context/project-overview.md. userId is null so they belong to no
// user and are shared across the app.
const SYSTEM_ITEM_TYPES = [
  { name: "Snippet", icon: "Code", color: "#3b82f6" },
  { name: "Prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "Note", icon: "StickyNote", color: "#fde047" },
  { name: "Command", icon: "Terminal", color: "#f97316" },
  { name: "Link", icon: "Link", color: "#10b981" },
  { name: "File", icon: "File", color: "#6b7280" },
  { name: "Image", icon: "Image", color: "#ec4899" },
];

async function main() {
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

  const count = await prisma.itemType.count({ where: { isSystem: true } });
  console.log(`Seeded system item types (${count} total).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
