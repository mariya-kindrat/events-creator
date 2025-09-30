async function testAPI() {
    try {
        console.log("Testing /api/events endpoint...");

        const response = await fetch("http://localhost:3000/api/events", {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("❌ API Error:", response.status, errorData);
            return;
        }

        const events = await response.json();
        console.log("✅ API Success!");
        console.log("Number of events:", events.length);

        if (events.length > 0) {
            console.log("Sample event structure:");
            console.log("- ID:", events[0].id);
            console.log("- Title:", events[0].title);
            console.log("- Images field exists:", "images" in events[0]);
            console.log("- Images value:", events[0].images);
        }
    } catch (error) {
        console.error("❌ Network Error:", error.message);
    }
}

testAPI();
