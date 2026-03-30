import { SkillCategory } from "./types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Core",
    icon: "🖥️",
    skills: [
      { name: "React", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: "⚡",
    skills: [
      { name: "Next.js", level: 85 },
      { name: "React Native", level: 80 },
      { name: "Redux / RTK", level: 90 },
      { name: "React Query", level: 85 },
      { name: "Apollo GraphQL", level: 75 },
    ],
  },
  {
    title: "Styling & UI",
    icon: "🎨",
    skills: [
      { name: "Tailwind CSS", level: 92 },
      { name: "Styled Components", level: 85 },
      { name: "MUI", level: 80 },
      { name: "Ant Design", level: 78 },
      { name: "Responsive Design", level: 92 },
    ],
  },
  {
    title: "Backend & Databases",
    icon: "🗄️",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Prisma ORM", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "REST API", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 88 },
      { name: "Docker", level: 70 },
      { name: "CI/CD", level: 72 },
      { name: "Webpack / Vite", level: 80 },
      { name: "Jest / Testing Library", level: 82 },
    ],
  },
  {
    title: "Soft Skills",
    icon: "🤝",
    skills: [
      { name: "Code Reviews", level: 90 },
      { name: "Mentoring", level: 85 },
      { name: "Agile / Scrum", level: 88 },
      { name: "Technical Planning", level: 85 },
      { name: "Team Collaboration", level: 92 },
    ],
  },
];
