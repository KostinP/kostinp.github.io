import { getLocale } from "next-intl/server";
import { getPitch, getProfile } from "@/lib/content";

export const AboutMe = async ({ focus }) => {
  const locale = await getLocale();
  const [{ sectionVisibility }, { aboutMe }] = await Promise.all([
    getProfile(locale),
    getPitch(locale, focus),
  ]);

  if (!sectionVisibility.aboutMe) return null;

  return (
    <section className="profile section" id="profile">
      <p className="eyebrow">{aboutMe.eyebrow}</p>
      <h2 className="section-title">{aboutMe.label}</h2>
      <p className="profile__description">{aboutMe.description}</p>
    </section>
  );
};
