import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-scholar.jpg";

export const Hero = () => (
  <section className="relative overflow-hidden bg-hero">
    <div className="absolute inset-0 bg-radial-gold opacity-80" aria-hidden />
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, hsl(38 50% 96%) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
      aria-hidden
    />

    <div className="container relative grid gap-12 py-20 md:grid-cols-2 md:py-28 md:gap-16 md:items-center">
      <div className="animate-fade-up text-primary-foreground">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          <Sparkles className="h-3.5 w-3.5" />
          Tech Scholarship · Cohort Open
        </div>

        <h1 className="font-display text-4xl font-bold leading-[1.05] text-balance md:text-6xl">
          Learn a <span className="text-accent">tech skill</span>.
          <br /> We sponsor 98% of the fee.
        </h1>

        <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
          Join the CampusWin Tech Scholarship and get trained in high-demand tech skills —
          worth <strong>₦150,000</strong> — for just <strong>₦3,000</strong>. Earn a
          <strong> professional certificate</strong> on completion.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gold font-semibold text-accent-foreground shadow-gold hover:opacity-95">
            <Link to="/apply">
              Apply for Scholarship <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <a href="#program">View Tech Programs</a>
          </Button>
        </div>

        <ul className="mt-10 grid gap-3 text-sm text-primary-foreground/85 sm:grid-cols-2">
          {[
            "₦147,000 sponsored by CampusWin",
            "18+ in-demand tech tracks",
            "Professional certificate on completion",
            "Mentorship & career support",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative animate-fade-up [animation-delay:120ms]">
        <div className="absolute -inset-4 rounded-3xl bg-gold opacity-30 blur-2xl" aria-hidden />
        <div className="relative overflow-hidden rounded-2xl border border-accent/20 shadow-elegant">
          <img
            src={heroImage}
            alt="Confident Nigerian university scholar holding a laptop"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Floating callout */}
        <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-accent/30 bg-card p-4 shadow-elegant sm:block">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Total Value</div>
          <div className="font-display text-2xl font-bold text-primary">₦150,000</div>
          <div className="text-xs text-success">You pay only ₦3,000</div>
        </div>
      </div>
    </div>
  </section>
);
