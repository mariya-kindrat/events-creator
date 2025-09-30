import { BrandSection } from "./BrandSection";
import { FeaturesGrid } from "./FeaturesGrid";
import { StatsSection } from "./StatsSection";

export const HeroContent = () => (
    <div className="space-y-8">
        <BrandSection />
        <FeaturesGrid />
        <StatsSection />
    </div>
);
