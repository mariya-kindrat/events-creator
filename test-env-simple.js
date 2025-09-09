const https = require("https");

function testEnvVars() {
    const url = "https://master.d16jh2qsui6dp9.amplifyapp.com/api/env-test";

    console.log("🧪 Testing environment variables...");

    https
        .get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                try {
                    const response = JSON.parse(data);

                    console.log("\n📊 Environment Variables Status:");
                    console.log("================================");
                    console.log(
                        `Total env vars: ${response.data.totalEnvVars}`
                    );
                    console.log(`Node environment: ${response.data.nodeEnv}`);

                    console.log("\n🔍 Direct Checks:");
                    Object.entries(response.data.directChecks).forEach(
                        ([key, value]) => {
                            const status = value === "SET" ? "✅" : "❌";
                            console.log(`${status} ${key}: ${value}`);
                        }
                    );

                    console.log("\n📋 Relevant Variables Found:");
                    const relevantCount = Object.keys(
                        response.data.relevantVars
                    ).length;
                    console.log(`Found ${relevantCount} relevant variables`);

                    if (relevantCount > 1) {
                        // More than just AWS_AMPLIFY_CREDENTIAL_LISTENER_ENABLED
                        Object.entries(response.data.relevantVars).forEach(
                            ([key, value]) => {
                                if (!key.startsWith("AWS_")) {
                                    const status =
                                        value === "SET" ? "✅" : "❌";
                                    console.log(`${status} ${key}: ${value}`);
                                }
                            }
                        );
                    } else {
                        console.log("❌ No custom environment variables found");
                    }

                    console.log(
                        `\n🕐 Last checked: ${new Date().toLocaleTimeString()}`
                    );

                    // Check if we have the critical variables
                    const criticalVars = [
                        "DATABASE_URL",
                        "NEXTAUTH_SECRET",
                        "ENABLE_DEBUG",
                    ];
                    const missingVars = criticalVars.filter(
                        (varName) =>
                            response.data.directChecks[varName] === "NOT_SET"
                    );

                    if (missingVars.length === 0) {
                        console.log(
                            "\n🎉 SUCCESS: All critical environment variables are loaded!"
                        );
                    } else {
                        console.log(
                            `\n⚠️  Still missing: ${missingVars.join(", ")}`
                        );
                        console.log(
                            "💡 Try redeploying from AWS Amplify Console"
                        );
                    }
                } catch (error) {
                    console.error("❌ Error parsing response:", error.message);
                    console.log(
                        "Raw response:",
                        data.substring(0, 200) + "..."
                    );
                }
            });
        })
        .on("error", (error) => {
            console.error("❌ Request failed:", error.message);
        });
}

// Run the test
testEnvVars();
