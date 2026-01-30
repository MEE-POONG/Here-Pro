import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { AboutStory } from '@/components/home/AboutStory';
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee';
import { PromoBanner } from '@/components/home/PromoBanner';
import { trackVisit } from '@/actions/admin-actions';

export default async function Home() {
  // Track visit (non-blocking in theory if we don't await, but in RSC we should await to ensure it runs)
  // To avoid blocking the UI, we can wrap it in a try-catch and maybe Promise.allsettled but RSC renders sequentially.
  // Actually, for a simple counter in a small app, awaiting is fine. It takes <10ms for SQLite.
  await trackVisit();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <InfiniteMarquee />
        <PromoBanner />
        <div id="products">
          <FeaturedProducts />
        </div>
        <AboutStory />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
