import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function getPrismaClient() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL nu este configurat.");
  }

  const pool = new Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 1_000,
    connectionTimeoutMillis: 10_000,
    maxLifetimeSeconds: 30,
    allowExitOnIdle: true,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
  });

  globalForPrisma.prisma = prisma;

  return prisma;
}
