import { getLocale } from "next-intl/server";
import { getSkills, getProfile } from "@/lib/content";
import { SKILL_CATEGORIES } from "@/lib/skill-categories";

const Skill = ({ skill }) => (
  <li className="skills__name">
    <span className="skills__circle" /> {skill}
  </li>
);

const groupByCategory = (skills) =>
  SKILL_CATEGORIES.map((category) => ({
    category,
    skills: skills.filter((skill) => skill.category === category).map((skill) => skill.name),
  })).filter((group) => group.skills.length > 0);

export const Skills = async ({ focus }) => {
  const locale = await getLocale();
  const [{ sectionVisibility }, skills] = await Promise.all([
    getProfile(locale),
    getSkills(locale, focus),
  ]);

  if (!sectionVisibility.skills) return null;

  const categoryGroups = groupByCategory(skills.technicalSkills);

  return (
    <>
      <section className="technical-skills section" id="skills">
        <p className="eyebrow">{skills.eyebrowHard}</p>
        <h2 className="section-title">{skills.technicalLabel}</h2>
        <div className="skills__content bd-grid">
          {categoryGroups.map((group, i) => (
            <details key={group.category} className="skills__category" open={i === 0}>
              <summary className="skills__category-summary">
                {skills.categoryLabels[group.category]}
              </summary>
              <ul className="skills__data">
                {group.skills.map((skill) => (
                  <Skill key={skill} skill={skill} />
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
      <section className="soft-skills section">
        <p className="eyebrow">{skills.eyebrowSoft}</p>
        <h2 className="section-title">{skills.softLabel}</h2>
        <div className="skills__content bd-grid">
          <ul className="skills__data">
            {skills.softSkills.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
