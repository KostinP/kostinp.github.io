"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Snow } from "./Snow";

export const ThemeOptions = () => {
  const t = useTranslations("options");
  const [theme, setTheme] = useState("light");
  const [snow, setSnow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reads localStorage after mount so server and first client render match;
    // the resulting extra render is the standard SSR-safe hydration pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(localStorage.getItem("theme") || "light");
    setSnow(localStorage.getItem("snow") === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    localStorage.setItem("snow", String(snow));
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme, snow, mounted]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleSnow = () => setSnow((prev) => !prev);

  return (
    <div className="home__options">
      {theme === "dark" && (
        <i
          className="bx bx-cloud-snow enable-snow"
          title={t("enableSnow")}
          id="snow-button"
          onClick={toggleSnow}
        />
      )}
      {mounted && snow && theme === "dark" && <Snow />}
      <i
        className={`bx ${theme === "dark" ? "bx-sun" : "bx-moon"} change-theme`}
        title={t("toggleTheme")}
        id="theme-button"
        onClick={toggleTheme}
      />
    </div>
  );
};
