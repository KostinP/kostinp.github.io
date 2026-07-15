import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import YAML from "yaml";

// One-off migration: adds languages/hobbies/courses + section-visibility
// toggles to the resume singleton. Not part of the normal build.
const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const contentDir = path.join(root, "content");

const sectionVisibility = {
  aboutMe: true,
  skills: true,
  languages: true,
  socialMedia: true,
  experience: true,
  education: true,
  courses: true,
  projects: true,
  hobbies: true,
};

const data = {
  en: {
    sections: { courses: "Courses", coursesEyebrow: "GET /courses", hobbies: "Hobbies", hobbiesEyebrow: "// hobbies" },
    languages: {
      eyebrow: "$ lang --list",
      label: "Languages",
      items: [
        { name: "Russian", level: "Native", dots: 7, totalDots: 7 },
        { name: "English", level: "B1 Intermediate", dots: 4, totalDots: 7 },
      ],
    },
    hobbies: { items: ["Guitar", "Singing", "Growing flowers"] },
    courses: { items: [] },
  },
  ru: {
    sections: { courses: "Курсы", coursesEyebrow: "GET /courses", hobbies: "Хобби", hobbiesEyebrow: "// hobbies" },
    languages: {
      eyebrow: "$ lang --list",
      label: "Языки",
      items: [
        { name: "Русский", level: "Native", dots: 7, totalDots: 7 },
        { name: "Английский", level: "B1 Intermediate", dots: 4, totalDots: 7 },
      ],
    },
    hobbies: { items: ["Гитара", "Пение", "Выращивание цветов"] },
    courses: { items: [] },
  },
};

for (const locale of ["en", "ru"]) {
  const filePath = path.join(contentDir, "resume", `${locale}.yaml`);
  const resume = YAML.parse(fs.readFileSync(filePath, "utf8"));

  resume.sections = { ...resume.sections, ...data[locale].sections };
  resume.languages = data[locale].languages;
  resume.hobbies = data[locale].hobbies;
  resume.courses = data[locale].courses;
  resume.sectionVisibility = sectionVisibility;

  fs.writeFileSync(filePath, YAML.stringify(resume));
}

console.log("Migrated content/ to include languages, hobbies, courses, and section visibility toggles.");
