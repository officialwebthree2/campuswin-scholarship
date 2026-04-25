import { Code2, Server, Layers, Smartphone, Palette, Brush, BarChart3, Brain, Shield, Cloud, ClipboardList, Rocket, Megaphone, Image as ImageIcon, Film, Cpu, Link2, Bug, Award } from "lucide-react";
import { TECH_PROGRAMS } from "@/lib/tech-programs";

const ICONS: Record<string, typeof Code2> = {
  "Frontend Development": Code2,
  "Backend Development": Server,
  "Full-Stack Web Development": Layers,
  "Mobile App Development": Smartphone,
  "UI/UX Design": Palette,
  "Product Design": Brush,
  "Data Analysis": BarChart3,
  "Data Science & Machine Learning": Brain,
  "Cybersecurity": Shield,
  "Cloud Computing & DevOps": Cloud,
  "Project Management": ClipboardList,
  "Product Management": Rocket,
  "Digital Marketing": Megaphone,
  "Graphic Design": ImageIcon,
  "Video Editing & Motion Graphics": Film,
  "Artificial Intelligence (AI) Engineering": Cpu,
  "Blockchain Development": Link2,
  "Quality Assurance & Software Testing": Bug,
};

export const Program = () => (
  <section id="program" className="bg-background py-20 md:py-28">
    <div className="container">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Choose Your Path</div>
        <h2 className="font-display text-3xl font-bold text-primary md:text-5xl text-balance">
          18+ tech programs. One scholarship.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Pick the tech track that fits your future. Every scholar receives a
          <strong className="text-primary"> professional Certificate of Completion</strong> —
          recognized, verifiable, and ready for your CV and LinkedIn.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECH_PROGRAMS.map((title) => {
          const Icon = ICONS[title] ?? Code2;
          return (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant"
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-primary leading-tight">{title}</h3>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform group-hover:scale-x-100" />
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-12 flex max-w-2xl items-start gap-3 rounded-2xl border-2 border-accent/40 bg-accent/5 p-5">
        <Award className="h-6 w-6 flex-shrink-0 text-accent" />
        <p className="text-sm text-foreground/85">
          <strong className="text-primary">Professional Certificates Issued.</strong> On completion of
          your chosen program, you receive an industry-recognized certificate from CampusWin —
          verifiable online and ready to share with employers.
        </p>
      </div>
    </div>
  </section>
);
