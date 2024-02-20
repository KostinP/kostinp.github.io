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

import { Data as dataSchema_EN } from "../Schemas/Data";
import { Data as dataSchema_RU } from "../Schemas/DataRU";
import { Menu as menuSchema_EN } from "../Schemas/Menu";
import { Menu as menuSchema_RU } from "../Schemas/MenuRU";
import { useLanguage } from "../Hooks/useLanguage";

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
  const [ dataSchema, setDataSchema ] = useState(dataSchema_EN)
  const [ menuSchema, setMenuSchema ] = useState(menuSchema_EN)

  //let { profile, aboutMe, skills, socialMedia, experience } = dataSchema_RU;

  useEffect(() => {
    if (language === 'EN')
    {
      setDataSchema(dataSchema_EN)
      setMenuSchema(menuSchema_EN)
    }
    else
    {
      setDataSchema(dataSchema_RU)
      setMenuSchema(menuSchema_RU)
    }
  }, [language])

  return (
    <>
    <SEO name={dataSchema.profile.name} ocupation={dataSchema.profile.ocupation} description={dataSchema.aboutMe.description} />
    {!matches && <Menu {...menuSchema} />}
    <main className="l-main bd-container" id="bd-container">
      <div className="resume" id="area-cv">
        <div className="resume__left">
          <Profile {...dataSchema.profile} />
          <AboutMe {...dataSchema.aboutMe} />
          <Skills {...dataSchema.skills} />
          <SocialMedia {...dataSchema.socialMedia} />
        </div>
        <div className="resume__right">
          <Works works={dataSchema.experience.works} language={language} setLanguage={setLanguage} />
          <Academic {...dataSchema.experience} />
          <Projects {...dataSchema.experience} />
        </div>
      </div>
    </main>
  </>    
  );
};
