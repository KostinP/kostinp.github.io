import { getLocale } from "next-intl/server";
import { getProfile } from "@/lib/content";

const Language = ({ name, level, dots, totalDots }) => (
  <li className="languages__item">
    <div className="languages__name-row">
      <span>{name}</span>
      <span className="languages__level">{level}</span>
    </div>
    <div className="languages__dots">
      {Array.from({ length: totalDots }, (_, i) => (
        <span
          key={i}
          className={i < dots ? "languages__dot languages__dot--filled" : "languages__dot"}
        />
      ))}
    </div>
  </li>
);

export const Languages = async () => {
  const locale = await getLocale();
  const { languages, sectionVisibility } = await getProfile(locale);

  if (!sectionVisibility.languages || languages.items.length === 0) return null;

  return (
    <section className="languages section">
      <p className="eyebrow">{languages.eyebrow}</p>
      <h2 className="section-title">{languages.label}</h2>
      <ul className="languages__data">
        {languages.items.map((lang) => (
          <Language key={lang.name} {...lang} />
        ))}
      </ul>
    </section>
  );
};
