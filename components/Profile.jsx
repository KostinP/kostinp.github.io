import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ThemeOptions } from "./ThemeOptions";

export const Profile = async () => {
  const t = await getTranslations("profile");

  return (
    <section className="home" id="home">
      <div className="home__container section bd-grid">
        <div className="home__data bd-grid">
          <Image
            src={t("image")}
            alt={t("imageAlt")}
            className="home__img"
            width={120}
            height={120}
          />
          <h1 className="home__title">
            <strong>{t("name")}</strong>
          </h1>
          <h3 className="home__profession">{t("ocupation")}</h3>
        </div>

        <div className="home__address bd-grid">
          <span className="home__information">
            <i className="bx bx-map home__icon" /> {t("location")}
          </span>
          <span className="home__information">
            <i className="bx bx-envelope home__icon" /> {t("email")}
          </span>
          <span className="home__information">
            <i className="bx bx-phone home__icon" /> {t("telephone")}
          </span>
        </div>
      </div>
      <ThemeOptions />
    </section>
  );
};
