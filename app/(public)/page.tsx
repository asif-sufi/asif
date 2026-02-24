import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <PhilosophySection />
    </main>
  );
}
