import { PrismaClient } from "./generated/prisma";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let databaseUrl = process.env.DATABASE_URL;

if (databaseUrl && databaseUrl.startsWith("file:")) {
  const relativePath = databaseUrl.replace("file:", "");

  const absolutePath = path.resolve(relativePath);

  databaseUrl = `file:${absolutePath}`;
}

//Criação d ainstância do Prisma Client
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
