import { Link, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SiteHeader = () => {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero shadow-elegant">
            <GraduationCap className="h-5 w-5 text-accent" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-primary">CampusWin</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Scholarship</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="/#program" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">Program</a>
          <a href="/#benefits" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">Benefits</a>
          <a href="/#how" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">How it works</a>
          <a href="/#faq" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">FAQ</a>
        </nav>

        <div className="flex items-center gap-2">
          {pathname !== "/apply" && (
            <Button asChild className="bg-gold font-semibold text-accent-foreground shadow-gold hover:opacity-95">
              <Link to="/apply">Apply Now</Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link to="/admin/login">Admin</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
