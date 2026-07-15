import { getLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProfile, getAcademic } from "@/lib/content";
import { proseSpanComponents } from "@/lib/mdx-components";

const Academy = ({ career, date, institution, degree }) => (
  <div className="education__content">
    <div className="education__time">
      <span className="education__rounder"></span>
      <span className="education__line"></span>
    </div>
    <div className="education__data bd-grid">
      <h3 className="education__title">{career}</h3>
      <span className="education__year">{date}</span>
      <MDXRemote source={institution} components={proseSpanComponents} />
      {degree && <span className="education__degree">{degree}</span>}
    </div>
  </div>
);

export const Academic = async () => {
  const locale = await getLocale();
  const [{ sections, sectionVisibility }, academic] = await Promise.all([
    getProfile(locale),
    getAcademic(locale),
  ]);

  if (!sectionVisibility.education) return null;

  return (
    <section className="academic-experience section" id="education">
      <p className="eyebrow">{sections.educationEyebrow}</p>
      <h2 className="section-title">{sections.education}</h2>
      <div className="education__container bd-grid">
        {academic.map((academy) => (
          <Academy key={academy.career} {...academy} />
        ))}
      </div>
    </section>
  );
};
