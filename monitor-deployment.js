const https = require("https");

function checkDeployment() {
    const url = "https://master.d16jh2qsui6dp9.amplifyapp.com/api/env-test";

    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                let data = "";

                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    try {
                        const response = JSON.parse(data);
                        resolve(response);
                    } catch (error) {
                        reject(error);
                    }
                });
            })
            .on("error", (error) => {
                reject(error);
            });
    });
}

async function monitorDeployment() {
    console.log(
        "🔄 Monitoring AWS Amplify deployment for environment variables..."
    );
    console.log("⏰ Checking every 30 seconds...\n");

    let checkCount = 0;
    const maxChecks = 20; // 10 minutes total

    const interval = setInterval(async () => {
        checkCount++;

        try {
            console.log(
                `📡 Check #${checkCount} - ${new Date().toLocaleTimeString()}`
            );

            const response = await checkDeployment();
            const criticalVars = [
                "DATABASE_URL",
                "NEXTAUTH_SECRET",
                "ENABLE_DEBUG",
            ];
            const missingVars = criticalVars.filter(
                (varName) => response.data.directChecks[varName] === "NOT_SET"
            );

            if (missingVars.length === 0) {
                console.log(
                    "\n🎉 SUCCESS! All environment variables are now loaded!"
                );
                console.log("✅ DATABASE_URL: SET");
                console.log("✅ NEXTAUTH_SECRET: SET");
                console.log("✅ ENABLE_DEBUG: SET");
                console.log("\n🚀 Your application should now work properly!");
                clearInterval(interval);
                return;
            }

            console.log(`   ❌ Still missing: ${missingVars.join(", ")}`);

            if (checkCount >= maxChecks) {
                console.log("\n⏰ Monitoring timeout reached.");
                console.log(
                    "💡 If rebuild is still in progress, continue monitoring manually."
                );
                clearInterval(interval);
            }
        } catch (error) {
            console.log(`   ⚠️  Error checking deployment: ${error.message}`);

            if (checkCount >= maxChecks) {
                console.log("\n⏰ Monitoring timeout reached.");
                clearInterval(interval);
            }
        }
    }, 30000); // Check every 30 seconds

    // Initial check
    try {
        const response = await checkDeployment();
        const criticalVars = [
            "DATABASE_URL",
            "NEXTAUTH_SECRET",
            "ENABLE_DEBUG",
        ];
        const missingVars = criticalVars.filter(
            (varName) => response.data.directChecks[varName] === "NOT_SET"
        );

        if (missingVars.length === 0) {
            console.log("🎉 Environment variables are already loaded!");
            clearInterval(interval);
            return;
        }

        console.log(`📊 Initial status: Missing ${missingVars.join(", ")}`);
        console.log("⏳ Waiting for rebuild to complete...\n");
    } catch (error) {
        console.log(`⚠️  Initial check failed: ${error.message}`);
        console.log("⏳ Will continue monitoring...\n");
    }
}

// Start monitoring
monitorDeployment();
