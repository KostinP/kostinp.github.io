import { getTranslations } from "next-intl/server";

export const AboutMe = async () => {
  const t = await getTranslations("aboutMe");

  return (
    <section className="profile section" id="profile">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h2 className="section-title">{t("label")}</h2>
      <p className="profile__description">{t("description")}</p>
    </section>
  );
};
