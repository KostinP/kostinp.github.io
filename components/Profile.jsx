import Image from "next/image";
import { getLocale } from "next-intl/server";
import { getResume } from "@/lib/content";
import { ThemeOptions } from "./ThemeOptions";

export const Profile = async ({ showControls = true }) => {
  const locale = await getLocale();
  const { profile } = await getResume(locale);

  return (
    <section className="home" id="home">
      <div className="home__container section bd-grid">
        <div className="home__data bd-grid">
          <Image
            src={profile.image}
            alt={profile.name}
            className="home__img"
            width={120}
            height={120}
          />
          <h1 className="home__title">
            <strong>{profile.name}</strong>
          </h1>
          <h3 className="home__profession">{profile.ocupation}</h3>
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
