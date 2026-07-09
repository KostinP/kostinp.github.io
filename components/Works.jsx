import { getTranslations } from "next-intl/server";
import { Description } from "./Description";
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
      {description.map((desc, i) => (
        <Description key={i} desc={desc} />
      ))}
    </div>
  </div>
);

export const Works = async ({ showControls = true }) => {
  const t = await getTranslations();
  const works = t.raw("experience.works");

  return (
    <div className="work">
      <section className="work-experience section" id="experience">
        <p className="eyebrow">{t("sections.experienceEyebrow")}</p>
        <h2 className="section-title">{t("sections.experience")}</h2>
        <div className="experience__container bd-grid">
          {works.map((work) => (
            <Work key={work.company} {...work} />
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
