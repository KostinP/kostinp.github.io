import { getLocale } from "next-intl/server";
import { getProfile } from "@/lib/content";

const Course = ({ name, provider, date }) => (
  <div className="education__content">
    <div className="education__time">
      <span className="education__rounder"></span>
      <span className="education__line"></span>
    </div>
    <div className="education__data bd-grid">
      <h3 className="education__title">{name}</h3>
      <span className="education__year">{date}</span>
      <span className="education__studies">{provider}</span>
    </div>
  </div>
);

export const Courses = async () => {
  const locale = await getLocale();
  const { courses, sections, sectionVisibility } = await getProfile(locale);

  if (!sectionVisibility.courses || courses.items.length === 0) return null;

  return (
    <section className="courses-experience section" id="courses">
      <p className="eyebrow">{sections.coursesEyebrow}</p>
      <h2 className="section-title">{sections.courses}</h2>
      <div className="education__container bd-grid">
        {courses.items.map((course) => (
          <Course key={course.name} {...course} />
        ))}
      </div>
    </section>
  );
};
