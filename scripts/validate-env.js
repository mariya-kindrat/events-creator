#!/usr/bin/env node

// Load environment variables from .env file
const fs = require("fs");
const path = require("path");

// Function to load .env file
function loadEnvFile(filePath) {
    if (fs.existsSync(filePath)) {
        const envContent = fs.readFileSync(filePath, "utf8");
        const lines = envContent.split("\n");

        lines.forEach((line) => {
            line = line.trim();
            if (line && !line.startsWith("#")) {
                const [key, ...valueParts] = line.split("=");
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
        console.log(
            `✅ Loaded environment variables from ${path.basename(filePath)}`
        );
        return true;
    }
    return false;
}

// Try to load .env files in order of preference
const envFiles = [
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), ".env"),
];

let envLoaded = false;
for (const envFile of envFiles) {
    if (loadEnvFile(envFile)) {
        envLoaded = true;
        break;
    }
}

if (!envLoaded) {
    console.log(
        "⚠️  No .env file found, using system environment variables only"
    );
}

console.log("=== Environment Variables Validation ===");

const requiredEnvVars = [
    "DATABASE_URL",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "NODE_ENV",
];

const optionalEnvVars = [
    "GOOGLE_ID",
    "GOOGLE_SECRET",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_SECRET_KEY",
];

let hasErrors = false;

console.log("\n🔍 Checking required environment variables:");
requiredEnvVars.forEach((varName) => {
    const value = process.env[varName];
    if (value) {
        console.log(
            `✅ ${varName}: ${
                varName.includes("SECRET") || varName.includes("URL")
                    ? "[HIDDEN]"
                    : value
            }`
        );
    } else {
        console.log(`❌ ${varName}: NOT SET`);
        hasErrors = true;
    }
});

console.log("\n🔍 Checking optional environment variables:");
optionalEnvVars.forEach((varName) => {
    const value = process.env[varName];
    if (value) {
        console.log(
            `✅ ${varName}: ${
                varName.includes("SECRET") || varName.includes("KEY")
                    ? "[HIDDEN]"
                    : value
            }`
        );
    } else {
        console.log(`⚠️  ${varName}: NOT SET (optional)`);
    }
});

console.log("\n📊 Environment Summary:");
console.log(`Total environment variables: ${Object.keys(process.env).length}`);
console.log(`Node.js version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Architecture: ${process.arch}`);

if (hasErrors) {
    console.log("\n❌ Some required environment variables are missing!");
    process.exit(1);
} else {
    console.log("\n✅ All required environment variables are set!");
    process.exit(0);
}
