import { GraduationCap, Mail, Phone, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export const SiteFooter = () => (
  <footer className="border-t border-border/60 bg-primary text-primary-foreground">
    <div className="container py-14">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold">
              <GraduationCap className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <div className="font-display text-lg font-bold">CampusWin</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60">Scholarship Plan</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            Empowering Nigerian students with 98% sponsored access to world-class training.
            Your ambition deserves a platform.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/apply" className="hover:text-accent">Apply</Link></li>
            <li><a href="/#program" className="hover:text-accent">Program</a></li>
            <li><a href="/#faq" className="hover:text-accent">FAQ</a></li>
            <li><Link to="/admin/login" className="hover:text-accent">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> scholarships@campuswin.com.ng</li>
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +234 — XXX — XXX — XXXX</li>
            <li className="flex items-center gap-2"><Instagram className="h-3.5 w-3.5" /> @CampusWinNG</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} CampusWin Scholarship Plan. All rights reserved.
      </div>
    </div>
  </footer>
);
