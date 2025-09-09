#!/usr/bin/env node

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
