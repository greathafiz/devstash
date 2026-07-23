import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

// Standalone DB connectivity check. Run with:  npx tsx scripts/test-db.ts
// Uses the pooled DATABASE_URL (the same connection the app uses at runtime)
// and falls back to DIRECT_URL if it is the only one set.
const connectionString = process.env.DATABASE_URL ?? process.env.DIRECT_URL;

if (!connectionString) {
  console.error("✖ DATABASE_URL/DIRECT_URL is not set — check your .env file.");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

async function main() {
  // 1. Prove we can reach the database at all.
  await prisma.$queryRaw`SELECT 1`;
  console.log("✔ Connected to Neon Postgres.");

  // 2. Confirm the schema/tables exist and the seed ran.
  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    select: { name: true, icon: true, color: true },
    orderBy: { name: "asc" },
  });
  console.log(`✔ Found ${systemTypes.length} system item type(s):`);
  for (const type of systemTypes) {
    console.log(`    ${type.name.padEnd(8)} ${type.icon.padEnd(11)} ${type.color}`);
  }

  // 3. Quick counts across the core tables so a broken relation shows up early.
  const [users, items, collections] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
  ]);
  console.log(`✔ Row counts — users: ${users}, items: ${items}, collections: ${collections}`);

  console.log("\n✅ Database test passed.");
}

main()
  .catch((error) => {
    console.error("\n✖ Database test failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });