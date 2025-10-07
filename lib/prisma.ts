import { PrismaClient } from "./generated/prisma";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const DATABASE_URL = process.env.DATABASE_URL || "file:./prisma/dev.db";
let resolvedDatabaseUrl = DATABASE_URL;

if (resolvedDatabaseUrl.startsWith("file:")) {
  const filename = path.basename(resolvedDatabaseUrl);
  const absolutePath = path.join(process.cwd(), filename);

  resolvedDatabaseUrl = `file:${absolutePath}`;
}

const prismaConfig = {
  log: (process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    : ["error"]) as ("query" | "error" | "warn")[],
  datasources: {
    db: {
      url: resolvedDatabaseUrl,
    },
  },
};

//Criação d ainstância do Prisma Client
export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
