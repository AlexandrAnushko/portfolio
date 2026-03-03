import { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "portfolio-app",
    title: "Portfolio App",
    description:
      "A full-stack portfolio built with Next.js 16, Prisma ORM, and Tailwind CSS featuring information about myself and task management.",
    fullDescription:
      "This portfolio application showcases my work as a developer. It includes JWT-based authentication, a fully functional task manager with calendar view and the ability to group tasks into folders, and a projects showcase. Built using Next.js 16 App Router with the new feature - Cache Components, and also with Prisma ORM, PostgreSQL, Tailwind CSS and Ant Design components.",
    image: "/projects/portfolioApp.png",
    tags: ["Next.js", "Prisma", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    githubUrl: "https://github.com/AlexandrAnushko/portfolio",
    liveUrl: "https://portfolio-swart-psi-14.vercel.app",
  },
  {
    id: "email-marketing-platform",
    title: "Email marketing Platform",
    description:
      "An email marketing automation platform built on modern Headless CMS. Provides various cost calculators.",
    fullDescription:
      "An email marketing app that lets you easily calculate your marketing campaign costs. I built the app from scratch with my team. Participated in estimation and planning. Implemented UI blocks, admin panel, all pages, and performed migrations",
    image: "/projects/emailMarketing.png",
    tags: [
      "Next.js",
      "Payload CMS",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    liveUrl: "https://emailoctopus.com",
  },
  {
    id: "mobile-social-network",
    title: "Social network for motorcyclists",
    description:
      "A mobile social network where motorcyclists can help each other, communicate, and organize rides together.",
    fullDescription:
      "The app lets you find like-minded people, plan trips with friends, track upcoming motorcycle events, monitor your motorcycle's maintenance, and features chats and groups for communication, including an SOS alert if needed. I developed user interfaces, integrated Maps and Routing, a real-time Chat powered by Socket.io, Profile, Gallery, Infinite news feed, and published the app on Google Play.",
    image: "/projects/socialNetwork.jpg",
    tags: ["React Native", "TypeScript", "Socket.io", "Redux", "Geocoding API"],
  },
  {
    id: "laboratory-management-system",
    title: "Laboratory Management System",
    description:
      "Application for internal use in genetic laboratories. Simplifies the collection and storage of scientific data.",
    fullDescription:
      "An application with complex, highly nested tables, analytics and process automation. I collaborated with a large team to build new features, implement CRUD, and fix bugs.",
    image: "/projects/geneticLaboratory.webp",
    tags: ["React", "TypeScript", "Apollo GraphQL", "MUI"],
  },
  {
    id: "project-management",
    title: "Project Management Web App",
    description:
      "A Kanban-style project management tool with drag-and-drop, labels, and team collaboration.",
    fullDescription:
      "A collaborative task management dashboard similar to Jira. Provides Kanban boards with drag-and-drop support, sprint planning, label and priority system, file attachments, team member assignment, productivity analytics. Migrated legacy code to modern stack. Participated in estimation, mentoring, onboarding new developers and code reviews.",
    image: "/projects/projectManagement.jpg",
    tags: ["React", "Redux Toolkit", "TypeScript", "Styled Components"],
  },
  {
    id: "telephony-web-app",
    title: "Telephony Web App",
    description:
      "A Telephone line management system with call schema customization, analytics, and an admin panel.",
    fullDescription:
      "With this application, companies could set up different functions for incoming and outgoing calls. Built dynamic tree-based call flow diagrams with unlimited branching, editing, and deletion. Also developed dashboards and analytics.",
    image: "/projects/telephonyWebApp.webp",
    tags: ["React", "Reactflow", "RTK Query", "TypeScript", "Chart.js", "MUI"],
  },
];
