import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // The Prisma CLI (migrate/db) connects over a direct, unpooled connection.
    // Runtime queries go through the Neon serverless adapter using the pooled
    // DATABASE_URL — see src/lib/prisma.ts. Fall back to DATABASE_URL when
    // DIRECT_URL is unset (e.g. environments with a single connection string).
    url: env("DIRECT_URL") ?? env("DATABASE_URL"),
  },
});
