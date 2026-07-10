import { getLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getResume, getProjects } from "@/lib/content";
import { bulletListComponents } from "@/lib/mdx-components";

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
      <MDXRemote source={description} components={bulletListComponents} />
    </div>
  </div>
);

export const Projects = async () => {
  const locale = await getLocale();
  const [{ sections }, projects] = await Promise.all([getResume(locale), getProjects(locale)]);

  return (
    <section className="projects-experience section" id="projects">
      <p className="eyebrow">{sections.projectsEyebrow}</p>
      <h2 className="section-title">{sections.projects}</h2>
      <div className="experience__container bd-grid">
        {projects.map((project) => (
          <Project key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
};
