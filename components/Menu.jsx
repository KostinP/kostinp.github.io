"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const Menu = ({ menu }) => {
  const t = useTranslations("nav");
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState(menu[0]?.section.slice(1));

  useEffect(() => {
    const sections = menu
      .map(({ section }) => document.getElementById(section.slice(1)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [menu]);

  return (
    <header className="l-header" id="header">
      <nav className="nav bd-container">
        <span className="nav__logo">{t("logo")}</span>
        <div className={show ? "nav__menu show-menu" : "nav__menu"} id="nav-menu">
          <ul className="nav__list">
            {menu.map(({ label, section, icon }) => (
              <li className="nav__item" key={label}>
                <a
                  className={
                    activeSection === section.slice(1)
                      ? "nav__link active-link"
                      : "nav__link"
                  }
                  href={section}
                  onClick={() => setShow(false)}
                >
                  <i className={`bx ${icon} nav__icon`} /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav__toggle" id="nav-toggle" onClick={() => setShow((prev) => !prev)}>
          <i className="bx bx-grid-alt" />
        </div>
      </nav>
    </header>
  );
};
