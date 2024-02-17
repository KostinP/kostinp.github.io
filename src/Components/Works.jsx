import React from "react";
import { Description } from "./Description";
import { Language } from "./Language";
import { useLanguage } from "../Hooks/useLanguage";
export const Works = ({ works, language, setLanguage }) => {

  return (
    <section className="home" id="home">
      <section className="work-experience section" id="experience">
        <h2 className="section-title">Experience</h2>
        <div className="experience__container bd-grid">
          {works.map((work) => (
            <Work key={work.company} {...work} />
          ))}
        </div>
      </section>
      <Language language={language} setLanguage={setLanguage}/>
    </section>
  );
};

const Work = ({ title, period, company, description }) => {
  return (
    <div className="experience__content">
      <div className="experience__time">
        <span className="experience__rounder"></span>
        <span className="experience__line"></span>
      </div>
      <div className="experience__data bd-grid">
        <h3 className="experience__title">{title}</h3>
        <span className="experience__company">
          {period} | {company}
        </span>
        {description.map((desc,i) => <Description  key={i} desc={desc}/>)}
      </div>
    </div>
  );
};
