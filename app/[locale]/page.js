import { getTranslations, setRequestLocale } from "next-intl/server";
import { Menu } from "@/components/Menu";
import { Profile } from "@/components/Profile";
import { AboutMe } from "@/components/AboutMe";
import { Skills } from "@/components/Skills";
import { SocialMedia } from "@/components/SocialMedia";
import { Works } from "@/components/Works";
import { Academic } from "@/components/Academic";
import { Projects } from "@/components/Projects";

export default async function ResumePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const menu = t.raw("menu");

  return (
    <>
      <Menu menu={menu} />
      <main className="l-main bd-container" id="bd-container">
        <div className="resume" id="area-cv">
          <div className="resume__left">
            <Profile />
            <AboutMe />
            <Skills />
            <SocialMedia />
          </div>
          <div className="resume__right">
            <Works />
            <Academic />
            <Projects />
          </div>
        </div>
      </main>
    </>
  );
}
