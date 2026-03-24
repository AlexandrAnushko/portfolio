import { Link } from "@/shared/components/Link";
import { ROUTES } from "@/shared/constants/routes";

const skills = [
  { name: "React", level: 95 },
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Redux", level: 90 },
  { name: "HTML/CSS", level: 90 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Git", level: 88 },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-dark-grey">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-primary text-center mb-4 tracking-wide">
          TECHNICAL SKILLS
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          My expertise in modern web technologies and frameworks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white">{skill.name}</span>
                <span className="text-primary">{skill.level}%</span>
              </div>
              <div className="h-2 bg-asphalt rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-primary to-primary-hover rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-center my-12 max-w-2xl mx-auto">
          Click below to see a detailed list of all my skills.
        </p>
        <div className="flex justify-center">
          <Link href={ROUTES.SKILLS} mode="primary">
            View all
          </Link>
        </div>
      </div>
    </section>
  );
};
