export const SLIDER_DATA = [
    {
        id: 1,
        title: "Abstract Art Workshop",
        image: "/events/event_11.jpg",
    },
    {
        id: 2,
        title: "Watercolor Techniques for Beginners",
        image: "/events/event_12.jpg",
    },
    {
        id: 3,
        title: "Oil Painting Masterclass",
        image: "/events/event_13.jpg",
    },
    {
        id: 4,
        title: "Landscape Painting Essentials",
        image: "/events/event_14.jpg",
    },
    {
        id: 5,
        title: "Portrait Painting Workshop",
        image: "/events/event_15.jpg",
    },
];

type Event = {
    id: number;
    title: string;
    image: string;
    description: string;
    date: string;
    time: string;
    location: string;
    price: number;
    options?: {
        option: string;
        additionalPrice: number;
    }[];
};

type Events = Event[];

export const FUTURE_EVENTS_DATA: Events = [
    {
        id: 1,
        title: "Abstract Art Workshop",
        image: "/events/future_event_01.jpg",
        description:
            "Join us for a creative journey into the world of abstract art. This workshop is designed for artists of all levels, from beginners to advanced. Explore various techniques and mediums to express your unique artistic vision.",
        date: "2025-4-15",
        time: "10:00 AM - 4:00 PM",
        location: "Art Studio, 123 Main St, Cityville",
        price: 80,
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
        id: 2,
        title: "Watercolor Techniques for Beginners",
        image: "/events/future_event_02.jpg",
        description:
            "Discover the beauty of watercolor painting in this beginner-friendly workshop. Learn essential techniques, color mixing, and brushwork to create stunning watercolor artworks.",
        date: "2025-4-20",
        time: "10:00 AM - 4:00 PM",
        location: "Art Studio, 123 Main St, Palm Coast",
        price: 120,
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
        id: 3,
        title: "Oil Painting Masterclass",
        image: "/events/future_event_03.jpg",
        description:
            "Take your oil painting skills to the next level in this masterclass. Learn advanced techniques, color theory, and composition from a professional artist.",
        date: "2025-4-25",
        time: "10:00 AM - 4:00 PM",
        location: "Art Studio, 123 Main St, Palm Coast",
        price: 90,
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
        id: 4,
        title: "Landscape Painting Essentials",
        image: "/events/future_event_04.jpg",
        description:
            "Learn the fundamentals of landscape painting in this workshop. Explore composition, color mixing, and brush techniques to create breathtaking landscapes.",
        date: "2025-4-30",
        time: "10:00 AM - 4:00 PM",
        location: "Art Studio, 123 Main St, Palm Coast",
        price: 110,
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
        id: 5,
        title: "Portrait Painting Workshop",
        image: "/events/future_event_05.jpg",
        description:
            "Join us for a portrait painting workshop where you'll learn techniques for capturing the human form and expression. Suitable for all skill levels.",
        date: "2025-5-5",
        time: "10:00 AM - 4:00 PM",
        location: "Art Studio, 123 Main St, Palm Coast",
        price: 130,
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
        id: 6,
        title: "Digital Photography Basics",
        image: "/events/future_event_06.jpg",
        description:
            "Learn the fundamentals of digital photography, including camera settings, composition, and lighting techniques. Perfect for beginners looking to improve their photography skills.",
        date: "2025-5-10",
        time: "9:00 AM - 3:00 PM",
        location: "Photo Studio, 456 Elm St, Cityville",
        price: 100,
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
        id: 7,
        title: "Street Photography Workshop",
        image: "/events/future_event_07.jpg",
        description:
            "Explore the art of street photography in this hands-on workshop. Learn how to capture candid moments and tell stories through your lens.",
        date: "2025-5-15",
        time: "10:00 AM - 2:00 PM",
        location: "Downtown Cityville",
        price: 75,
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
        id: 8,
        title: "Acrylic Painting for Beginners",
        image: "/events/future_event_08.jpg",
        description:
            "Discover the versatility of acrylic paints in this beginner-friendly workshop. Learn blending, layering, and texturing techniques to create vibrant artworks.",
        date: "2025-5-20",
        time: "10:00 AM - 4:00 PM",
        location: "Art Studio, 789 Maple St, Cityville",
        price: 85,
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
        id: 9,
        title: "Yoga and Art Retreat",
        image: "/events/future_event_09.jpg",
        description:
            "Combine relaxation and creativity in this unique retreat. Enjoy yoga sessions followed by art workshops to rejuvenate your mind and body.",
        date: "2025-5-25",
        time: "8:00 AM - 6:00 PM",
        location: "Wellness Center, 321 Oak St, Cityville",
        price: 150,
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
        id: 10,
        title: "Urban Sketching Adventure",
        image: "/events/future_event_10.jpg",
        description:
            "Join us for an urban sketching adventure where you'll learn to capture the essence of cityscapes with quick and expressive sketches.",
        date: "2025-5-30",
        time: "9:00 AM - 1:00 PM",
        location: "City Park, 654 Pine St, Cityville",
        price: 70,
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

type EventCategory = {
    id: number;
    slug: string;
    title: string;
    image: string;
    description: string;
    color: string;
};

export const EVENTS_CATEGORIES: EventCategory[] = [
    {
        id: 1,
        slug: "art",
        title: "Art",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
        description:
            "Explore a variety of art events, including painting workshops, exhibitions, and more.",
        color: "white",
    },
    {
        id: 2,
        slug: "photo",
        title: "Photo",
        image: "https://plus.unsplash.com/premium_photo-1681487469745-91d1d8a5836b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
        description:
            "Join photography workshops, learn techniques, and capture stunning moments.",
        color: "green",
    },
    {
        id: 3,
        slug: "music",
        title: "Music",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
        description:
            "Experience live music events, concerts, and workshops with talented artists.",
        color: "#3357FF",
    },
    {
        id: 4,
        slug: "dance",
        title: "Dance",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
        description:
            "Participate in dance workshops, classes, and performances across various styles.",
        color: "#FF33A1",
    },
];
