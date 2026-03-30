"use client";

import { SkillCategory as SkillCategoryType } from "./types";

interface Props {
  category: SkillCategoryType;
}

export const SkillCategory = ({ category }: Props) => {
  return (
    <div className="bg-dark-bg border border-white/10 rounded-2xl p-6 hover:border-primary/40 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{category.icon}</span>
        <h2 className="text-xl font-semibold text-white">{category.title}</h2>
      </div>

      <div className="space-y-4">
        {category.skills.map((skill) => (
          <div key={skill.name} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">{skill.name}</span>
              <span className="text-primary text-sm font-medium">
                {skill.level}%
              </span>
            </div>
            <div className="h-2 bg-asphalt rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-primary to-primary-hover rounded-full transition-all duration-1000"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
