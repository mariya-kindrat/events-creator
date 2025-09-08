#!/usr/bin/env node

/**
 * Database deployment script for production
 * Run this after setting up your cloud database
 */

const { execSync } = require("child_process");

console.log("🚀 Deploying database to production...");

try {
    // Generate Prisma client
    console.log("📦 Generating Prisma client...");
    execSync("npx prisma generate", { stdio: "inherit" });

    // Push database schema
    console.log("🗄️  Pushing database schema...");
    execSync("npx prisma db push", { stdio: "inherit" });

    // Seed database (optional)
    console.log("🌱 Seeding database...");
    execSync("npx prisma db seed", { stdio: "inherit" });

    console.log("✅ Database deployment completed successfully!");
} catch (error) {
    console.error("❌ Database deployment failed:", error.message);
    process.exit(1);
}
