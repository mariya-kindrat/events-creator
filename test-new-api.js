async function testNewAPI() {
    try {
        console.log("Testing /api/test-events endpoint...");

        const response = await fetch("http://localhost:3000/api/test-events", {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("❌ API Error:", response.status, errorData);
            return;
        }

        const result = await response.json();
        console.log("✅ Test API Success!");
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("❌ Network Error:", error.message);
    }
}

testNewAPI();
