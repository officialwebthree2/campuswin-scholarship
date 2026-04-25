import { z } from "zod";

export const applicationSchema = z.object({
  // Personal
  full_name: z.string().trim().min(2, "Full name is required").max(120),
  date_of_birth: z.string().optional().or(z.literal("")),
  gender: z.string().optional().or(z.literal("")),
  state_of_origin: z.string().optional().or(z.literal("")),
  state_of_residence: z.string().optional().or(z.literal("")),
  home_address: z.string().max(300).optional().or(z.literal("")),
  institution: z.string().trim().min(2, "Institution is required").max(200),
  course_of_study: z.string().max(150).optional().or(z.literal("")),
  current_level: z.string().min(1, "Required").max(50),
  matric_number: z.string().max(50).optional().or(z.literal("")),
  expected_graduation: z.string().max(20).optional().or(z.literal("")),
  tech_program: z.string().trim().min(2, "Please select a tech program").max(100),

  // Contact
  phone: z.string().trim().min(7, "Phone is required").max(25),
  whatsapp: z.string().max(25).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(150),
  instagram_handle: z.string().max(80).optional().or(z.literal("")),
  twitter_handle: z.string().max(80).optional().or(z.literal("")),
  other_social: z.string().max(120).optional().or(z.literal("")),

  // Financial
  sponsor: z.string().optional().or(z.literal("")),
  sponsor_other: z.string().max(150).optional().or(z.literal("")),
  financial_situation: z.string().optional().or(z.literal("")),
  income_activity: z.boolean().default(false),
  income_description: z.string().max(400).optional().or(z.literal("")),

  // Motivation
  why_deserve: z.string().trim().min(40, "Tell us at least a few sentences").max(2000),
  top_goals: z.string().max(1000).optional().or(z.literal("")),
  story_impact: z.string().max(1500).optional().or(z.literal("")),

  // Commitment
  commitment_actions: z.string().trim().min(20, "Required").max(1500),
  weekly_hours: z.string().min(1, "Required"),
  give_back_plan: z.string().max(1000).optional().or(z.literal("")),

  // Declaration
  declaration_accepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the declaration to apply" }),
  }),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
