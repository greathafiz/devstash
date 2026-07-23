import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/src/generated/prisma/client";

// Prisma 7 requires an explicit driver adapter. We use Neon's serverless driver
// with the pooled connection string (DATABASE_URL, the `-pooler` host) so the
// app plays nicely with serverless/edge runtimes.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const createPrismaClient = () =>
  new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

// Reuse a single client across hot-reloads in development to avoid exhausting
// the connection pool.
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
