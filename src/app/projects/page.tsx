import { ProjectCard } from "@/features/projects/ProjectCard";
import { PROJECTS } from "@/features/projects/projectsData";
import { DownloadCVButton } from "@/features/projects/DownloadCVButton";

export default function MyProjects() {
  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-10">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-100 mb-3">
            Some of my Projects
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg">
            A collection of things I&apos;ve built — click any card to learn
            more.
          </p>
        </div>
        <DownloadCVButton />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isPriority={index < 6}
          />
        ))}
      </div>
    </main>
  );
}
