const { PrismaClient } = require("./src/generated/prisma");

async function checkDatabaseSchema() {
    const prisma = new PrismaClient();

    try {
        console.log("🔍 Checking actual database schema...");

        // Get table columns directly from database
        const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'Event' AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;

        console.log("📋 Event table columns in database:");
        columns.forEach((col) => {
            console.log(
                `  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`
            );
        });

        // Try to get a sample event to see what fields are actually available
        console.log(
            "\n🎯 Trying to fetch events with different field combinations..."
        );

        try {
            const eventWithImages = await prisma.event.findFirst({
                select: { id: true, title: true, images: true },
            });
            console.log("✅ Successfully queried with images field");
        } catch (error) {
            console.log("❌ Failed to query with images field:", error.message);

            // Try with image field instead
            try {
                const eventWithImage = await prisma.event.findFirst({
                    select: { id: true, title: true, image: true },
                });
                console.log(
                    "✅ Successfully queried with image field (singular)"
                );
                console.log("Sample event:", eventWithImage);
            } catch (imageError) {
                console.log(
                    "❌ Failed to query with image field too:",
                    imageError.message
                );
            }
        }
    } catch (error) {
        console.error("❌ Database connection error:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabaseSchema();
