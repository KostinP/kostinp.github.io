"use client";

import { useEffect } from "react";

export const SetHtmlLang = ({ locale }) => {
  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem("locale", locale);
  }, [locale]);

  return null;
};
