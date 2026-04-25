export const TECH_PROGRAMS = [
  "Frontend Development",
  "Backend Development",
  "Full-Stack Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Product Design",
  "Data Analysis",
  "Data Science & Machine Learning",
  "Cybersecurity",
  "Cloud Computing & DevOps",
  "Project Management",
  "Product Management",
  "Digital Marketing",
  "Graphic Design",
  "Video Editing & Motion Graphics",
  "Artificial Intelligence (AI) Engineering",
  "Blockchain Development",
  "Quality Assurance & Software Testing",
] as const;

export type TechProgram = (typeof TECH_PROGRAMS)[number];
