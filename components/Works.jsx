import { getLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProfile, getWorks } from "@/lib/content";
import { bulletListComponents } from "@/lib/mdx-components";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DownloadResume } from "./DownloadResume";

const Work = ({ title, period, company, description, achievements, achievementsLabel }) => (
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
      <MDXRemote source={description} components={bulletListComponents} />
      {achievements && achievements.trim() && (
        <div className="experience__achievements">
          <p className="experience__achievements-label">{achievementsLabel}</p>
          <MDXRemote source={achievements} components={bulletListComponents} />
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
              <Work key={work.title} {...work} achievementsLabel={sections.achievementsLabel} />
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
