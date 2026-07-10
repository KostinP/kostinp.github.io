import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import YAML from "yaml";

// One-off migration: converts the old messages/*.json resume content into
// the Keystatic-managed content/ tree (singletons + MDX collections). Not
// part of the normal build; safe to delete once the content has been
// reviewed in Keystatic.
const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const contentDir = path.join(root, "content");

const locales = {
  en: JSON.parse(fs.readFileSync(path.join(root, "messages/en.json"), "utf8")),
  ru: JSON.parse(fs.readFileSync(path.join(root, "messages/ru.json"), "utf8")),
};

// Shared slugs across locales so an EN/RU pair represents the same entry.
const workSlugs = ["fullstack-developer", "programming-teacher"];
const academicSlugs = ["herzen-university", "spbu"];
const projectSlugs = ["university-helper", "digital-office", "office-map"];

function writeMdx(filePath, frontmatter, bodyLines, { asList = true } = {}) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const body = asList
    ? bodyLines.map((line) => `- ${line}`).join("\n")
    : bodyLines.join("\n\n");
  const content = `---\n${YAML.stringify(frontmatter)}---\n${body}\n`;
  fs.writeFileSync(filePath, content);
}

function writeYaml(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, YAML.stringify(data));
}

for (const [locale, data] of Object.entries(locales)) {
  // Singleton: content/resume/<locale>.yaml
  writeYaml(path.join(contentDir, "resume", `${locale}.yaml`), {
    meta: data.meta,
    profile: {
      name: data.profile.name,
      ocupation: data.profile.ocupation,
      location: data.profile.location,
      email: data.profile.email,
      telephone: data.profile.telephone,
      image: data.profile.image,
      downloadCta: data.profile.downloadCta,
    },
    aboutMe: data.aboutMe,
    skills: data.skills,
    socialMedia: data.socialMedia,
    sections: data.sections,
  });

  data.experience.works.forEach((work, i) => {
    writeMdx(
      path.join(contentDir, "works", locale, `${workSlugs[i]}.mdx`),
      { title: work.title, order: i + 1, period: work.period, company: work.company },
      work.description
    );
  });

  data.experience.academic.forEach((entry, i) => {
    writeMdx(
      path.join(contentDir, "academic", locale, `${academicSlugs[i]}.mdx`),
      { career: entry.career, order: i + 1, date: entry.date },
      [entry.institution],
      { asList: false }
    );
  });

  data.experience.projects.forEach((project, i) => {
    writeMdx(
      path.join(contentDir, "projects", locale, `${projectSlugs[i]}.mdx`),
      { name: project.name, order: i + 1, company: project.company, period: project.period },
      project.description
    );
  });
}

console.log("Migrated messages/*.json content into content/.");
