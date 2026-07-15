import { getLocale } from "next-intl/server";
import { getProfile } from "@/lib/content";

export const Hobbies = async () => {
  const locale = await getLocale();
  const { hobbies, sections, sectionVisibility } = await getProfile(locale);

  if (!sectionVisibility.hobbies || hobbies.items.length === 0) return null;

  return (
    <section className="hobbies section">
      <p className="eyebrow">{sections.hobbiesEyebrow}</p>
      <h2 className="section-title">{sections.hobbies}</h2>
      <ul className="skills__data">
        {hobbies.items.map((hobby) => (
          <li key={hobby} className="skills__name">
            <span className="skills__circle" /> {hobby}
          </li>
        ))}
      </ul>
    </section>
  );
};
