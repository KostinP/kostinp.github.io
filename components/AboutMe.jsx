import { getLocale } from "next-intl/server";
import { getResume } from "@/lib/content";

export const AboutMe = async () => {
  const locale = await getLocale();
  const { aboutMe } = await getResume(locale);

  return (
    <section className="profile section" id="profile">
      <p className="eyebrow">{aboutMe.eyebrow}</p>
      <h2 className="section-title">{aboutMe.label}</h2>
      <p className="profile__description">{aboutMe.description}</p>
    </section>
  );
};
