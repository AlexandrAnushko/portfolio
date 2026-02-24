import { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "portfolio-app",
    title: "Portfolio App",
    description:
      "A full-stack portfolio built with Next.js 15, Prisma, and Tailwind CSS featuring auth and task management.",
    fullDescription:
      "This portfolio application showcases my work as a full-stack developer. It includes JWT-based authentication, a fully functional task manager with calendar view, and a projects showcase. Built with Next.js 15 App Router, Prisma ORM with PostgreSQL, Tailwind CSS, and Ant Design components.",
    image: "https://picsum.photos/seed/portfolio/800/500",
    tags: ["Next.js", "Prisma", "Tailwind CSS", "PostgreSQL", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "e-commerce-store",
    title: "E-Commerce Store",
    description:
      "A modern online store with product listings, cart, and Stripe payment integration.",
    fullDescription:
      "A fully featured e-commerce platform with product catalog, search and filtering, shopping cart with persistent state, Stripe checkout integration, order history, and an admin dashboard for managing products and orders. Built with React, Node.js, Express, MongoDB, and Stripe.",
    image: "https://picsum.photos/seed/ecommerce/800/500",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "real-time-chat",
    title: "Real-Time Chat App",
    description:
      "A real-time messaging application with rooms, private DMs, and online presence indicators.",
    fullDescription:
      "A real-time chat application powered by Socket.io. Features include public and private chat rooms, direct messaging, online/offline presence indicators, message history, file sharing, and emoji reactions. Built with React, Socket.io, Node.js, and Redis for pub/sub.",
    image: "https://picsum.photos/seed/chat/800/500",
    tags: ["React", "Socket.io", "Node.js", "Redis", "WebSockets"],
    githubUrl: "https://github.com",
  },
  {
    id: "ai-image-generator",
    title: "AI Image Generator",
    description:
      "A web app that generates images from text prompts using OpenAI's DALL-E API.",
    fullDescription:
      "An AI-powered image generation application that leverages OpenAI's DALL-E API to create stunning images from natural language prompts. Features include prompt history, image gallery, download in multiple resolutions, social sharing, and a community showcase of public generations.",
    image: "https://picsum.photos/seed/ai/800/500",
    tags: ["Next.js", "OpenAI API", "Tailwind CSS", "TypeScript", "Vercel"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "task-management",
    title: "Task Management Dashboard",
    description:
      "A Kanban-style project management tool with drag-and-drop, labels, and team collaboration.",
    fullDescription:
      "A collaborative task management dashboard inspired by Trello and Linear. Provides Kanban boards with drag-and-drop support, sprint planning, label and priority system, file attachments, team member assignment, productivity analytics, and real-time collaboration via WebSockets.",
    image: "https://picsum.photos/seed/tasks/800/500",
    tags: ["React", "DnD Kit", "TypeScript", "Zustand", "Supabase"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description:
      "A beautiful weather app with hourly forecasts, radar maps, and location search.",
    fullDescription:
      "A comprehensive weather dashboard that provides current conditions, hourly and 7-day forecasts, interactive radar maps, air quality index, UV index, and severe weather alerts. Supports location search, GPS auto-detection, and saved favorite locations. Powered by OpenWeatherMap and Mapbox APIs.",
    image: "https://picsum.photos/seed/weather/800/500",
    tags: ["React", "OpenWeatherMap API", "Mapbox", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];
