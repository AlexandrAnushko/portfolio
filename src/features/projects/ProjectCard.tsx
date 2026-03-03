"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  isPriority?: boolean;
}

export const ProjectCard = ({
  project,
  isPriority = false,
}: ProjectCardProps) => {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <Link
      href={`/projects/${project.id}`}
      onClick={() => setIsNavigating(true)}
      className="
        group relative flex flex-col rounded-2xl overflow-hidden
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-700
        shadow-md
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500
        active:scale-[0.97] active:shadow-sm active:translate-y-0
        cursor-pointer
      "
    >
      {/* Loading overlay */}
      {isNavigating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="text-sm font-medium text-white">Loading…</span>
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading={isPriority ? "eager" : "lazy"}
          priority={isPriority}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-snug">
          {project.title}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full
                bg-blue-50 text-blue-700
                dark:bg-blue-950 dark:text-blue-300
                border border-blue-100 dark:border-blue-800"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* View project arrow */}
        <div className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 mt-1 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200">
          View project
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
