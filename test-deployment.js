// Test script to verify deployment readiness
const fs = require("fs");
const path = require("path");

console.log("🔍 Testing deployment readiness...\n");

// Check if required files exist
const requiredFiles = [
    "next.config.ts",
    "buildspec.yml",
    ".env.example",
    "package.json",
];

let allFilesExist = true;

requiredFiles.forEach((file) => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} is missing`);
        allFilesExist = false;
    }
});

// Check next.config.ts for static export
try {
    const nextConfig = fs.readFileSync(
        path.join(__dirname, "next.config.ts"),
        "utf8"
    );
    if (nextConfig.includes("output: 'export'")) {
        console.log("✅ Static export configured in next.config.ts");
    } else {
        console.log("❌ Static export not configured in next.config.ts");
        allFilesExist = false;
    }
} catch (error) {
    console.log("❌ Error reading next.config.ts");
    allFilesExist = false;
}

// Check package.json for build script
try {
    const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, "package.json"), "utf8")
    );
    if (packageJson.scripts && packageJson.scripts.build) {
        console.log("✅ Build script exists in package.json");
    } else {
        console.log("❌ Build script missing in package.json");
        allFilesExist = false;
    }
} catch (error) {
    console.log("❌ Error reading package.json");
    allFilesExist = false;
}

console.log("\n" + "=".repeat(50));
if (allFilesExist) {
    console.log("🎉 All deployment files are ready!");
    console.log("You can now push to your repository to trigger deployment.");
} else {
    console.log("⚠️  Some files are missing or misconfigured.");
    console.log("Please fix the issues above before deploying.");
}
console.log("=".repeat(50));
