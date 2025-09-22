#!/usr/bin/env node

/**
 * AWS Amplify Deployment Script
 * This script helps deploy your application to different Amplify environments
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Configuration
const AMPLIFY_APP_ID = process.env.AMPLIFY_APP_ID || "YOUR_APP_ID_HERE";
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

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

function executeCommand(command, description) {
    try {
        log(`\n🔄 ${description}...`, "blue");
        const result = execSync(command, {
            encoding: "utf8",
            stdio: "inherit",
        });
        log(`✅ ${description} completed successfully`, "green");
        return result;
    } catch (error) {
        log(`❌ ${description} failed: ${error.message}`, "red");
        process.exit(1);
    }
}

function checkPrerequisites() {
    log("\n🔍 Checking prerequisites...", "cyan");

    // Check if AWS CLI is installed
    try {
        execSync("aws --version", { encoding: "utf8" });
        log("✅ AWS CLI is installed", "green");
    } catch (error) {
        log("❌ AWS CLI is not installed. Please install it first.", "red");
        log(
            "Install guide: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html",
            "yellow"
        );
        process.exit(1);
    }

    // Check if AWS credentials are configured
    try {
        execSync("aws sts get-caller-identity", { encoding: "utf8" });
        log("✅ AWS credentials are configured", "green");
    } catch (error) {
        log(
            '❌ AWS credentials are not configured. Please run "aws configure"',
            "red"
        );
        process.exit(1);
    }

    // Check if Amplify app ID is set
    if (AMPLIFY_APP_ID === "YOUR_APP_ID_HERE") {
        log(
            "❌ Please set your AMPLIFY_APP_ID in this script or as environment variable",
            "red"
        );
        process.exit(1);
    }

    log("✅ All prerequisites met", "green");
}

function validateEnvironment() {
    log("\n🔍 Validating environment...", "cyan");

    // Run environment validation script
    if (fs.existsSync("./scripts/validate-env-amplify.js")) {
        executeCommand(
            "node scripts/validate-env-amplify.js",
            "Environment validation"
        );
    } else {
        log(
            "⚠️  Environment validation script not found, skipping...",
            "yellow"
        );
    }
}

function deployToEnvironment(environment, branch) {
    log(
        `\n🚀 Deploying to ${environment} environment (${branch} branch)...`,
        "magenta"
    );

    const deployCommand = `aws amplify start-job --app-id ${AMPLIFY_APP_ID} --branch-name ${branch} --job-type RELEASE --region ${AWS_REGION}`;

    try {
        const result = execSync(deployCommand, { encoding: "utf8" });
        const jobInfo = JSON.parse(result);
        const jobId = jobInfo.jobSummary.jobId;

        log(`✅ Deployment started successfully!`, "green");
        log(`📋 Job ID: ${jobId}`, "blue");
        log(
            `🔗 Monitor progress: https://${AWS_REGION}.console.aws.amazon.com/amplify/home?region=${AWS_REGION}#/${AMPLIFY_APP_ID}/${branch}/${jobId}`,
            "cyan"
        );

        // Wait for deployment to complete (optional)
        if (process.argv.includes("--wait")) {
            waitForDeployment(jobId, branch);
        }
    } catch (error) {
        log(`❌ Deployment failed: ${error.message}`, "red");
        process.exit(1);
    }
}

function waitForDeployment(jobId, branch) {
    log("\n⏳ Waiting for deployment to complete...", "yellow");

    const maxWaitTime = 30 * 60 * 1000; // 30 minutes
    const checkInterval = 30 * 1000; // 30 seconds
    const startTime = Date.now();

    const checkStatus = () => {
        try {
            const statusCommand = `aws amplify get-job --app-id ${AMPLIFY_APP_ID} --branch-name ${branch} --job-id ${jobId} --region ${AWS_REGION}`;
            const result = execSync(statusCommand, { encoding: "utf8" });
            const jobInfo = JSON.parse(result);
            const status = jobInfo.job.summary.status;

            log(`📊 Current status: ${status}`, "blue");

            if (status === "SUCCEED") {
                log("🎉 Deployment completed successfully!", "green");
                return;
            } else if (status === "FAILED" || status === "CANCELLED") {
                log(`❌ Deployment ${status.toLowerCase()}`, "red");
                process.exit(1);
            } else if (Date.now() - startTime > maxWaitTime) {
                log("⏰ Deployment timeout reached", "yellow");
                log(
                    "Please check the Amplify Console for status updates",
                    "yellow"
                );
                return;
            } else {
                // Continue waiting
                setTimeout(checkStatus, checkInterval);
            }
        } catch (error) {
            log(`❌ Error checking deployment status: ${error.message}`, "red");
            process.exit(1);
        }
    };

    checkStatus();
}

function listEnvironments() {
    log("\n📋 Available environments:", "cyan");

    try {
        const command = `aws amplify list-branches --app-id ${AMPLIFY_APP_ID} --region ${AWS_REGION}`;
        const result = execSync(command, { encoding: "utf8" });
        const branches = JSON.parse(result);

        branches.branches.forEach((branch) => {
            log(`  • ${branch.branchName} (${branch.stage})`, "blue");
        });
    } catch (error) {
        log(`❌ Error listing environments: ${error.message}`, "red");
    }
}

function showUsage() {
    log("\n📖 Usage:", "cyan");
    log("  node scripts/deploy-amplify.js <command> [options]", "blue");
    log("\n📋 Commands:", "cyan");
    log(
        "  production   Deploy to production environment (main branch)",
        "blue"
    );
    log(
        "  development  Deploy to development environment (develop branch)",
        "blue"
    );
    log(
        "  staging      Deploy to staging environment (staging branch)",
        "blue"
    );
    log("  list         List all available environments", "blue");
    log("  help         Show this help message", "blue");
    log("\n🔧 Options:", "cyan");
    log("  --wait       Wait for deployment to complete", "blue");
    log("\n💡 Examples:", "cyan");
    log("  node scripts/deploy-amplify.js production", "blue");
    log("  node scripts/deploy-amplify.js development --wait", "blue");
    log("  node scripts/deploy-amplify.js list", "blue");
}

// Main execution
function main() {
    const command = process.argv[2];

    log("🚀 AWS Amplify Deployment Script", "bright");
    log("================================", "bright");

    if (!command || command === "help") {
        showUsage();
        return;
    }

    if (command === "list") {
        checkPrerequisites();
        listEnvironments();
        return;
    }

    checkPrerequisites();
    validateEnvironment();

    switch (command) {
        case "production":
            deployToEnvironment("production", "main");
            break;
        case "development":
            deployToEnvironment("development", "develop");
            break;
        case "staging":
            deployToEnvironment("staging", "staging");
            break;
        default:
            log(`❌ Unknown command: ${command}`, "red");
            showUsage();
            process.exit(1);
    }
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
