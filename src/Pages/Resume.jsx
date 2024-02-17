import React, { useState, useEffect } from "react";

import { Profile } from "../Components/Profile";
import { Academic } from "../Components/Academic";
import { Skills } from "../Components/Skills";
import { Projects } from "../Components/Projects";
import { Works } from "../Components/Works";
import { SocialMedia } from "../Components/SocialMedia";
import { AboutMe } from "../Components/AboutMe";
import { Menu } from "../Components/Menu";
import { SEO } from "../Components/SEO";

import { Data as dataSchema } from "../Schemas/Data";
import { Data as dataSchemaRU } from "../Schemas/DataRU";
import { Menu as menuSchema } from "../Schemas/Menu";
import { useLanguage } from "../Hooks/useLanguage";

export const ResumeContent = ({schema}) => {
  const { profile, aboutMe, skills, socialMedia, experience } = schema;
  return (
    <>
      <SEO  {...profile} {...aboutMe} />
      {!matches && <Menu {...menuSchema} />}
      <main className="l-main bd-container" id="bd-container">
        <div className="resume" id="area-cv">
          <div className="resume__left">
            <Profile {...profile} />
            <AboutMe {...aboutMe} />
            <Skills {...skills} />
            <SocialMedia {...socialMedia} />
          </div>
          <div className="resume__right">
            <Works {...experience} {...useLanguage()} />
            <Academic {...experience} />
            <Projects {...experience} />
          </div>
        </div>
      </main>
    </>
  );
}

export const Resume = () => {
  const query = "(min-width: 968px)";
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches]);

  const { language, setLanguage } = useLanguage()

  // useEffect(() => {
  //   if (language === 'EN')
  //   {
  //     return <h1>Hello!</h1>
  //   }

  //   const { profile, aboutMe, skills, socialMedia, experience } = dataSchema;

  //   return (
  //     <>
  //     <SEO  {...profile} {...aboutMe} />
  //     {!matches && <Menu {...menuSchema} />}
  //     <main className="l-main bd-container" id="bd-container">
  //       <div className="resume" id="area-cv">
  //         <div className="resume__left">
  //           <Profile {...profile} />
  //           <AboutMe {...aboutMe} />
  //           <Skills {...skills} />
  //           <SocialMedia {...socialMedia} />
  //         </div>
  //         <div className="resume__right">
  //           <Works {...experience} />
  //           <Academic {...experience} />
  //           <Projects {...experience} />
  //         </div>
  //       </div>
  //     </main>
  //   </>    
  //   );
  // }, [language])

  if (language === 'EN')
  {
    const { profile, aboutMe, skills, socialMedia, experience } = dataSchema;

    return (
      <>
      <SEO  {...profile} {...aboutMe} />
      {!matches && <Menu {...menuSchema} />}
      <main className="l-main bd-container" id="bd-container">
        <div className="resume" id="area-cv">
          <div className="resume__left">
            <Profile {...profile} />
            <AboutMe {...aboutMe} />
            <Skills {...skills} />
            <SocialMedia {...socialMedia} />
          </div>
          <div className="resume__right">
            <Works {...experience} {...useLanguage()} />
            <Academic {...experience} />
            <Projects {...experience} />
          </div>
        </div>
      </main>
    </>    
    );
  }
  else
  {
    const { profile, aboutMe, skills, socialMedia, experience } = dataSchemaRU;

    return (
      <>
      <SEO  {...profile} {...aboutMe} />
      {!matches && <Menu {...menuSchema} />}
      <main className="l-main bd-container" id="bd-container">
        <div className="resume" id="area-cv">
          <div className="resume__left">
            <Profile {...profile} />
            <AboutMe {...aboutMe} />
            <Skills {...skills} />
            <SocialMedia {...socialMedia} />
          </div>
          <div className="resume__right">
          <Works {...experience} {...useLanguage()} />
            <Academic {...experience} />
            <Projects {...experience} />
          </div>
        </div>
      </main>
    </>    
    );
  }
};
