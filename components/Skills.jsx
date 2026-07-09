import { getTranslations } from "next-intl/server";

const Skill = ({ skill }) => (
  <li className="skills__name">
    <span className="skills__circle" /> {skill}
  </li>
);

export const Skills = async () => {
  const t = await getTranslations("skills");
  const technicalSkills = t.raw("technicalSkills");
  const softSkills = t.raw("softSkills");

  return (
    <>
      <section className="technical-skills section" id="skills">
        <p className="eyebrow">{t("eyebrowHard")}</p>
        <h2 className="section-title">{t("technicalLabel")}</h2>
        <div className="skills__content bd-grid">
          <ul className="skills__data">
            {technicalSkills.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </ul>
        </div>
      </section>
      <section className="soft-skills section">
        <p className="eyebrow">{t("eyebrowSoft")}</p>
        <h2 className="section-title">{t("softLabel")}</h2>
        <div className="skills__content bd-grid">
          <ul className="skills__data">
            {softSkills.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
