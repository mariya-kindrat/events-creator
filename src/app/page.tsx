import EventSlider from "@/components/EventSlider";
import FeaturedEvents from "@/components/FeaturedEvents";
import Offer from "@/components/Offer";

// Enable ISR for the homepage so it can be statically generated
export const revalidate = 60; // seconds

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between min-h-screen pt-20">
            <EventSlider />
            <FeaturedEvents />
            <Offer />
        </main>
    );
}
