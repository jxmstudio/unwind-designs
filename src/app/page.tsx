import { AnnouncementBar } from "@/components/announcement-bar";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { FeaturedSlider } from "@/components/sections/FeaturedSlider";
import { ServicesChips } from "@/components/sections/ServicesChips";
import { TroopyPromo } from "@/components/sections/TroopyPromo";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsletterCard } from "@/components/sections/NewsletterCard";
import { Footer } from "@/components/footer";
import { AnimationProvider } from "@/components/anim";
import { Case } from "@/components/ui/cases-with-infinite-scroll";

export default function Home() {
  return (
    <AnimationProvider>
      <main className="min-h-screen">
        <AnnouncementBar />
        <Navigation />
        <Hero />
        <div className="bg-gradient-to-b from-cream-400 via-surface-100 to-surface-200">
          <ValueProps />
          <TroopyPromo />
          <FeaturedSlider />
          <ServicesChips />
          <GalleryPreview />
          <Testimonials />
          <NewsletterCard />
        </div>
        <Case />
        <Footer />
      </main>
    </AnimationProvider>
  );
}
