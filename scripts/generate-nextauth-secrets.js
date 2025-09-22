#!/usr/bin/env node

/**
 * NextAuth Secret Generator
 * This script generates secure NextAuth secrets for different environments
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Color codes for console output
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
};

function log(message, color = "reset") {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function generateSecret() {
    try {
        const secret = execSync("openssl rand -base64 32", {
            encoding: "utf8",
        }).trim();
        return secret;
    } catch (error) {
        log(
            "❌ Error generating secret with OpenSSL, using fallback method",
            "red"
        );
        // Fallback method using Node.js crypto
        const crypto = require("crypto");
        return crypto.randomBytes(32).toString("base64");
    }
}

function updateEnvFile(filePath, newSecret) {
    if (!fs.existsSync(filePath)) {
        log(`⚠️  File ${filePath} does not exist, skipping...`, "yellow");
        return false;
    }

    try {
        let content = fs.readFileSync(filePath, "utf8");

        // Replace existing NEXTAUTH_SECRET
        const secretRegex = /NEXTAUTH_SECRET\s*=\s*["']?[^"'\n\r]*["']?/;
        if (secretRegex.test(content)) {
            content = content.replace(
                secretRegex,
                `NEXTAUTH_SECRET="${newSecret}"`
            );
        } else {
            // Add NEXTAUTH_SECRET if it doesn't exist
            content += `\nNEXTAUTH_SECRET="${newSecret}"\n`;
        }

        fs.writeFileSync(filePath, content);
        log(`✅ Updated ${path.basename(filePath)}`, "green");
        return true;
    } catch (error) {
        log(`❌ Error updating ${filePath}: ${error.message}`, "red");
        return false;
    }
}

function createSecureSecretsFile(secrets) {
    const content = `# NextAuth Secrets for Different Environments
# Generated on: ${new Date().toISOString()}
# 
# IMPORTANT: Keep these secrets secure and never commit them to version control
# Copy the appropriate secret to your environment variables in AWS Amplify Console

## Local Development
NEXTAUTH_SECRET="${secrets.local}"

## Development Environment
NEXTAUTH_SECRET="${secrets.development}"

## Staging Environment  
NEXTAUTH_SECRET="${secrets.staging}"

## Production Environment
NEXTAUTH_SECRET="${secrets.production}"

# Instructions:
# 1. Copy the appropriate secret for each environment
# 2. Add to AWS Amplify Console Environment Variables
# 3. Update your .env files accordingly
# 4. Delete this file after copying the secrets
`;

    const filePath = path.join(process.cwd(), "nextauth-secrets.txt");
    fs.writeFileSync(filePath, content);
    log(`📄 Created nextauth-secrets.txt with all environment secrets`, "cyan");
    log(
        `⚠️  Remember to delete this file after copying the secrets!`,
        "yellow"
    );

    return filePath;
}

function showSecrets(secrets) {
    log("\n🔐 Generated NextAuth Secrets:", "cyan");
    log("=".repeat(50), "cyan");

    Object.entries(secrets).forEach(([env, secret]) => {
        log(`\n📋 ${env.toUpperCase()} Environment:`, "blue");
        log(`NEXTAUTH_SECRET="${secret}"`, "green");
    });

    log("\n📋 AWS Amplify Console Instructions:", "cyan");
    log("1. Go to your Amplify app in AWS Console", "blue");
    log("2. Navigate to Environment variables", "blue");
    log("3. Add/Update NEXTAUTH_SECRET for each environment:", "blue");
    log("   - Production: Use the production secret", "blue");
    log("   - Development: Use the development secret", "blue");
    log("   - Staging: Use the staging secret", "blue");
}

function main() {
    const command = process.argv[2];

    log("🔐 NextAuth Secret Generator", "bright");
    log("============================", "bright");

    if (command === "help" || command === "--help" || command === "-h") {
        log("\n📖 Usage:", "cyan");
        log("  node scripts/generate-nextauth-secrets.js [command]", "blue");
        log("\n📋 Commands:", "cyan");
        log("  generate     Generate new secrets for all environments", "blue");
        log(
            "  update-env   Update existing .env files with new secrets",
            "blue"
        );
        log("  single       Generate a single secret", "blue");
        log("  help         Show this help message", "blue");
        log("\n💡 Examples:", "cyan");
        log("  node scripts/generate-nextauth-secrets.js generate", "blue");
        log("  node scripts/generate-nextauth-secrets.js single", "blue");
        return;
    }

    if (command === "single") {
        log("\n🔐 Generating single NextAuth secret...", "cyan");
        const secret = generateSecret();
        log(`\n✅ Generated secret:`, "green");
        log(`NEXTAUTH_SECRET="${secret}"`, "bright");
        log("\n📋 Copy this secret to your environment variables", "blue");
        return;
    }

    if (command === "update-env") {
        log("\n🔄 Updating .env files with new secrets...", "cyan");

        const envFiles = [
            ".env",
            ".env.local",
            ".env.development",
            ".env.production",
            ".env.staging",
        ];

        envFiles.forEach((file) => {
            const filePath = path.join(process.cwd(), file);
            if (fs.existsSync(filePath)) {
                const newSecret = generateSecret();
                updateEnvFile(filePath, newSecret);
                log(`  ${file}: ${newSecret}`, "blue");
            }
        });

        log("\n✅ Environment files updated successfully!", "green");
        return;
    }

    // Default: generate secrets for all environments
    log("\n🔐 Generating NextAuth secrets for all environments...", "cyan");

    const secrets = {
        local: generateSecret(),
        development: generateSecret(),
        staging: generateSecret(),
        production: generateSecret(),
    };

    // Show secrets in console
    showSecrets(secrets);

    // Create secure file with all secrets
    createSecureSecretsFile(secrets);

    // Update local .env file
    const localEnvPath = path.join(process.cwd(), ".env");
    updateEnvFile(localEnvPath, secrets.local);

    log("\n🎉 NextAuth secrets generated successfully!", "green");
    log("\n⚠️  Security Reminders:", "yellow");
    log("- Never commit secrets to version control", "yellow");
    log("- Use different secrets for each environment", "yellow");
    log("- Store production secrets securely", "yellow");
    log("- Rotate secrets regularly", "yellow");
    log("- Delete nextauth-secrets.txt after use", "yellow");
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    log(`❌ Uncaught exception: ${error.message}`, "red");
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    log(`❌ Unhandled rejection at: ${promise}, reason: ${reason}`, "red");
    process.exit(1);
});

// Run the script
main();
