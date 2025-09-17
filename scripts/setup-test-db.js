#!/usr/bin/env node

/**
 * Script to set up test database
 * This script helps initialize the test database with the same schema as production
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Simple .env file loader
function loadEnvFile(filePath) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        const lines = content.split("\n");
        lines.forEach((line) => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith("#")) {
                const [key, ...valueParts] = trimmed.split("=");
                if (key && valueParts.length > 0) {
                    const value = valueParts
                        .join("=")
                        .replace(/^["']|["']$/g, "");
                    if (!process.env[key]) {
                        process.env[key] = value;
                    }
                }
            }
        });
    }
}

// Load environment files
loadEnvFile(path.join(__dirname, "..", ".env"));
loadEnvFile(path.join(__dirname, "..", ".env.local"));

console.log("🚀 Setting up database...");

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not set!");
    console.error(
        "Please set DATABASE_URL to your database connection string."
    );
    process.exit(1);
}

try {
    console.log("📋 DATABASE_URL is set");

    // Show which database we're connecting to
    if (process.env.DATABASE_URL.includes("neondb")) {
        console.log("🧪 Using test/development database (Neon)");
    } else {
        console.log("🏭 Using production database");
    }

    console.log("🔄 Generating Prisma client...");
    execSync("npx prisma generate", { stdio: "inherit" });

    console.log("🗄️  Pushing database schema...");
    execSync("npx prisma db push", { stdio: "inherit" });

    console.log("📊 Verifying database connection...");
    // Test the connection by running a simple query
    try {
        execSync("npx prisma db execute --stdin", {
            input: "SELECT 1;",
            stdio: ["pipe", "inherit", "inherit"],
        });
        console.log("✅ Database connection verified!");
    } catch (error) {
        console.log(
            "⚠️  Database connection test failed, but schema was pushed successfully."
        );
    }

    console.log("✅ Database setup completed successfully!");
    console.log("🎯 Your database is ready to use.");
} catch (error) {
    console.error("❌ Error setting up database:", error.message);
    process.exit(1);
}
