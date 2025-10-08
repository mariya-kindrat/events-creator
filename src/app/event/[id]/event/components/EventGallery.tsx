import { EventType } from "@/types/types";
import Image from "next/image";

interface EventGalleryProps {
    event: EventType;
}

const EventGallery = ({ event }: EventGalleryProps) => {
    let imagesToShow =
        event.images && event.images.length > 0
            ? event.images
            : [];

    if (imagesToShow.length > 0 && imagesToShow.length < 4) {
        const mainImage = imagesToShow[0];
        while (imagesToShow.length < 4) {
            imagesToShow.push(mainImage);
        }
    }

    imagesToShow = imagesToShow.slice(0, 4);

    if (imagesToShow.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Event Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {imagesToShow.map((imageUrl, index) => (
                    <div
                        key={index}
                        className="aspect-square relative overflow-hidden rounded-xl glass border border-slate-700/50 group cursor-pointer hover:border-blue-500/50 transition-all duration-300"
                    >
                        <Image
                            src={imageUrl}
                            alt={`${event.title} gallery ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                            {index + 1}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-white/20 backdrop-blur-md rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventGallery;
