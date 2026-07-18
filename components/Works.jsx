import { getLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProfile, getWorks } from "@/lib/content";
import { bulletListComponents, achievementListComponents } from "@/lib/mdx-components";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DownloadResume } from "./DownloadResume";

const Work = ({
  title,
  period,
  company,
  skills,
  relatedProjects,
  description,
  achievements,
  achievementsLabel,
  projectsLabel,
}) => (
  <div className="experience__content">
    <div className="experience__time">
      <span className="experience__rounder"></span>
      <span className="experience__line"></span>
    </div>
    <div className="experience__data bd-grid">
      <h3 className="experience__title">{title}</h3>
      <span className="experience__company">
        {period} | {company}
      </span>
      {skills.length > 0 && (
        <ul className="skill-tag-list experience__skills">
          {skills.map((skill) => (
            <li key={skill} className="skill-tag">{skill}</li>
          ))}
        </ul>
      )}
      <MDXRemote source={description} components={bulletListComponents} />
      {achievements && achievements.trim() && (
        <div className="experience__achievements">
          <p className="experience__achievements-label">{achievementsLabel}</p>
          <MDXRemote source={achievements} components={achievementListComponents} />
        </div>
      )}
      {relatedProjects.length > 0 && (
        <div className="experience__related-projects">
          <p className="experience__achievements-label">{projectsLabel}</p>
          <ul className="experience__related-projects-list">
            {relatedProjects.map((project) => (
              <li key={project.href}>
                <a href={project.href} className="experience__related-project-link">
                  {project.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export const Works = async ({ focus, showControls = true }) => {
  const locale = await getLocale();
  const [{ sections, sectionVisibility }, works] = await Promise.all([
    getProfile(locale),
    getWorks(locale, focus),
  ]);

  return (
    <div className="work">
      {sectionVisibility.experience && works.length > 0 && (
        <section className="work-experience section" id="experience">
          <p className="eyebrow">{sections.experienceEyebrow}</p>
          <h2 className="section-title">{sections.experience}</h2>
          <div className="experience__container bd-grid">
            {works.map((work) => (
              <Work
                key={work.title}
                {...work}
                achievementsLabel={sections.achievementsLabel}
                projectsLabel={sections.projects}
              />
            ))}
          </div>
        </section>
      )}
      {showControls && (
        <div className="header-actions">
          <DownloadResume focus={focus} />
          <LanguageSwitcher />
        </div>
      )}
    </div>
  );
};
