import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is this really a scholarship or just a discounted tech course?", a: "It's a true scholarship. CampusWin sponsors ₦147,000 (98%) of the full ₦150,000 tech training fee. The ₦3,000 you pay is a commitment fee — proof that you're serious about your own growth." },
  { q: "Which tech programs can I apply for?", a: "You can choose from 18+ in-demand tracks including Frontend Development, Backend Development, Full-Stack, Mobile App Development, UI/UX Design, Data Analysis, Data Science, Cybersecurity, Cloud/DevOps, Project Management, Product Management, Digital Marketing, Graphic Design, Video Editing, AI Engineering, Blockchain, and QA/Software Testing." },
  { q: "Do I get a certificate after the program?", a: "Yes. Every scholar who completes the required modules and assessments receives a professional, verifiable Certificate of Completion to add to their CV and LinkedIn." },
  { q: "Who can apply?", a: "Nigerian undergraduates, recent graduates (within 3 years), and NYSC corps members between 16 and 35 years old. You'll need a smartphone or laptop and reliable internet. No prior tech experience is required for beginner tracks." },
  { q: "Is the ₦3,000 commitment fee refundable?", a: "No. The commitment fee secures your slot in the cohort, covers platform access, and ensures only serious applicants take up scholarships meant for them." },
  { q: "When does the next cohort start?", a: "New cohorts open every 4–6 weeks. After applying, you'll be notified by email, SMS or WhatsApp once you're shortlisted." },
  { q: "Can I switch tech programs after I'm selected?", a: "You can request a switch before your cohort begins, subject to slot availability. Once classes start, you must complete the program you originally enrolled in." },
];

export const FAQ = () => (
  <section id="faq" className="bg-secondary/40 py-20 md:py-28">
    <div className="container max-w-3xl">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">FAQ</div>
        <h2 className="font-display text-3xl font-bold text-primary md:text-5xl">
          Questions, answered.
        </h2>
      </div>
      <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card p-2 shadow-soft">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`f-${i}`} className="border-border/60 px-4">
            <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
