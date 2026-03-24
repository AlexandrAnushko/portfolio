import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "../projects/projectsData";

const someMyProjects = PROJECTS.slice(0, 3);

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-asphalt">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-primary text-center mb-4 tracking-wide uppercase">
          Projects
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and
          experience in web development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {someMyProjects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="group bg-dark-grey rounded-xl overflow-hidden border border-transparent hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={382}
                  height={192}
                  loading="eager"
                  className="w-auto h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark-grey to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
