import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Calendar, GraduationCap, Save } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Application, STATUS_META } from "@/types/application";
import { toast } from "@/hooks/use-toast";

type Props = {
  application: Application | null;
  onClose: () => void;
  onStatusChange: (id: string, status: Application["status"]) => Promise<unknown> | void;
  onUpdate: (id: string, patch: Partial<Application>) => Promise<unknown> | void;
};

export const ApplicationDetailDialog = ({ application, onClose, onStatusChange, onUpdate }: Props) => {
  const [notes, setNotes] = useState("");
  const [cohort, setCohort] = useState("");

  useEffect(() => {
    setNotes(application?.admin_notes ?? "");
    setCohort(application?.cohort ?? "");
  }, [application]);

  if (!application) return null;
  const a = application;

  const saveAdmin = async () => {
    await onUpdate(a.id, { admin_notes: notes, cohort: cohort || null });
    toast({ title: "Saved", description: "Admin notes & cohort updated." });
  };

  return (
    <Dialog open={!!application} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="font-display text-2xl text-primary">{a.full_name}</DialogTitle>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {a.email}</span>
                <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {a.phone}</span>
                {a.state_of_residence && (
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {a.state_of_residence}</span>
                )}
              </div>
            </div>
            <Badge variant="outline" className={STATUS_META[a.status].className}>
              {STATUS_META[a.status].label}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="motivation">Motivation</TabsTrigger>
            <TabsTrigger value="commitment">Commitment</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <Section title="Personal Info">
              <Field label="Date of Birth">{a.date_of_birth ?? "—"}</Field>
              <Field label="Gender">{a.gender ?? "—"}</Field>
              <Field label="State of Origin">{a.state_of_origin ?? "—"}</Field>
              <Field label="State of Residence">{a.state_of_residence ?? "—"}</Field>
              <Field label="Home Address" full>{a.home_address ?? "—"}</Field>
            </Section>

            <Section title="Education & Program">
              <Field label="Institution">{a.institution}</Field>
              <Field label="Course of Study">{a.course_of_study ?? "—"}</Field>
              <Field label="Level">{a.current_level ?? "—"}</Field>
              <Field label="Matric / Student ID">{a.matric_number ?? "—"}</Field>
              <Field label="Expected Graduation">{a.expected_graduation ?? "—"}</Field>
              <Field label="Selected Tech Program" full>
                <span className="font-semibold text-accent">{a.tech_program ?? "—"}</span>
              </Field>
            </Section>

            <Section title="Contact & Social">
              <Field label="Phone">{a.phone}</Field>
              <Field label="WhatsApp">{a.whatsapp ?? "—"}</Field>
              <Field label="Email">{a.email}</Field>
              <Field label="Instagram">{a.instagram_handle ?? "—"}</Field>
              <Field label="Twitter / X">{a.twitter_handle ?? "—"}</Field>
              <Field label="Other Social">{a.other_social ?? "—"}</Field>
            </Section>

            <Section title="Financial Background">
              <Field label="Sponsor">{a.sponsor ?? "—"} {a.sponsor_other ? `(${a.sponsor_other})` : ""}</Field>
              <Field label="Situation">{a.financial_situation ?? "—"}</Field>
              <Field label="Income Activity">{a.income_activity ? "Yes" : "No"}</Field>
              <Field label="Income Description" full>{a.income_description ?? "—"}</Field>
            </Section>
          </TabsContent>

          <TabsContent value="motivation" className="space-y-4 pt-4">
            <LongText title="Why they deserve it" text={a.why_deserve} />
            <LongText title="Top goals (next 12 months)" text={a.top_goals} />
            <LongText title="How this scholarship will change their story" text={a.story_impact} />
          </TabsContent>

          <TabsContent value="commitment" className="space-y-4 pt-4">
            <LongText title="Commitment actions" text={a.commitment_actions} />
            <Field label="Weekly hours">{a.weekly_hours ?? "—"}</Field>
            <LongText title="Give-back plan" text={a.give_back_plan} />
            <div className="rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
              <Calendar className="mr-1 inline h-3.5 w-3.5" />
              Submitted {new Date(a.created_at).toLocaleString()} · Last updated {new Date(a.updated_at).toLocaleString()}
            </div>
          </TabsContent>

          <TabsContent value="manage" className="space-y-5 pt-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Set status</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {(Object.keys(STATUS_META) as Application["status"][]).map((s) => (
                  <Button
                    key={s}
                    variant={a.status === s ? "default" : "outline"}
                    size="sm"
                    className={a.status === s ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => onStatusChange(a.id, s)}
                  >
                    {STATUS_META[s].label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="cohort" className="text-xs uppercase tracking-wider text-muted-foreground">Cohort</Label>
              <Input
                id="cohort"
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                placeholder="e.g. Cohort 2025-Q2"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-xs uppercase tracking-wider text-muted-foreground">Admin notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Internal notes about this applicant…"
                className="mt-1.5"
              />
            </div>

            <Button onClick={saveAdmin} className="bg-gold font-semibold text-accent-foreground shadow-gold hover:opacity-95">
              <Save className="mr-1.5 h-4 w-4" /> Save changes
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-4">
    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
      <GraduationCap className="h-3.5 w-3.5" /> {title}
    </div>
    <div className="grid gap-3 md:grid-cols-2">{children}</div>
  </div>
);

const Field = ({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="mt-0.5 text-sm text-foreground">{children}</div>
  </div>
);

const LongText = ({ title, text }: { title: string; text: string | null }) => (
  <div className="rounded-xl border border-border bg-card p-4">
    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{title}</div>
    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{text || "—"}</p>
  </div>
);
