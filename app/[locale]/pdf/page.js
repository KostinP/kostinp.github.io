import { setRequestLocale } from "next-intl/server";
import { Profile } from "@/components/Profile";
import { AboutMe } from "@/components/AboutMe";
import { Skills } from "@/components/Skills";
import { SocialMedia } from "@/components/SocialMedia";
import { Works } from "@/components/Works";
import { Academic } from "@/components/Academic";
import { Projects } from "@/components/Projects";

export default async function ResumePdfPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="l-main bd-container" id="bd-container">
      <div className="resume" id="area-cv">
        <div className="resume__left">
          <Profile showControls={false} />
          <AboutMe />
          <Skills />
          <SocialMedia />
        </div>
        <div className="resume__right">
          <Works showControls={false} />
          <Academic />
          <Projects />
        </div>
      </div>
    </main>
  );
}
