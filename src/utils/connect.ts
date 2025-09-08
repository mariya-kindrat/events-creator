import { PrismaClient } from "@/generated/prisma";

// CREATE GLOBAL PRISMA CLIENT_PUBLIC_FILES_PATH. EVOID CREATING SEPARATE CLIENTS

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
