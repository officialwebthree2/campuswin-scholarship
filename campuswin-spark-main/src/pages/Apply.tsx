import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { applicationSchema, type ApplicationFormData } from "@/lib/application-schema";
import { NIGERIAN_STATES } from "@/lib/nigerian-states";
import { TECH_PROGRAMS } from "@/lib/tech-programs";

const STEPS = [
  { id: 1, label: "Personal & Program" },
  { id: 2, label: "Contact" },
  { id: 3, label: "Background" },
  { id: 4, label: "Motivation" },
  { id: 5, label: "Commitment" },
  { id: 6, label: "Declaration" },
];

const Apply = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    defaultValues: {
      full_name: "", date_of_birth: "", gender: "", state_of_origin: "",
      state_of_residence: "", home_address: "", institution: "", course_of_study: "",
      current_level: "", matric_number: "", expected_graduation: "",
      tech_program: "",
      phone: "", whatsapp: "", email: "", instagram_handle: "", twitter_handle: "", other_social: "",
      sponsor: "", sponsor_other: "", financial_situation: "", income_activity: false, income_description: "",
      why_deserve: "", top_goals: "", story_impact: "",
      commitment_actions: "", weekly_hours: "", give_back_plan: "",
      declaration_accepted: undefined as unknown as true,
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = form;

  const stepFields: Record<number, (keyof ApplicationFormData)[]> = {
    1: ["full_name", "institution", "current_level", "tech_program"],
    2: ["phone", "email"],
    3: [],
    4: ["why_deserve"],
    5: ["commitment_actions", "weekly_hours"],
    6: ["declaration_accepted"],
  };

  const next = async () => {
    const ok = await trigger(stepFields[step]);
    if (!ok) return;
    setStep((s) => Math.min(s + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        date_of_birth: data.date_of_birth || null,
      };
      const { data: inserted, error } = await supabase
        .from("applications")
        .insert([payload as never])
        .select("id")
        .single();
      if (error) throw error;
      setDone(inserted!.id);
      toast({ title: "Application submitted", description: "You'll hear from us soon." });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast({ title: "Submission failed", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container py-20">
          <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-elegant">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-9 w-9 text-success" />
            </div>
            <h1 className="font-display text-3xl font-bold text-primary">Application Received!</h1>
            <p className="mt-3 text-muted-foreground">
              Thank you for applying to the CampusWin Scholarship. Our team will review your
              application and contact you via your provided email/phone within a few days.
            </p>
            <div className="mt-6 rounded-xl bg-secondary/60 p-4 text-sm">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Reference ID</div>
              <div className="mt-1 font-mono text-primary">{done.slice(0, 8).toUpperCase()}</div>
            </div>
            <Button onClick={() => navigate("/")} className="mt-8 bg-gold text-accent-foreground shadow-gold hover:opacity-95">
              Back to home
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <SiteHeader />
      <main className="container py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <GraduationCap className="h-3.5 w-3.5" /> Tech Scholarship Application
            </div>
            <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
              CampusWin Tech Scholarship
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Step {step} of {STEPS.length} · {STEPS[step - 1].label}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-xs text-muted-foreground">
              Get trained in a high-demand tech skill and earn a <strong className="text-primary">professional certificate</strong> on completion.
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-8 flex items-center gap-1.5">
            {STEPS.map((s) => (
              <div key={s.id} className="flex-1">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    s.id <= step ? "bg-gold" : "bg-border"
                  }`}
                />
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-card p-6 shadow-elegant md:p-10">
            {step === 1 && (
              <div className="space-y-5 animate-fade-up">
                <SectionTitle title="Personal Information" />
                <Field label="Full Name" required error={errors.full_name?.message}>
                  <Input {...register("full_name")} placeholder="Surname First, then other names" />
                </Field>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Date of Birth">
                    <Input type="date" {...register("date_of_birth")} />
                  </Field>
                  <Field label="Gender">
                    <Select value={watch("gender")} onValueChange={(v) => setValue("gender", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="State of Origin">
                    <Select value={watch("state_of_origin")} onValueChange={(v) => setValue("state_of_origin", v)}>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {NIGERIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="State of Residence">
                    <Select value={watch("state_of_residence")} onValueChange={(v) => setValue("state_of_residence", v)}>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {NIGERIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field label="Home Address">
                  <Input {...register("home_address")} placeholder="Street, area, city" />
                </Field>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Institution / University" required error={errors.institution?.message}>
                    <Input {...register("institution")} placeholder="e.g. University of Lagos" />
                  </Field>
                  <Field label="Course of Study (in school)">
                    <Input {...register("course_of_study")} placeholder="e.g. Computer Science" />
                  </Field>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <Field label="Current Level" required error={errors.current_level?.message}>
                    <Select value={watch("current_level")} onValueChange={(v) => setValue("current_level", v, { shouldValidate: true })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {["100L","200L","300L","400L","500L","600L","Final Year","Recent Graduate","NYSC","Other"].map(l => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Matric / Student ID">
                    <Input {...register("matric_number")} />
                  </Field>
                  <Field label="Expected Graduation Year">
                    <Input {...register("expected_graduation")} placeholder="e.g. 2026" />
                  </Field>
                </div>

                <div className="rounded-xl border-2 border-accent/40 bg-accent/5 p-5">
                  <SectionTitle
                    title="Choose Your Tech Program"
                    subtitle="Pick the track you want to be trained in. A professional certificate is issued on completion."
                  />
                  <div className="mt-4">
                    <Field label="Tech Program" required error={errors.tech_program?.message}>
                      <Select
                        value={watch("tech_program")}
                        onValueChange={(v) => setValue("tech_program", v, { shouldValidate: true })}
                      >
                        <SelectTrigger><SelectValue placeholder="Select a tech program" /></SelectTrigger>
                        <SelectContent className="max-h-72">
                          {TECH_PROGRAMS.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fade-up">
                <SectionTitle title="Contact Details" />
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Phone Number" required error={errors.phone?.message}>
                    <Input {...register("phone")} placeholder="08012345678" />
                  </Field>
                  <Field label="WhatsApp Number">
                    <Input {...register("whatsapp")} placeholder="If different from phone" />
                  </Field>
                </div>
                <Field label="Email Address" required error={errors.email?.message}>
                  <Input type="email" {...register("email")} placeholder="you@example.com" />
                </Field>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Instagram Handle">
                    <Input {...register("instagram_handle")} placeholder="@username" />
                  </Field>
                  <Field label="X (Twitter) Handle">
                    <Input {...register("twitter_handle")} placeholder="@username" />
                  </Field>
                </div>
                <Field label="Other Social (TikTok / LinkedIn / Facebook)">
                  <Input {...register("other_social")} />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fade-up">
                <SectionTitle title="Financial Background" subtitle="Please answer honestly. There are no wrong answers." />

                <Field label="Who currently sponsors your education?">
                  <Select value={watch("sponsor")} onValueChange={(v) => setValue("sponsor", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Parents / Guardians">Parents / Guardians</SelectItem>
                      <SelectItem value="Personal income / Side hustle">Personal income / Side hustle</SelectItem>
                      <SelectItem value="Scholarship / Bursary">Scholarship / Bursary</SelectItem>
                      <SelectItem value="Relative / Sponsor">Relative / Sponsor</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                {watch("sponsor") === "Other" && (
                  <Field label="Please specify">
                    <Input {...register("sponsor_other")} />
                  </Field>
                )}

                <Field label="How would you describe your current financial situation?">
                  <RadioGroup
                    value={watch("financial_situation") || ""}
                    onValueChange={(v) => setValue("financial_situation", v)}
                    className="space-y-2"
                  >
                    {[
                      "Very tight — I struggle to afford training programs",
                      "Manageable — I can afford small commitments only",
                      "Comfortable — but I value opportunities like this",
                    ].map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 hover:border-accent/50">
                        <RadioGroupItem value={opt} className="mt-0.5" />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </Field>

                <Field label="Are you currently engaged in any income-generating activity?">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="income"
                      checked={watch("income_activity")}
                      onCheckedChange={(c) => setValue("income_activity", Boolean(c))}
                    />
                    <Label htmlFor="income" className="cursor-pointer font-normal">Yes, I do</Label>
                  </div>
                </Field>

                {watch("income_activity") && (
                  <Field label="Briefly describe">
                    <Textarea rows={3} {...register("income_description")} />
                  </Field>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 animate-fade-up">
                <SectionTitle title="Your Motivation" subtitle="This is your moment. Be honest, be real, be ambitious." />
                <Field label="Why do you deserve the CampusWin Scholarship?" required error={errors.why_deserve?.message}>
                  <Textarea rows={6} {...register("why_deserve")} placeholder="100–200 words. Tell us your story." />
                </Field>
                <Field label="What are your top goals for the next 12 months?">
                  <Textarea rows={4} {...register("top_goals")} placeholder="One per line is fine." />
                </Field>
                <Field label="How will this scholarship change your story?">
                  <Textarea rows={4} {...register("story_impact")} />
                </Field>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5 animate-fade-up">
                <SectionTitle title="Your Commitment" />
                <Field label="What specific actions will you take to make the most of this opportunity?" required error={errors.commitment_actions?.message}>
                  <Textarea rows={5} {...register("commitment_actions")} />
                </Field>
                <Field label="Hours per week you can commit to the program" required error={errors.weekly_hours?.message}>
                  <RadioGroup
                    value={watch("weekly_hours")}
                    onValueChange={(v) => setValue("weekly_hours", v, { shouldValidate: true })}
                    className="grid gap-2 md:grid-cols-3"
                  >
                    {["3 – 5 hours", "6 – 10 hours", "More than 10 hours"].map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:border-accent/50">
                        <RadioGroupItem value={opt} />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </Field>
                <Field label="After completing the program, how will you give back?">
                  <Textarea rows={4} {...register("give_back_plan")} />
                </Field>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-5 animate-fade-up">
                <SectionTitle title="Declaration & Agreement" />
                <div className="rounded-xl border-2 border-accent/40 bg-accent/5 p-5 text-sm leading-relaxed">
                  <p className="font-semibold text-primary">By submitting this application, I confirm that:</p>
                  <ul className="mt-3 space-y-2 list-disc pl-5 text-foreground/85">
                    <li>All information I have provided is true, accurate, and complete.</li>
                    <li>I understand that the full value of the tech training program is <strong>₦150,000</strong>, of which CampusWin sponsors <strong>₦147,000 (98%)</strong>.</li>
                    <li>I willingly accept responsibility to pay the <strong>₦3,000</strong> commitment fee if selected, and that this fee is <strong>non-refundable</strong>.</li>
                    <li>I understand that a <strong>professional Certificate of Completion</strong> is issued only after I complete the program requirements and assessments.</li>
                    <li>I will attend classes, complete assignments, and conduct myself with integrity throughout the cohort.</li>
                    <li>I agree to all CampusWin Tech Scholarship Terms & Conditions.</li>
                    <li>I consent to CampusWin contacting me through the details provided and using my testimonials and success stories for promotional purposes.</li>
                  </ul>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <Checkbox
                    id="agree"
                    checked={watch("declaration_accepted") === true}
                    onCheckedChange={(c) => setValue("declaration_accepted", (c === true) as true, { shouldValidate: true })}
                  />
                  <Label htmlFor="agree" className="cursor-pointer text-sm font-medium leading-snug">
                    I have read, understood, and agree to the declaration above.
                  </Label>
                </div>
                {errors.declaration_accepted?.message && (
                  <p className="text-sm text-destructive">{errors.declaration_accepted.message}</p>
                )}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button type="button" variant="ghost" onClick={prev} disabled={step === 1 || submitting}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              {step < STEPS.length ? (
                <Button type="button" onClick={next} className="bg-primary text-primary-foreground hover:bg-primary-glow">
                  Continue <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={submitting} className="bg-gold font-semibold text-accent-foreground shadow-gold hover:opacity-95">
                  {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="border-b border-border pb-4">
    <h2 className="font-display text-xl font-bold text-primary">{title}</h2>
    {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
  </div>
);

const Field = ({
  label, required, error, children,
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-foreground">
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

export default Apply;
