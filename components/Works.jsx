import { getLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getResume, getWorks } from "@/lib/content";
import { bulletListComponents } from "@/lib/mdx-components";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DownloadResume } from "./DownloadResume";

const Work = ({ title, period, company, description }) => (
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
    </div>
  </div>
);

export const Works = async ({ showControls = true }) => {
  const locale = await getLocale();
  const [{ sections }, works] = await Promise.all([getResume(locale), getWorks(locale)]);

  return (
    <div className="work">
      <section className="work-experience section" id="experience">
        <p className="eyebrow">{sections.experienceEyebrow}</p>
        <h2 className="section-title">{sections.experience}</h2>
        <div className="experience__container bd-grid">
          {works.map((work) => (
            <Work key={work.title} {...work} />
          ))}
        </div>
      </section>
      {showControls && (
        <div className="header-actions">
          <DownloadResume />
          <LanguageSwitcher />
        </div>
      )}
    </div>
  );
};
