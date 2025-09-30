import { EventType } from "@/types/types";
import EventRating from "./EventRating";

interface EventHeaderProps {
    event: EventType;
}

const EventHeader = ({ event }: EventHeaderProps) => (
    <div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient-primary">{event.title}</span>
        </h1>

        {event.description && (
            <p className="text-xl text-slate-300 leading-relaxed mb-6">
                {event.description}
            </p>
        )}

        <EventRating />
    </div>
);

export default EventHeader;
