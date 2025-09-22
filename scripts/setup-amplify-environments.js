#!/usr/bin/env node

/**
 * AWS Amplify Environment Setup Script
 * This script helps set up environment variables for different Amplify environments
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

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

// Environment variable templates
const environmentVariables = {
    production: {
        NODE_ENV: "production",
        DATABASE_URL: "",
        NEXTAUTH_URL: "",
        NEXTAUTH_SECRET: "",
        GOOGLE_CLIENT_ID: "",
        GOOGLE_CLIENT_SECRET: "",
        STRIPE_SECRET_KEY: "",
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "",
    },
    development: {
        NODE_ENV: "development",
        DATABASE_URL: "",
        NEXTAUTH_URL: "",
        NEXTAUTH_SECRET: "",
        GOOGLE_CLIENT_ID: "",
        GOOGLE_CLIENT_SECRET: "",
        STRIPE_SECRET_KEY: "",
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "",
    },
    staging: {
        NODE_ENV: "production",
        DATABASE_URL: "",
        NEXTAUTH_URL: "",
        NEXTAUTH_SECRET: "",
        GOOGLE_CLIENT_ID: "",
        GOOGLE_CLIENT_SECRET: "",
        STRIPE_SECRET_KEY: "",
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "",
    },
};

// Variable descriptions
const variableDescriptions = {
    NODE_ENV: "Node.js environment (production/development)",
    DATABASE_URL: "Database connection string (PostgreSQL/MySQL)",
    NEXTAUTH_URL: "Full URL of your application (e.g., https://yourdomain.com)",
    NEXTAUTH_SECRET:
        "Secret key for NextAuth.js (generate with: openssl rand -base64 32)",
    GOOGLE_CLIENT_ID: "Google OAuth Client ID from Google Cloud Console",
    GOOGLE_CLIENT_SECRET:
        "Google OAuth Client Secret from Google Cloud Console",
    STRIPE_SECRET_KEY: "Stripe Secret Key (starts with sk_)",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        "Stripe Publishable Key (starts with pk_)",
};

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function collectEnvironmentVariables(environment) {
    log(`\n🔧 Setting up ${environment} environment variables`, "cyan");
    log("=".repeat(50), "cyan");

    const envVars = { ...environmentVariables[environment] };

    for (const [key, defaultValue] of Object.entries(envVars)) {
        const description =
            variableDescriptions[key] || "No description available";

        log(`\n📝 ${key}`, "yellow");
        log(`   Description: ${description}`, "blue");

        if (defaultValue) {
            log(`   Current value: ${defaultValue}`, "green");
            const keepDefault = await askQuestion(
                `   Keep current value? (y/n): `
            );
            if (
                keepDefault.toLowerCase() === "y" ||
                keepDefault.toLowerCase() === "yes"
            ) {
                continue;
            }
        }

        const value = await askQuestion(`   Enter value: `);
        if (value) {
            envVars[key] = value;
        }
    }

    return envVars;
}

function generateEnvFile(environment, variables) {
    const envContent = Object.entries(variables)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");

    const filename = `.env.${environment}`;
    const filepath = path.join(process.cwd(), filename);

    fs.writeFileSync(filepath, envContent + "\n");
    log(`✅ Created ${filename}`, "green");

    return filepath;
}

function generateAmplifyEnvVarsFile(environments) {
    log("\n📋 Generating Amplify environment variables summary...", "cyan");

    let content = "# AWS Amplify Environment Variables\n";
    content +=
        "# Copy these to your Amplify Console Environment Variables section\n\n";

    for (const [env, variables] of Object.entries(environments)) {
        content += `## ${env.toUpperCase()} Environment\n`;
        content += `# Branch: ${env === "production" ? "main" : env}\n\n`;

        for (const [key, value] of Object.entries(variables)) {
            const maskedValue =
                key.includes("SECRET") || key.includes("KEY")
                    ? "[HIDDEN]"
                    : value;
            content += `${key}=${maskedValue}\n`;
        }

        content += "\n";
    }

    const filepath = path.join(process.cwd(), "amplify-env-vars-setup.txt");
    fs.writeFileSync(filepath, content);
    log(`✅ Created amplify-env-vars-setup.txt`, "green");

    return filepath;
}

function generateAWSCLICommands(environments) {
    log("\n🔧 Generating AWS CLI commands...", "cyan");

    let content = "#!/bin/bash\n";
    content += "# AWS CLI commands to set environment variables in Amplify\n";
    content += "# Replace YOUR_APP_ID with your actual Amplify App ID\n\n";
    content += 'APP_ID="YOUR_APP_ID"\n';
    content += 'REGION="us-east-1"  # Change to your region\n\n';

    for (const [env, variables] of Object.entries(environments)) {
        const branchName = env === "production" ? "main" : env;
        content += `# ${env.toUpperCase()} Environment (${branchName} branch)\n`;

        for (const [key, value] of Object.entries(variables)) {
            if (value) {
                content += `aws amplify put-backend-environment \\
    --app-id $APP_ID \\
    --environment-name ${env} \\
    --deployment-artifacts '{"${key}":"${value}"}' \\
    --region $REGION\n\n`;
            }
        }

        content += "\n";
    }

    const filepath = path.join(process.cwd(), "setup-amplify-env-vars.sh");
    fs.writeFileSync(filepath, content);
    fs.chmodSync(filepath, "755");
    log(`✅ Created setup-amplify-env-vars.sh`, "green");

    return filepath;
}

function showNextSteps() {
    log("\n🎉 Environment setup completed!", "green");
    log("=".repeat(50), "green");

    log("\n📋 Next Steps:", "cyan");
    log("1. Review the generated .env files", "blue");
    log("2. Copy environment variables to AWS Amplify Console:", "blue");
    log("   - Go to your Amplify app in AWS Console", "blue");
    log("   - Navigate to Environment variables", "blue");
    log("   - Add variables for each environment", "blue");
    log("3. Update your repository with the new configuration", "blue");
    log("4. Deploy your application", "blue");

    log("\n📁 Generated Files:", "cyan");
    log("- .env.production (production environment variables)", "blue");
    log("- .env.development (development environment variables)", "blue");
    log("- .env.staging (staging environment variables)", "blue");
    log("- amplify-env-vars-setup.txt (summary for Amplify Console)", "blue");
    log("- setup-amplify-env-vars.sh (AWS CLI commands)", "blue");

    log("\n⚠️  Security Notes:", "yellow");
    log("- Never commit .env files to your repository", "yellow");
    log("- Add .env.* to your .gitignore file", "yellow");
    log("- Use strong, unique secrets for each environment", "yellow");
    log("- Regularly rotate your secrets", "yellow");
}

async function main() {
    log("🚀 AWS Amplify Environment Setup", "bright");
    log("================================", "bright");

    log(
        "\nThis script will help you set up environment variables for your AWS Amplify deployment.",
        "blue"
    );
    log(
        "You can set up multiple environments: production, development, and staging.",
        "blue"
    );

    const setupEnvironments = await askQuestion(
        "\nWhich environments would you like to set up? (production,development,staging or all): "
    );

    let environmentsToSetup = [];
    if (setupEnvironments.toLowerCase() === "all") {
        environmentsToSetup = ["production", "development", "staging"];
    } else {
        environmentsToSetup = setupEnvironments
            .split(",")
            .map((env) => env.trim().toLowerCase());
    }

    const collectedEnvironments = {};

    for (const env of environmentsToSetup) {
        if (environmentVariables[env]) {
            const variables = await collectEnvironmentVariables(env);
            collectedEnvironments[env] = variables;
            generateEnvFile(env, variables);
        } else {
            log(`⚠️  Unknown environment: ${env}`, "yellow");
        }
    }

    if (Object.keys(collectedEnvironments).length > 0) {
        generateAmplifyEnvVarsFile(collectedEnvironments);
        generateAWSCLICommands(collectedEnvironments);
        showNextSteps();
    }

    rl.close();
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    log(`❌ Uncaught exception: ${error.message}`, "red");
    rl.close();
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    log(`❌ Unhandled rejection at: ${promise}, reason: ${reason}`, "red");
    rl.close();
    process.exit(1);
});

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
    log("\n\n👋 Setup cancelled by user", "yellow");
    rl.close();
    process.exit(0);
});

// Run the script
main();
