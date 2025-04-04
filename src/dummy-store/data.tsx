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
    options: {
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
                option: "Standard Premuium Ticket",
                additionalPrice: 20,
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
                option: "Standard Premium Ticket",
                additionalPrice: 20,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 50,
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
                option: "Standard Premium Ticket",
                additionalPrice: 20,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 50,
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
                option: "Standard Premium Ticket",
                additionalPrice: 20,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 50,
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
                option: "Standard Premium Ticket",
                additionalPrice: 20,
            },
            {
                option: "VIP Ticket",
                additionalPrice: 50,
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
                additionalPrice: 15,
            },
            {
                option: "VIP Ticket with Portfolio Review",
                additionalPrice: 40,
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
                additionalPrice: 10,
            },
            {
                option: "VIP Ticket with Guided Tour",
                additionalPrice: 30,
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
                additionalPrice: 15,
            },
            {
                option: "VIP Ticket with Art Supplies",
                additionalPrice: 35,
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
                additionalPrice: 20,
            },
            {
                option: "VIP Ticket with Lunch Included",
                additionalPrice: 50,
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
                additionalPrice: 10,
            },
            {
                option: "VIP Ticket with Sketchbook",
                additionalPrice: 25,
            },
        ],
    },
];
