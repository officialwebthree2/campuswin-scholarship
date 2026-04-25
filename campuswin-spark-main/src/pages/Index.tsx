import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { Program } from "@/components/landing/Program";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import { FAQ } from "@/components/landing/FAQ";

const Index = () => (
  <div className="min-h-screen bg-background">
    <SiteHeader />
    <main>
      <Hero />
      <Program />
      <HowItWorks />
      <CTA />
      <FAQ />
    </main>
    <SiteFooter />
  </div>
);

export default Index;
