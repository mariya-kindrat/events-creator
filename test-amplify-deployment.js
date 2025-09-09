#!/usr/bin/env node

const https = require("https");

const AMPLIFY_URL = "https://master.d16jh2qsui6dp9.amplifyapp.com";

console.log("🚀 Testing Amplify Deployment...\n");

// Test endpoints
const endpoints = [
    { path: "/", name: "Home Page" },
    { path: "/api/test-db", name: "Database Connection" },
    { path: "/login", name: "Login Page" },
    { path: "/events-board", name: "Events Board" },
];

async function testEndpoint(endpoint) {
    return new Promise((resolve) => {
        const url = `${AMPLIFY_URL}${endpoint.path}`;
        console.log(`Testing ${endpoint.name}: ${url}`);

        const req = https.get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                const status = res.statusCode;
                const success = status >= 200 && status < 400;

                console.log(`  Status: ${status} ${success ? "✅" : "❌"}`);

                if (endpoint.path === "/api/test-db" && success) {
                    try {
                        const jsonData = JSON.parse(data);
                        console.log(
                            `  Database: ${
                                jsonData.success ? "✅ Connected" : "❌ Failed"
                            }`
                        );
                        if (jsonData.data) {
                            console.log(
                                `  Events: ${jsonData.data.events || 0}`
                            );
                            console.log(
                                `  Categories: ${jsonData.data.categories || 0}`
                            );
                        }
                    } catch (e) {
                        console.log(`  Response: ${data.substring(0, 100)}...`);
                    }
                }

                resolve({ endpoint: endpoint.name, status, success, data });
            });
        });

        req.on("error", (error) => {
            console.log(`  Error: ${error.message} ❌`);
            resolve({
                endpoint: endpoint.name,
                status: 0,
                success: false,
                error: error.message,
            });
        });

        req.setTimeout(10000, () => {
            req.destroy();
            console.log(`  Timeout ❌`);
            resolve({
                endpoint: endpoint.name,
                status: 0,
                success: false,
                error: "Timeout",
            });
        });
    });
}

async function runTests() {
    const results = [];

    for (const endpoint of endpoints) {
        const result = await testEndpoint(endpoint);
        results.push(result);
        console.log(""); // Empty line for readability
    }

    // Summary
    console.log("📊 Test Summary:");
    console.log("================");

    const successful = results.filter((r) => r.success).length;
    const total = results.length;

    results.forEach((result) => {
        console.log(
            `${result.success ? "✅" : "❌"} ${result.endpoint}: ${
                result.status || "Error"
            }`
        );
    });

    console.log(
        `\n🎯 Success Rate: ${successful}/${total} (${Math.round(
            (successful / total) * 100
        )}%)`
    );

    if (successful === total) {
        console.log("\n🎉 All tests passed! Deployment is working correctly.");
    } else {
        console.log(
            "\n⚠️  Some tests failed. Check the Amplify Console for more details."
        );
    }
}

runTests().catch(console.error);
