import { getTranslations } from "next-intl/server";

const Academy = ({ career, date, institution }) => (
  <div className="education__content">
    <div className="education__time">
      <span className="education__rounder"></span>
      <span className="education__line"></span>
    </div>
    <div className="education__data bd-grid">
      <h3 className="education__title">{career}</h3>
      <span className="education__year">{date}</span>
      <span className="education__studies">{institution}</span>
    </div>
  </div>
);

export const Academic = async () => {
  const t = await getTranslations();
  const academic = t.raw("experience.academic");

  return (
    <section className="academic-experience section" id="education">
      <h2 className="section-title">{t("sections.education")}</h2>
      <div className="education__container bd-grid">
        {academic.map((academy) => (
          <Academy key={academy.institution} {...academy} />
        ))}
      </div>
    </section>
  );
};
