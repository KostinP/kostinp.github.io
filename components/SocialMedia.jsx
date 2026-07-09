import { getTranslations } from "next-intl/server";

const Social = ({ label, url, icon }) => (
  <a href={url} target="_blank" rel="noreferrer" className="social__link">
    <i className={`bx ${icon} social__icon`}></i> {label}
  </a>
);

export const SocialMedia = async () => {
  const t = await getTranslations("socialMedia");
  const social = t.raw("social");

  return (
    <section className="social section">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h2 className="section-title">{t("label")}</h2>
      <div className="social__container bd-grid">
        {social.map((item) => (
          <Social key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
};
