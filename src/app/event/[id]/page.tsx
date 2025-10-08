import { EventType } from "@/types/types";
import {
    BackgroundElements,
    EventBookingSection,
    EventBreadcrumb,
    EventFeatures,
    EventGallery,
    EventHeader,
    EventImage,
    EventIncludes,
    EventStatusBadge,
} from "./event/components";
import AdminEditButton from "./event/components/AdminEditButton";
import { getData } from "./event/utils";

const SingleEvent = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const singleEvent: EventType = await getData(id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
            <BackgroundElements />

            <div className="relative z-10">
           
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
                    <EventBreadcrumb />
                    <EventStatusBadge />
                </div>

             
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      
                        <div className="relative">
                            <EventImage event={singleEvent} />
                            <EventGallery event={singleEvent} />
                        </div>

                        <div className="space-y-8">
                            <AdminEditButton eventId={singleEvent.id} />
                            <EventHeader event={singleEvent} />
                            <EventFeatures event={singleEvent} />
                            <EventBookingSection event={singleEvent} />
                            <EventIncludes eventId={singleEvent.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleEvent;
