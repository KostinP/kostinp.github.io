import { getLocale } from "next-intl/server";
import { getProfile } from "@/lib/content";

const Social = ({ label, url, icon }) => (
  <a href={url} target="_blank" rel="noreferrer" className="social__link">
    <i className={`bx ${icon} social__icon`}></i> {label}
  </a>
);

export const SocialMedia = async () => {
  const locale = await getLocale();
  const { socialMedia, sectionVisibility } = await getProfile(locale);

  if (!sectionVisibility.socialMedia) return null;

  return (
    <section className="social section">
      <p className="eyebrow">{socialMedia.eyebrow}</p>
      <h2 className="section-title">{socialMedia.label}</h2>
      <div className="social__container bd-grid">
        {socialMedia.social.map((item) => (
          <Social key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
};
