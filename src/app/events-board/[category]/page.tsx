import { EventType } from "@/types/types";
import { Suspense } from "react";
import {
    AdminCategoryEditButton,
    BackgroundElements,
    Breadcrumb,
    EmptyState,
    EventCard,
    EventCardSkeleton,
    FilterSort,
    PageHeader,
    getCategoryInfo,
    getEventsByCategory,
} from "../shared";

type Props = {
    params: Promise<{
        category: string;
    }>;
};

const CategoryPage = async ({ params }: Props) => {
    const { category } = await params;
    const [events, categoryInfo] = await Promise.all([
        getEventsByCategory(category),
        getCategoryInfo(category),
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Elements */}
                <BackgroundElements />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    {/* Breadcrumb */}
                    <Breadcrumb
                        items={[
                            { label: "Events Board", href: "/events-board" },
                            { label: categoryInfo.title },
                        ]}
                    />

                    {/* Admin Edit Button */}
                    {categoryInfo.id && (
                        <AdminCategoryEditButton categoryId={categoryInfo.id} />
                    )}

                    {/* Header */}
                    <PageHeader
                        badge={{
                            text: `${events.length} Premium Events Available`,
                            icon: true,
                        }}
                        title={{
                            primary: categoryInfo.title,
                            secondary: "Events",
                        }}
                        description={
                            categoryInfo.description ||
                            "Discover exceptional events curated for unforgettable experiences"
                        }
                    />

                    {/* Filters */}
                    <FilterSort />

                    {/* Events Grid */}
                    <Suspense
                        fallback={
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {[...Array(8)].map((_, i) => (
                                    <EventCardSkeleton key={i} />
                                ))}
                            </div>
                        }
                    >
                        {events.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {events.map((event: EventType) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState />
                        )}
                    </Suspense>

                    {/* Load More Button */}
                    {events.length > 0 && (
                        <div className="text-center mt-16">
                            <button className="btn-premium">
                                Load More Events
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
