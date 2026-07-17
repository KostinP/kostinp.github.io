import Image from "next/image";
import { getLocale } from "next-intl/server";
import { getProfile, getPitch } from "@/lib/content";
import { ThemeOptions } from "./ThemeOptions";
import { FocusSwitcher } from "./FocusSwitcher";

export const Profile = async ({ focus, showControls = true }) => {
  const locale = await getLocale();
  const [{ profile }, pitch] = await Promise.all([getProfile(locale), getPitch(locale, focus)]);

  // Явно проверяем showPhoto, по умолчанию true
  const shouldShowPhoto = profile.showPhoto !== false;

  return (
    <section className="home" id="home">
      <div className="home__container section bd-grid">
        <div className="home__data bd-grid">
          {shouldShowPhoto && profile.image && (
            <Image
              src={profile.image}
              alt={profile.name}
              className="home__img"
              width={120}
              height={120}
              priority
            />
          )}
          <h1 className="home__title">
            <strong>{profile.name}</strong>
          </h1>
          <h3 className="home__profession">{pitch.ocupation}</h3>
          {showControls && <FocusSwitcher focus={focus} />}
        </div>

        <div className="home__address bd-grid">
          <span className="home__information">
            <i className="bx bx-map home__icon" /> {profile.location}
          </span>
          <span className="home__information">
            <i className="bx bx-envelope home__icon" /> {profile.email}
          </span>
          <span className="home__information">
            <i className="bx bx-phone home__icon" /> {profile.telephone}
          </span>
        </div>
      </div>
      {showControls && <ThemeOptions />}
    </section>
  );
};