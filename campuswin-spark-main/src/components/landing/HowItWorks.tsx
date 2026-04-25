const steps = [
  { n: "01", title: "Apply Online", desc: "Fill the scholarship form and pick your tech program. Takes ~5 minutes." },
  { n: "02", title: "Get Reviewed", desc: "Our team scores every application on motivation, clarity, and commitment." },
  { n: "03", title: "Get Shortlisted", desc: "Successful candidates receive an offer via email, SMS, or WhatsApp." },
  { n: "04", title: "Train & Get Certified", desc: "Pay the ₦3,000 commitment fee, start training, and earn your professional certificate." },
];

export const HowItWorks = () => (
  <section id="how" className="relative overflow-hidden bg-secondary/40 py-20 md:py-28">
    <div className="container">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">The Process</div>
        <h2 className="font-display text-3xl font-bold text-primary md:text-5xl text-balance">
          From applicant to certified in 4 steps.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="font-display text-5xl font-bold text-accent/90">{s.n}</div>
            <h3 className="mt-3 font-display text-lg font-bold text-primary">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="absolute right-0 top-12 hidden h-px w-1/2 translate-x-full bg-gradient-to-r from-accent/40 to-transparent md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
