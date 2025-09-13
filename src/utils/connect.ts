import { PrismaClient } from "@/generated/prisma";

// CREATE GLOBAL PRISMA CLIENT. AVOID CREATING SEPARATE CLIENTS

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

// Use DATABASE_URL for all environments
const getDatabaseUrl = () => {
    if (process.env.DATABASE_URL) {
        console.log("Using DATABASE_URL for database connection");
        return process.env.DATABASE_URL;
    }

    console.error("No database URL found!");
    console.error(
        "Available environment variables:",
        Object.keys(process.env).filter((key) => key.includes("DATABASE"))
    );
    throw new Error("DATABASE_URL environment variable is required");
};

const databaseUrl = getDatabaseUrl();

const prisma =
    globalForPrisma.prisma ||
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

export default prisma;
