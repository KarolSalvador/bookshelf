// lib/prisma.ts
import { PrismaClient } from "./generated/prisma";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// FORÇA O CAMINHO ABSOLUTO PARA O ARQUIVO SQLite
const DATABASE_PATH = path.join(process.cwd(), "prisma", "dev.db");
const DATABASE_URL = `file:${DATABASE_PATH}`;

let resolvedDatabaseUrl = DATABASE_URL;

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

// Criação da instância do Prisma Client
export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
