const { PrismaClient } = require("./src/generated/prisma");

async function verifyDatabase() {
    const prisma = new PrismaClient();

    try {
        console.log("Checking database schema...");

        // Try to fetch events with images field
        const events = await prisma.event.findMany({
            select: {
                id: true,
                title: true,
                images: true,
            },
            take: 1,
        });

        console.log("✅ Successfully queried events with images field");
        console.log("Sample event:", events[0]);
    } catch (error) {
        console.error("❌ Database error:", error.message);

        // Try to get table info
        try {
            const result = await prisma.$queryRaw`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'Event' AND table_schema = 'public'
        ORDER BY ordinal_position;
      `;
            console.log("Event table columns:", result);
        } catch (infoError) {
            console.error("Could not get table info:", infoError.message);
        }
    } finally {
        await prisma.$disconnect();
    }
}

verifyDatabase();
