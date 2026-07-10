import { getLocale } from "next-intl/server";
import { getResume } from "@/lib/content";

const Skill = ({ skill }) => (
  <li className="skills__name">
    <span className="skills__circle" /> {skill}
  </li>
);

export const Skills = async () => {
  const locale = await getLocale();
  const { skills } = await getResume(locale);

  return (
    <>
      <section className="technical-skills section" id="skills">
        <p className="eyebrow">{skills.eyebrowHard}</p>
        <h2 className="section-title">{skills.technicalLabel}</h2>
        <div className="skills__content bd-grid">
          <ul className="skills__data">
            {skills.technicalSkills.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </ul>
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
