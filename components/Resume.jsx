import { getTranslations } from "next-intl/server";
import { Menu } from "./Menu";
import { Profile } from "./Profile";
import { AboutMe } from "./AboutMe";
import { Skills } from "./Skills";
import { Languages } from "./Languages";
import { SocialMedia } from "./SocialMedia";
import { Works } from "./Works";
import { Academic } from "./Academic";
import { Courses } from "./Courses";
import { Projects } from "./Projects";
import { Hobbies } from "./Hobbies";

export const Resume = async ({ focus, interactive = true }) => {
  const t = await getTranslations();
  const menu = t.raw("menu");

  return (
    <>
      {interactive && <Menu menu={menu} />}
      <main
        className={interactive ? "l-main bd-container" : "l-main bd-container pdf-layout"}
        id="bd-container"
      >
        <div className="resume" id="area-cv">
          <div className="resume__left">
            <Profile focus={focus} showControls={interactive} />
            <AboutMe focus={focus} />
            <Skills focus={focus} />
            <Languages />
            <SocialMedia />
          </div>
          <div className="resume__right">
            <Works focus={focus} showControls={interactive} />
            <Academic />
            <Courses />
            <Projects focus={focus} />
            <Hobbies />
          </div>
        </div>
      </main>
    </>
  );
};