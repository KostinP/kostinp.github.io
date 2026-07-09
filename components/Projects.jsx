import { getTranslations } from "next-intl/server";
import { Description } from "./Description";

const Project = ({ name, company, period, description }) => (
  <div className="experience__content">
    <div className="experience__time">
      <span className="experience__rounder"></span>
      <span className="experience__line"></span>
    </div>
    <div className="experience__data bd-grid">
      <h3 className="experience__title">
        {name} - {company}
      </h3>
      <span className="experience__project">{period}</span>
      {description.map((desc, i) => (
        <Description key={i} desc={desc} />
      ))}
    </div>
  </div>
);

export const Projects = async () => {
  const t = await getTranslations();
  const projects = t.raw("experience.projects");

  return (
    <section className="projects-experience section" id="projects">
      <p className="eyebrow">{t("sections.projectsEyebrow")}</p>
      <h2 className="section-title">{t("sections.projects")}</h2>
      <div className="experience__container bd-grid">
        {projects.map((project) => (
          <Project key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
};
