import { redirect } from "next/navigation";
import { getUserId } from "../actions/getUserId";
import { ROUTES } from "@/shared/constants/routes";
import { SKILL_CATEGORIES } from "@/features/skills/skillsData";
import { SkillCategory } from "@/features/skills/SkillCategory";

export default async function Skills() {
  const userId = await getUserId();
  if (!userId) redirect(ROUTES.ROOT);

  const totalSkills = SKILL_CATEGORIES.reduce(
    (acc, cat) => acc + cat.skills.length,
    0,
  );
  const avgLevel = Math.round(
    SKILL_CATEGORIES.flatMap((cat) => cat.skills).reduce(
      (acc, s) => acc + s.level,
      0,
    ) / totalSkills,
  );

  return (
    <main
      id="skills-page"
      className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20"
    >
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-100 mb-3">
          Technical Skills
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl">
          A comprehensive overview of my technical expertise across different
          areas of software development.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-asphalt p-6 rounded-xl border border-primary/30 hover:border-primary/50 transition-colors">
          <div className="text-primary text-3xl font-bold mb-1">
            {SKILL_CATEGORIES.length}
          </div>
          <p className="text-gray-400 text-sm">Skill Categories</p>
        </div>
        <div className="bg-asphalt p-6 rounded-xl border border-primary/30 hover:border-primary/50 transition-colors">
          <div className="text-primary text-3xl font-bold mb-1">
            {totalSkills}+
          </div>
          <p className="text-gray-400 text-sm">Technologies</p>
        </div>
        <div className="bg-asphalt p-6 rounded-xl border border-primary/30 hover:border-primary/50 transition-colors">
          <div className="text-primary text-3xl font-bold mb-1">
            {avgLevel}%
          </div>
          <p className="text-gray-400 text-sm">Average Proficiency</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((category) => (
          <SkillCategory key={category.title} category={category} />
        ))}
      </div>
    </main>
  );
}
