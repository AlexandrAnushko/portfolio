import PageLayout from "@/shared/components/layouts/PageLayout";
import { Link } from "@/shared/components/Link";
import { ROUTES } from "@/shared/constants/routes";

const SECTIONS = [
  {
    title: "Projects",
    description:
      "A showcase of my professional work — from email marketing platforms to mobile social networks.",
    href: ROUTES.PROJECTS,
  },
  {
    title: "Skills",
    description:
      "A detailed breakdown of my technical expertise across frontend, backend, and tooling.",
    href: ROUTES.SKILLS,
  },
  {
    title: "Task Manager",
    description:
      "A built-in productivity tool with calendar view, folder grouping, and full CRUD — available after registration.",
    href: ROUTES.TODOS,
  },
  {
    title: "Contact",
    description:
      "A contact form to reach out directly, plus links to my social profiles.",
    href: ROUTES.CONTACT,
  },
];

const TECHNOLOGIES = [
  { name: "Next.js 16", category: "Framework" },
  { name: "React 19", category: "UI Library" },
  { name: "TypeScript 5", category: "Language" },
  { name: "Tailwind CSS 4", category: "Styling" },
  { name: "Prisma 7", category: "ORM" },
  { name: "PostgreSQL", category: "Database" },
  { name: "NextAuth v4", category: "Authentication" },
  { name: "React Hook Form + Zod", category: "Forms & Validation" },
  { name: "Framer Motion", category: "Animations" },
  { name: "Jest + RTL", category: "Testing" },
];

export default function About() {
  return (
    <PageLayout id="about-page">
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-100 mb-3">
          About This Project
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
          A closer look at what this portfolio is, what it offers, and how it
          was built.
        </p>
      </div>

      {/* Purpose */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-neutral-100 mb-4">
          Purpose
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          This application serves as a personal portfolio to present my
          experience in web development. Beyond showcasing projects and skills,
          it includes a fully functional task management system — registered
          users can plan their day with a calendar view and organise tasks into
          folders. The goal is to demonstrate real-world full-stack capabilities
          in a single, cohesive product.
        </p>
      </section>

      {/* Sections */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-neutral-100 mb-6">
          Sections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="bg-asphalt p-6 rounded-xl border border-primary/30 hover:border-primary/50 transition-colors"
            >
              <h3 className="text-lg font-medium text-neutral-100 mb-2">
                {section.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {section.description}
              </p>
              <Link href={section.href} mode="text">
                Go to {section.title} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-100 mb-6">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECHNOLOGIES.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 bg-asphalt px-5 py-4 rounded-xl border border-primary/30 hover:border-primary/50 transition-colors"
            >
              <div>
                <p className="text-neutral-100 font-medium">{tech.name}</p>
                <p className="text-gray-500 text-xs">{tech.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
