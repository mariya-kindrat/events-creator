import { EventCategory } from "@/types/types";
import { Suspense } from "react";
import {
    BackgroundElements,
    CategoryCard,
    CategoryCardSkeleton,
    PageHeader,
    StatsSection,
    getCategories,
} from "./shared";

const EventsBoardPage = async () => {
    const eventsCategories: EventCategory = await getCategories();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Elements */}
                <BackgroundElements />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    {/* Header */}
                    <PageHeader
                        badge={{
                            text: "Premium Event Categories",
                            icon: true,
                        }}
                        title={{
                            primary: "Discover",
                            secondary: "Extraordinary Events",
                        }}
                        description="Explore our curated collection of premium event categories, each offering unique experiences designed to create unforgettable memories."
                    />

                    {/* Categories Grid */}
                    <Suspense
                        fallback={
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <CategoryCardSkeleton key={i} />
                                ))}
                            </div>
                        }
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {eventsCategories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                />
                            ))}
                        </div>
                    </Suspense>

                    {/* Stats Section */}
                    <StatsSection />
                </div>
            </div>
        </div>
    );
};

export default EventsBoardPage;
