import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import YAML from "yaml";

// One-off migration: restructures content/ from the single-pitch schema to
// the focus-aware schema (shared profile/skills + pitchFullstack/Backend/
// Frontend + focuses tags on works/projects). Not part of the normal build.
const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const contentDir = path.join(root, "content");

const ALL_FOCUSES = ["fullstack", "backend", "frontend"];

// Hand-tagged relevance per skill: which focus pages it should appear on.
const skillFocuses = {
  "C#": ["fullstack", "backend"],
  Unity: ["fullstack"],
  EntityFramework: ["fullstack", "backend"],
  LINQ: ["fullstack", "backend"],
  RabbitMQ: ["fullstack", "backend"],
  NUnit: ["fullstack", "backend"],
  Swagger: ["fullstack", "backend"],
  Postman: ["fullstack", "backend"],
  React: ["fullstack", "frontend"],
  "React-native": ["fullstack", "frontend"],
  Blender: ["fullstack"],
  Photoshop: ["fullstack"],
  Illustrator: ["fullstack"],
  InDesign: ["fullstack"],
  SQL: ["fullstack", "backend"],
  Docker: ["fullstack", "backend"],
  Linux: ["fullstack", "backend"],
  Git: ["fullstack", "backend", "frontend"],
};

function readYaml(p) {
  return YAML.parse(fs.readFileSync(p, "utf8"));
}

function writeYaml(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, YAML.stringify(data));
}

function taggedSkills(names) {
  return names.map((name) => ({ name, focuses: skillFocuses[name] ?? ALL_FOCUSES }));
}

const pitchCopy = {
  en: {
    fullstack: {
      meta: {
        title: "Pavel Kostin - FullStack Software Developer",
        description: "Fullstack programmer and designer proficient in many development tools.",
      },
      ocupation: "FullStack Software Developer",
      aboutMe: {
        eyebrow: "// about",
        label: "About me",
        description: "Fullstack programmer and designer proficient in many development tools.",
      },
    },
    backend: {
      meta: {
        title: "Pavel Kostin - Backend Developer",
        description: "Backend developer building APIs, services and the infrastructure around them.",
      },
      ocupation: "Backend Software Developer",
      aboutMe: {
        eyebrow: "// about",
        label: "About me",
        description:
          "Backend-focused engineer building reliable APIs and services: C#, Entity Framework, SQL Server, message queues, and the infrastructure around them.",
      },
    },
    frontend: {
      meta: {
        title: "Pavel Kostin - Frontend Developer",
        description: "Frontend developer building interfaces with React, backed by a design background.",
      },
      ocupation: "Frontend Software Developer",
      aboutMe: {
        eyebrow: "// about",
        label: "About me",
        description:
          "Frontend-focused engineer building interfaces with React, from component libraries to 3D visualizations — plus a design background that keeps the details tight.",
      },
    },
  },
  ru: {
    fullstack: {
      meta: {
        title: "Павел Костин - FullStack Software Developer",
        description: "Получил смешанное образование, поэтому могу и программировать и заниматься дизайном интерфейсов.",
      },
      ocupation: "FullStack Software Developer",
      aboutMe: {
        eyebrow: "// about",
        label: "Обо мне",
        description: "Получил смешанное образование, поэтому могу и программировать и заниматься дизайном интерфейсов.",
      },
    },
    backend: {
      meta: {
        title: "Павел Костин - Backend Developer",
        description: "Backend-разработчик: API, сервисы и инфраструктура вокруг них.",
      },
      ocupation: "Backend Software Developer",
      aboutMe: {
        eyebrow: "// about",
        label: "Обо мне",
        description:
          "Бэкенд-разработчик: пишу надёжные API и сервисы на C#, Entity Framework, SQL Server, работаю с очередями сообщений и инфраструктурой вокруг них.",
      },
    },
    frontend: {
      meta: {
        title: "Павел Костин - Frontend Developer",
        description: "Frontend-разработчик: интерфейсы на React и дизайнерский бэкграунд.",
      },
      ocupation: "Frontend Software Developer",
      aboutMe: {
        eyebrow: "// about",
        label: "Обо мне",
        description:
          "Frontend-разработчик: собираю интерфейсы на React — от библиотек компонентов до 3D-визуализаций, — а дизайнерский бэкграунд помогает не терять детали.",
      },
    },
  },
};

for (const locale of ["en", "ru"]) {
  const old = readYaml(path.join(contentDir, "resume", `${locale}.yaml`));

  writeYaml(path.join(contentDir, "resume", `${locale}.yaml`), {
    profile: {
      name: old.profile.name,
      location: old.profile.location,
      email: old.profile.email,
      telephone: old.profile.telephone,
      image: old.profile.image,
      downloadCta: old.profile.downloadCta,
    },
    skills: {
      eyebrowHard: old.skills.eyebrowHard,
      eyebrowSoft: old.skills.eyebrowSoft,
      technicalLabel: old.skills.technicalLabel,
      softLabel: old.skills.softLabel,
      technicalSkills: taggedSkills(old.skills.technicalSkills),
      softSkills: taggedSkills(old.skills.softSkills),
    },
    socialMedia: old.socialMedia,
    sections: old.sections,
    pitchFullstack: pitchCopy[locale].fullstack,
    pitchBackend: pitchCopy[locale].backend,
    pitchFrontend: pitchCopy[locale].frontend,
  });
}

// --- works & projects: add focuses + hand-written per-focus overrides ---

function readMdx(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  return { frontmatter: YAML.parse(match[1]), body: match[2].replace(/\n$/, "") };
}

function writeMdx(filePath, frontmatter, body) {
  fs.writeFileSync(filePath, `---\n${YAML.stringify(frontmatter)}---\n${body}\n`);
}

const bulletList = (lines) => lines.map((l) => `- ${l}`).join("\n");

const workOverrides = {
  "fullstack-developer": {
    focuses: ALL_FOCUSES,
    backend: {
      en: [
        "Backend (C#, Entity Framework, SQL Server, NUnit, Swagger, RabbitMQ (MassTransit), ImageSharp, NuGet, GitHub Actions, Docker) developer.",
        "Adapting the legacy React-native application for new tasks.",
        "Maintaining technical documentation.",
      ],
      ru: [
        "Backend (C#, Entity Framework, SQL Server, NUnit, Swagger, RabbitMQ (MassTransit), ImageSharp, NuGet, GitHub Actions, Docker) developer.",
        "Адаптировал легаси React-native проект под новые задачи.",
        "Занимался написанием технической документации.",
      ],
    },
    frontend: {
      en: [
        "Frontend (React, Storybook, Three.js, Material UI) developer.",
        "Adapting the legacy React-native application for new tasks.",
        "Maintaining technical documentation.",
      ],
      ru: [
        "Frontend (React, Storybook, Three.js, Material UI) developer.",
        "Адаптировал легаси React-native проект под новые задачи.",
        "Занимался написанием технической документации.",
      ],
    },
  },
  "programming-teacher": {
    focuses: ["fullstack"],
    backend: null,
    frontend: null,
  },
};

const projectOverrides = {
  "university-helper": {
    focuses: ALL_FOCUSES,
    backend: {
      en: [
        "Microservice architecture",
        "Server stack: C#, Entity Framework, SQL Server, NUnit, Postman, Swagger, RabbitMQ (MassTransit), ImageSharp, NuGet, GitHub Actions",
        "Student assistant consisting of a server, website, mobile application, computer application, integrated with the Herzen University system",
      ],
      ru: [
        "Микросервисная архитектура",
        "Backend: C#, Entity Framework, SQL Server, NUnit, Postman, Swagger, RabbitMQ (MassTransit), ImageSharp, NuGet, GitHub Actions",
        "Помощник для студента, который состоит из backend и мобильного приложения, интегрирован с системой университета",
      ],
    },
    frontend: {
      en: [
        "Microservice architecture",
        "Website stack: React, i18next, storybook",
        "Student assistant consisting of a server, website, mobile application, computer application, integrated with the Herzen University system",
      ],
      ru: [
        "Микросервисная архитектура",
        "Сайт: React, i18next, storybook",
        "Помощник для студента, который состоит из backend и мобильного приложения, интегрирован с системой университета",
      ],
    },
  },
  "digital-office": { focuses: ["fullstack", "backend"], backend: null, frontend: null },
  "office-map": { focuses: ["fullstack", "backend"], backend: null, frontend: null },
};

function migrateCollection(name, overrides) {
  for (const locale of ["en", "ru"]) {
    const dir = path.join(contentDir, name, locale);
    for (const file of fs.readdirSync(dir)) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const { frontmatter, body } = readMdx(filePath);
      const override = overrides[slug];

      writeMdx(
        filePath,
        { ...frontmatter, focuses: override?.focuses ?? ALL_FOCUSES },
        body
      );

      // descriptionBackend / descriptionFrontend are inline mdx fields, so
      // they live in the frontmatter, not the file body. Rewrite the file
      // once more with them included (YAML.stringify needs the full object).
      const full = readMdx(filePath);
      writeMdx(
        filePath,
        {
          ...full.frontmatter,
          descriptionBackend: override?.backend ? bulletList(override.backend[locale]) : "",
          descriptionFrontend: override?.frontend ? bulletList(override.frontend[locale]) : "",
        },
        full.body
      );
    }
  }
}

migrateCollection("works", workOverrides);
migrateCollection("projects", projectOverrides);

console.log("Migrated content/ to the focus-aware schema.");
