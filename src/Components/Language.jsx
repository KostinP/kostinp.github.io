import React, { useState, useEffect } from "react";
import { useLanguage } from "../Hooks/useLanguage";

export const Language = ({ language, setLanguage } ) => {
  const _toggleLanguage = () => {
    language === "EN" ? setLanguage("RU") : setLanguage("EN");
  };

  return (
    <div className="language__options">
      <h1
        className="change-language"
        onClick={_toggleLanguage}
        id="language-button"
        >
          {language}
      </h1>
    </div>
  );
};
