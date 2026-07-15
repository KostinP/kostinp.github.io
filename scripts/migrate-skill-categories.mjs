import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import YAML from "yaml";

// One-off migration: adds a "category" (design/programming/teaching) to
// every existing hard skill, adds the newly requested skills, and adds
// achievementsLabel + skills.categoryLabels. Not part of the normal build.
const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const contentDir = path.join(root, "content");

// category + extra focuses for skills that already exist.
const existingSkillMeta = {
  "C#": { category: "programming" },
  Unity: { category: "programming" },
  EntityFramework: { category: "programming" },
  LINQ: { category: "programming" },
  RabbitMQ: { category: "programming" },
  NUnit: { category: "programming" },
  Swagger: { category: "programming" },
  Postman: { category: "programming" },
  React: { category: "programming" },
  "React-native": { category: "programming" },
  Blender: { category: "design" },
  Photoshop: { category: "design", addFocuses: ["frontend"] },
  Illustrator: { category: "design", addFocuses: ["frontend"] },
  InDesign: { category: "design", addFocuses: ["frontend"] },
  SQL: { category: "programming" },
  Docker: { category: "programming" },
  Linux: { category: "programming" },
  Git: { category: "programming" },
  "Unreal Engine": { category: "programming" },
  Scratch: { category: "programming" },
  "Kodu Game Lab": { category: "programming" },
};

// New skills: [nameEn, nameRu, category, focuses]
const newSkills = [
  // design
  ["Figma", "Figma", "design", ["fullstack", "frontend"]],
  ["Infographics", "Инфографика", "design", ["fullstack"]],
  ["Typography", "Типографика", "design", ["fullstack"]],
  ["Composition", "Композиция", "design", ["fullstack"]],
  ["AI tools", "Нейросети", "design", ["fullstack"]],
  ["After Effects", "After Effects", "design", ["fullstack"]],
  ["SEO Basics", "Основы SEO", "design", ["fullstack", "frontend"]],
  // programming
  ["HTML", "HTML", "programming", ["fullstack", "frontend"]],
  ["CSS", "CSS", "programming", ["fullstack", "frontend"]],
  ["JavaScript", "JavaScript", "programming", ["fullstack", "frontend"]],
  ["Go", "Go", "programming", ["fullstack", "backend"]],
  [".NET", ".NET", "programming", ["fullstack", "backend"]],
  ["Next.js", "Next.js", "programming", ["fullstack", "frontend"]],
  ["Tailwind", "Tailwind", "programming", ["fullstack", "frontend"]],
  ["TypeScript", "TypeScript", "programming", ["fullstack", "frontend"]],
  ["Responsive Layout", "Адаптивная верстка", "programming", ["fullstack", "frontend"]],
  ["Cross-browser Layout", "Кроссбраузерная верстка", "programming", ["fullstack", "frontend"]],
  ["GitLab", "GitLab", "programming", ["fullstack", "backend", "frontend"]],
  ["GitHub", "GitHub", "programming", ["fullstack", "backend", "frontend"]],
  ["Kubernetes", "Kubernetes", "programming", ["fullstack", "backend"]],
  ["nginx", "nginx", "programming", ["fullstack", "backend"]],
  ["REST", "REST", "programming", ["fullstack", "backend"]],
  ["CI/CD", "CI/CD", "programming", ["fullstack", "backend"]],
  ["SOLID", "SOLID", "programming", ["fullstack", "backend"]],
  ["KISS", "KISS", "programming", ["fullstack", "backend", "frontend"]],
  ["DRY", "DRY", "programming", ["fullstack", "backend", "frontend"]],
  ["Normalization", "Нормализация", "programming", ["fullstack", "backend"]],
  ["Flexbox", "Flexbox", "programming", ["fullstack", "frontend"]],
  ["Grid", "Grid", "programming", ["fullstack", "frontend"]],
  // teaching
  ["Assessment Materials Design", "Разработка ФОС", "teaching", ["teacher"]],
  ["Thesis Supervision", "Руководство ВКР", "teaching", ["teacher"]],
  ["Public Speaking", "Публичные выступления", "teaching", ["teacher"]],
  ["Student Mentoring", "Менторинг студентов", "teaching", ["teacher"]],
  ["Curriculum Design", "Рабочие программы", "teaching", ["teacher"]],
  ["Moodle", "Moodle", "teaching", ["teacher"]],
];

const categoryLabels = {
  en: { design: "Design", programming: "Programming", teaching: "Teaching" },
  ru: { design: "Дизайнерские", programming: "Программистские", teaching: "Преподавательские" },
};

const achievementsLabel = { en: "Achievements", ru: "Достижения" };

for (const locale of ["en", "ru"]) {
  const filePath = path.join(contentDir, "resume", `${locale}.yaml`);
  const resume = YAML.parse(fs.readFileSync(filePath, "utf8"));

  resume.skills.technicalSkills = resume.skills.technicalSkills.map((skill) => {
    const meta = existingSkillMeta[skill.name];
    if (!meta) return skill; // shouldn't happen, but don't drop unknown entries
    const focuses = meta.addFocuses
      ? [...new Set([...skill.focuses, ...meta.addFocuses])]
      : skill.focuses;
    return { ...skill, category: meta.category, focuses };
  });

  resume.skills.technicalSkills.push(
    ...newSkills.map(([nameEn, nameRu, category, focuses]) => ({
      name: locale === "en" ? nameEn : nameRu,
      category,
      focuses,
    }))
  );

  resume.skills.categoryLabels = categoryLabels[locale];
  resume.sections.achievementsLabel = achievementsLabel[locale];

  fs.writeFileSync(filePath, YAML.stringify(resume));
}

// --- every existing work entry needs the new "achievements" key ---

function readMdx(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  return { frontmatter: YAML.parse(match[1]), body: match[2].replace(/\n$/, "") };
}

function writeMdx(filePath, frontmatter, body) {
  fs.writeFileSync(filePath, `---\n${YAML.stringify(frontmatter)}---\n${body}\n`);
}

for (const locale of ["en", "ru"]) {
  const dir = path.join(contentDir, "works", locale);
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const { frontmatter, body } = readMdx(filePath);
    if ("achievements" in frontmatter) continue;
    writeMdx(filePath, { ...frontmatter, achievements: "" }, body);
  }
}

console.log("Migrated content/ with skill categories, new skills, and achievements field.");
