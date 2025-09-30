import EventShowcase from "@/components/EventShowcase";
import EventSlider from "@/components/EventSlider";
import FeaturedEvents from "@/components/FeaturedEvents";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <div className="pt-20">
                <EventSlider />
            </div>
            <FeaturedEvents />
            <EventShowcase />
        </main>
    );
}
