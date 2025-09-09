// Simple script to test environment variables after deployment
const testEndpoints = [
    "/api/env-check",
    "/api/debug/env",
    "/api/test-db",
    "/api/events",
];

const baseUrl = "https://master.d16jh2qsui6dp9.amplifyapp.com";

async function testEndpoint(endpoint) {
    try {
        console.log(`\n🧪 Testing ${endpoint}...`);
        const response = await fetch(`${baseUrl}${endpoint}`);
        const data = await response.json();

        console.log(`Status: ${response.status}`);
        console.log("Response:", JSON.stringify(data, null, 2));

        return { endpoint, status: response.status, data };
    } catch (error) {
        console.error(`❌ Error testing ${endpoint}:`, error.message);
        return { endpoint, error: error.message };
    }
}

async function runTests() {
    console.log("🚀 Testing deployment endpoints...\n");

    for (const endpoint of testEndpoints) {
        await testEndpoint(endpoint);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second between requests
    }

    console.log("\n✅ Tests completed!");
}

runTests();
