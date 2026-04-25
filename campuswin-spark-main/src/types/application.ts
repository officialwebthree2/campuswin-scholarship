export type Application = {
  id: string;
  full_name: string;
  date_of_birth: string | null;
  gender: string | null;
  state_of_origin: string | null;
  state_of_residence: string | null;
  home_address: string | null;
  institution: string;
  course_of_study: string | null;
  tech_program: string | null;
  current_level: string | null;
  matric_number: string | null;
  expected_graduation: string | null;
  phone: string;
  whatsapp: string | null;
  email: string;
  instagram_handle: string | null;
  twitter_handle: string | null;
  other_social: string | null;
  sponsor: string | null;
  sponsor_other: string | null;
  financial_situation: string | null;
  income_activity: boolean | null;
  income_description: string | null;
  why_deserve: string | null;
  top_goals: string | null;
  story_impact: string | null;
  commitment_actions: string | null;
  weekly_hours: string | null;
  give_back_plan: string | null;
  declaration_accepted: boolean;
  status: "pending" | "shortlisted" | "selected" | "rejected";
  cohort: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export const STATUS_META: Record<Application["status"], { label: string; className: string }> = {
  pending:    { label: "Pending",    className: "bg-warning/15 text-warning border-warning/30" },
  shortlisted:{ label: "Shortlisted",className: "bg-primary/10 text-primary border-primary/30" },
  selected:   { label: "Selected",   className: "bg-success/15 text-success border-success/30" },
  rejected:   { label: "Rejected",   className: "bg-destructive/15 text-destructive border-destructive/30" },
};
