#!/usr/bin/env node

/**
 * Quick environment check script
 */

// Load environment variables from .env files
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

// Load environment files in order
loadEnvFile(path.join(__dirname, ".env"));
loadEnvFile(path.join(__dirname, ".env.local"));

console.log("🔍 Environment Check\n");

const envFiles = [".env", ".env.local", ".env.test"];
console.log("📁 Environment Files:");
envFiles.forEach((file) => {
    const exists = fs.existsSync(path.join(__dirname, file));
    console.log(
        `   ${exists ? "✅" : "❌"} ${file} ${exists ? "exists" : "missing"}`
    );
});

console.log("\n🔧 Environment Variables:");

// Check critical environment variables
const criticalVars = [
    "DATABASE_URL",
    "NEXTAUTH_URL",
    "NEXTAUTH_SECRET",
    "NODE_ENV",
];

criticalVars.forEach((varName) => {
    const value = process.env[varName];
    if (value) {
        const displayValue =
            varName.includes("SECRET") || varName.includes("URL")
                ? "[HIDDEN]"
                : value;
        console.log(`   ✅ ${varName}: ${displayValue}`);
    } else {
        console.log(`   ❌ ${varName}: NOT SET`);
    }
});

console.log("\n🗄️  Database Configuration:");
if (process.env.DATABASE_URL) {
    console.log("  ✅ Using DATABASE_URL");
    // Show which environment we're likely in based on the URL
    if (process.env.DATABASE_URL.includes("neondb")) {
        console.log("  🧪 Detected: Test/Development database (Neon)");
    } else {
        console.log("  🏭 Detected: Production database");
    }
} else {
    console.log("   ❌ No database URL configured");
}

console.log("\n📋 Recommendations:");
if (!process.env.DATABASE_URL) {
    console.log("   🎯 Run: npm run setup-local-test");
}
if (!fs.existsSync(path.join(__dirname, ".env.local"))) {
    console.log("   🎯 Create .env.local for local development");
}

console.log("\n🚀 Ready to start? Run: npm run dev");
