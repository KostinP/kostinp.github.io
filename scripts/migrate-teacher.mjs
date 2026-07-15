import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import YAML from "yaml";

// One-off migration: adds the "teacher" focus on top of the existing
// fullstack/backend/frontend schema. Not part of the normal build.
const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const contentDir = path.join(root, "content");

const pitchTeacher = {
  en: {
    meta: {
      title: "Pavel Kostin - Programming Teacher",
      description: "Programming teacher for kids: Unity, Blender, Unreal Engine, Scratch, and real code.",
    },
    ocupation: "Programming Teacher",
    aboutMe: {
      eyebrow: "// about",
      label: "About me",
      description:
        "I teach kids to program and build games — Unity, Blender, Unreal Engine, Scratch, and real code — turning complex tools into approachable, fun challenges.",
    },
  },
  ru: {
    meta: {
      title: "Павел Костин - Учитель программирования",
      description: "Учитель программирования для детей: Unity, Blender, Unreal Engine, Scratch и настоящий код.",
    },
    ocupation: "Учитель программирования",
    aboutMe: {
      eyebrow: "// about",
      label: "Обо мне",
      description:
        "Учу детей программировать и создавать игры — Unity, Blender, Unreal Engine, Scratch и настоящий код, — превращая сложные инструменты в понятные и увлекательные задачи.",
    },
  },
};

// New skills, grounded in what the "programming-teacher" work entry already
// states he trained kids in — not new claims, just surfaced as tags too.
const newTeacherSkills = ["Unreal Engine", "Scratch", "Kodu Game Lab"];
const alsoTagTeacher = ["Unity", "Blender"];

function readYaml(p) {
  return YAML.parse(fs.readFileSync(p, "utf8"));
}

function writeYaml(filePath, data) {
  fs.writeFileSync(filePath, YAML.stringify(data));
}

for (const locale of ["en", "ru"]) {
  const filePath = path.join(contentDir, "resume", `${locale}.yaml`);
  const resume = readYaml(filePath);

  resume.pitchTeacher = pitchTeacher[locale];

  resume.skills.technicalSkills = resume.skills.technicalSkills.map((skill) =>
    alsoTagTeacher.includes(skill.name) && !skill.focuses.includes("teacher")
      ? { ...skill, focuses: [...skill.focuses, "teacher"] }
      : skill
  );
  // Soft skills are generic professional traits, not role-specific: every
  // existing entry predates the "teacher" focus, so backfill it everywhere.
  resume.skills.softSkills = resume.skills.softSkills.map((skill) =>
    skill.focuses.includes("teacher") ? skill : { ...skill, focuses: [...skill.focuses, "teacher"] }
  );
  resume.skills.technicalSkills.push(
    ...newTeacherSkills.map((name) => ({ name, focuses: ["teacher"] }))
  );

  writeYaml(filePath, resume);
}

// --- tag the existing teaching job with the new focus ---

function readMdx(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  return { frontmatter: YAML.parse(match[1]), body: match[2].replace(/\n$/, "") };
}

function writeMdx(filePath, frontmatter, body) {
  fs.writeFileSync(filePath, `---\n${YAML.stringify(frontmatter)}---\n${body}\n`);
}

for (const locale of ["en", "ru"]) {
  const filePath = path.join(contentDir, "works", locale, "programming-teacher.mdx");
  const { frontmatter, body } = readMdx(filePath);
  writeMdx(
    filePath,
    { ...frontmatter, focuses: [...frontmatter.focuses, "teacher"], descriptionTeacher: "" },
    body
  );
}

// Every other work/project entry needs the new descriptionTeacher key too
// (empty = falls back to the default description).
for (const collection of ["works", "projects"]) {
  for (const locale of ["en", "ru"]) {
    const dir = path.join(contentDir, collection, locale);
    for (const file of fs.readdirSync(dir)) {
      if (collection === "works" && file === "programming-teacher.mdx") continue;
      const filePath = path.join(dir, file);
      const { frontmatter, body } = readMdx(filePath);
      if ("descriptionTeacher" in frontmatter) continue;
      writeMdx(filePath, { ...frontmatter, descriptionTeacher: "" }, body);
    }
  }
}

console.log("Migrated content/ to include the teacher focus.");
