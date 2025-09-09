import { PrismaClient } from "@/generated/prisma";

// CREATE GLOBAL PRISMA CLIENT. AVOID CREATING SEPARATE CLIENTS

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set");
    console.error(
        "Available environment variables:",
        Object.keys(process.env).filter((key) => key.includes("DATABASE"))
    );
    throw new Error("DATABASE_URL environment variable is required");
}

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
