import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => (
  <section id="benefits" className="bg-background py-20 md:py-28">
    <div className="container">
      <div className="relative overflow-hidden rounded-3xl bg-hero p-10 md:p-16 shadow-elegant">
        <div className="absolute inset-0 bg-radial-gold opacity-70" aria-hidden />
        <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="text-primary-foreground">
            <h2 className="font-display text-3xl font-bold md:text-5xl text-balance">
              Get a tech skill. <span className="text-accent">Get certified. Get paid.</span>
            </h2>
            <p className="mt-4 max-w-xl text-primary-foreground/85">
              Limited slots open per cohort across all tech programs. Apply today, get reviewed
              within days, and walk away with a professional certificate that opens doors.
            </p>
            <Button asChild size="lg" className="mt-8 bg-gold font-semibold text-accent-foreground shadow-gold hover:opacity-95">
              <Link to="/apply">
                Start My Application <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-accent/30 bg-primary/40 p-6 backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">Scholarship Breakdown</div>
            <div className="mt-3 space-y-3 text-primary-foreground">
              <div className="flex items-center justify-between border-b border-primary-foreground/15 pb-3">
                <span className="text-sm">Full Tuition Value</span>
                <span className="font-display text-xl font-bold">₦150,000</span>
              </div>
              <div className="flex items-center justify-between border-b border-primary-foreground/15 pb-3">
                <span className="text-sm">CampusWin Sponsors</span>
                <span className="font-display text-xl font-bold text-accent">₦147,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">You Commit</span>
                <span className="font-display text-2xl font-bold text-success">₦3,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
