import { getLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProfile, getProjects } from "@/lib/content";
import { bulletListComponents, achievementListComponents } from "@/lib/mdx-components";

const Project = ({
  anchor,
  name,
  company,
  period,
  year,
  link,
  image,
  skills,
  description,
  achievements,
  achievementsLabel,
}) => (
  <div className="experience__content" id={anchor}>
    <div className="experience__time">
      <span className="experience__rounder"></span>
      <span className="experience__line"></span>
    </div>
    <div className="experience__data bd-grid">
      <h3 className="experience__title">
        {year && <span className="experience__year-badge">{year}</span>}
        {name} - {company}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="experience__link"
            aria-label={link}
          >
            <i className="bx bx-link-external" />
          </a>
        )}
      </h3>
      {period && <span className="experience__project">{period}</span>}
      {skills.length > 0 && (
        <ul className="skill-tag-list experience__skills">
          {skills.map((skill) => (
            <li key={skill} className="skill-tag project-tag">{skill}</li>
          ))}
        </ul>
      )}
      {image ? (
        <div className="project-media" tabIndex={0}>
          {/* eslint-disable-next-line @next/next/no-img-element -- unoptimized static export; natural aspect ratio, full width */}
          <img src={image} alt={name} className="project-media__image" />
          <div className="project-media__reveal">
            <MDXRemote source={description} components={bulletListComponents} />
            {achievements && achievements.trim() && (
              <div className="experience__achievements">
                <p className="experience__achievements-label">{achievementsLabel}</p>
                <MDXRemote source={achievements} components={achievementListComponents} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <MDXRemote source={description} components={bulletListComponents} />
          {achievements && achievements.trim() && (
            <div className="experience__achievements">
              <p className="experience__achievements-label">{achievementsLabel}</p>
              <MDXRemote source={achievements} components={achievementListComponents} />
            </div>
          )}
        </>
      )}
    </div>
  </div>
);

export const Projects = async ({ focus }) => {
  const locale = await getLocale();
  const [{ sections, sectionVisibility }, projects] = await Promise.all([
    getProfile(locale),
    getProjects(locale, focus),
  ]);

  if (!sectionVisibility.projects || projects.length === 0) return null;

  return (
    <section className="projects-experience section" id="projects">
      <p className="eyebrow">{sections.projectsEyebrow}</p>
      <h2 className="section-title">{sections.projects}</h2>
      <div className="experience__container bd-grid">
        {projects.map((project) => (
          <Project key={project.slug} {...project} achievementsLabel={sections.achievementsLabel} />
        ))}
      </div>
    </section>
  );
};
