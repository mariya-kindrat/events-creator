import SingleEventPrice from "@/components/SingleEventPrice";
import { EventType } from "@/types/types";
import { Suspense } from "react";

interface EventBookingSectionProps {
    event: EventType;
}

const EventBookingSection = ({ event }: EventBookingSectionProps) => (
    <div className="p-8 rounded-3xl glass border border-slate-700/50">
        <h3 className="text-2xl font-bold text-white mb-6">
            Book Your Experience
        </h3>
        <Suspense
            fallback={
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-slate-700/30 rounded"></div>
                    <div className="h-12 bg-slate-700/30 rounded"></div>
                    <div className="h-16 bg-slate-700/30 rounded"></div>
                </div>
            }
        >
            <SingleEventPrice event={event} />
        </Suspense>
    </div>
);

export default EventBookingSection;
