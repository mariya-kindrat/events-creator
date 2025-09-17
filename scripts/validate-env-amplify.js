#!/usr/bin/env node

console.log("=== Amplify Environment Variables Validation ===");

// For Amplify, we only check critical variables and warn about missing ones
const criticalEnvVars = ["NODE_ENV"];

const importantEnvVars = ["DATABASE_URL", "NEXTAUTH_SECRET", "NEXTAUTH_URL"];

const optionalEnvVars = [
    "GOOGLE_ID",
    "GOOGLE_SECRET",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_SECRET_KEY",
];

let hasErrors = false;
let hasWarnings = false;

console.log("\n🔍 Checking critical environment variables:");
criticalEnvVars.forEach((varName) => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: ${value}`);
    } else {
        console.log(`❌ ${varName}: NOT SET`);
        hasErrors = true;
    }
});

console.log("\n🔍 Checking important environment variables:");
importantEnvVars.forEach((varName) => {
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
        console.log(
            `⚠️  ${varName}: NOT SET (will use defaults or skip features)`
        );
        hasWarnings = true;
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
        console.log(`ℹ️  ${varName}: NOT SET (optional)`);
    }
});

console.log("\n📊 Environment Summary:");
console.log(`Total environment variables: ${Object.keys(process.env).length}`);
console.log(`Node.js version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Architecture: ${process.arch}`);

if (hasErrors) {
    console.log("\n❌ Some critical environment variables are missing!");
    console.log("Build will continue but some features may not work properly.");
    // Don't exit with error for Amplify - let the build continue
} else if (hasWarnings) {
    console.log("\n⚠️  Some important environment variables are missing!");
    console.log("Build will continue but some features may not work properly.");
} else {
    console.log("\n✅ All environment variables are properly configured!");
}

console.log("\n🚀 Continuing with build process...");
process.exit(0);
