import EventSlider from "@/components/EventSlider";
import FeaturedEvents from "@/components/FeaturedEvents";
import Offer from "@/components/Offer";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between min-h-screen p-4">
            <EventSlider />
            <FeaturedEvents />
            <Offer />
        </main>
    );
}
