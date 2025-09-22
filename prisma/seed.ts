import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const EVENTS_CATEGORIES = [
    {
        slug: "art",
        title: "Art",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
        description: "Explore a variety of art events, including painting workshops, exhibitions, and more.",
        color: "white",
    },
    {
        slug: "photo",
        title: "Photo",
        image: "https://plus.unsplash.com/premium_photo-1681487469745-91d1d8a5836b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
        description: "Join photography workshops, learn techniques, and capture stunning moments.",
        color: "green",
    },
    {
        slug: "music",
        title: "Music",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
        description: "Experience live music events, concerts, and workshops with talented artists.",
        color: "#3357FF",
    },
    {
        slug: "dance",
        title: "Dance",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
        description: "Participate in dance workshops, classes, and performances across various styles.",
        color: "#FF33A1",
    },
];

const FUTURE_EVENTS_DATA = [
    {
        title: "Abstract Art Workshop",
        image: "/events/future_event_01.jpg",
        description: "Join us for a creative journey into the world of abstract art. This workshop is designed for artists of all levels, from beginners to advanced. Explore various techniques and mediums to express your unique artistic vision.",
        location: "Art Studio, 123 Main St, Cityville",
        price: 80,
        isFeatured: true,
        catSlug: "art",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 30,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 50,
            },
        ],
    },
    {
        title: "Watercolor Techniques for Beginners",
        image: "/events/future_event_02.jpg",
        description: "Discover the beauty of watercolor painting in this beginner-friendly workshop. Learn essential techniques, color mixing, and brushwork to create stunning watercolor artworks.",
        location: "Art Studio, 123 Main St, Palm Coast",
        price: 120,
        isFeatured: true,
        catSlug: "art",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 50,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 80,
            },
        ],
    },
    {
        title: "Oil Painting Masterclass",
        image: "/events/future_event_03.jpg",
        description: "Take your oil painting skills to the next level in this masterclass. Learn advanced techniques, color theory, and composition from a professional artist.",
        location: "Art Studio, 123 Main St, Palm Coast",
        price: 90,
        isFeatured: false,
        catSlug: "art",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 35,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 65,
            },
        ],
    },
    {
        title: "Landscape Painting Essentials",
        image: "/events/future_event_04.jpg",
        description: "Learn the fundamentals of landscape painting in this workshop. Explore composition, color mixing, and brush techniques to create breathtaking landscapes.",
        location: "Art Studio, 123 Main St, Palm Coast",
        price: 110,
        isFeatured: true,
        catSlug: "art",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 40,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 75,
            },
        ],
    },
    {
        title: "Portrait Painting Workshop",
        image: "/events/future_event_05.jpg",
        description: "Join us for a portrait painting workshop where you'll learn techniques for capturing the human form and expression. Suitable for all skill levels.",
        location: "Art Studio, 123 Main St, Palm Coast",
        price: 130,
        isFeatured: false,
        catSlug: "art",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 50,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 90,
            },
        ],
    },
    {
        title: "Digital Photography Basics",
        image: "/events/future_event_06.jpg",
        description: "Learn the fundamentals of digital photography, including camera settings, composition, and lighting techniques. Perfect for beginners looking to improve their photography skills.",
        location: "Photo Studio, 456 Elm St, Cityville",
        price: 100,
        isFeatured: true,
        catSlug: "photo",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 40,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 80,
            },
        ],
    },
    {
        title: "Street Photography Workshop",
        image: "/events/future_event_07.jpg",
        description: "Explore the art of street photography in this hands-on workshop. Learn how to capture candid moments and tell stories through your lens.",
        location: "Downtown Cityville",
        price: 75,
        isFeatured: false,
        catSlug: "photo",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 25,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 55,
            },
        ],
    },
    {
        title: "Acrylic Painting for Beginners",
        image: "/events/future_event_08.jpg",
        description: "Discover the versatility of acrylic paints in this beginner-friendly workshop. Learn blending, layering, and texturing techniques to create vibrant artworks.",
        location: "Art Studio, 789 Maple St, Cityville",
        price: 85,
        isFeatured: true,
        catSlug: "art",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 20,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 50,
            },
        ],
    },
    {
        title: "Yoga and Art Retreat",
        image: "/events/future_event_09.jpg",
        description: "Combine relaxation and creativity in this unique retreat. Enjoy yoga sessions followed by art workshops to rejuvenate your mind and body.",
        location: "Wellness Center, 321 Oak St, Cityville",
        price: 150,
        isFeatured: false,
        catSlug: "art",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 60,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 100,
            },
        ],
    },
    {
        title: "Urban Sketching Adventure",
        image: "/events/future_event_10.jpg",
        description: "Join us for an urban sketching adventure where you'll learn to capture the essence of cityscapes with quick and expressive sketches.",
        location: "City Park, 654 Pine St, Cityville",
        price: 70,
        isFeatured: true,
        catSlug: "art",
        options: [
            {
                option: "Standard Ticket",
                additionalPrice: 0,
            },
            {
                option: "Premium Ticket",
                additionalPrice: 20,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 45,
            },
        ],
    },
];

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await prisma.event.deleteMany();
    await prisma.category.deleteMany();

    // Seed categories
    console.log('📂 Seeding categories...');
    for (const category of EVENTS_CATEGORIES) {
        await prisma.category.create({
            data: category,
        });
    }

    // Seed events
    console.log('🎪 Seeding events...');
    for (const event of FUTURE_EVENTS_DATA) {
        await prisma.event.create({
            data: event,
        });
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Created ${EVENTS_CATEGORIES.length} categories and ${FUTURE_EVENTS_DATA.length} events`);
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });