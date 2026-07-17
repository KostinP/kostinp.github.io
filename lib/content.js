import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { FOCUSES } from "./focuses.js";
import { SUBCATEGORY_KEYS } from "./skill-subcategories.js";

export { FOCUSES };

const reader = createReader(process.cwd(), keystaticConfig);

const resumeSingletons = { en: reader.singletons.resumeEn, ru: reader.singletons.resumeRu };
const worksCollections = { en: reader.collections.worksEn, ru: reader.collections.worksRu };
const academicCollections = { en: reader.collections.academicEn, ru: reader.collections.academicRu };
const projectsCollections = { en: reader.collections.projectsEn, ru: reader.collections.projectsRu };

const pitchKey = {
  fullstack: "pitchFullstack",
  backend: "pitchBackend",
  frontend: "pitchFrontend",
  teacher: "pitchTeacher",
};
const overrideKey = {
  backend: "descriptionBackend",
  frontend: "descriptionFrontend",
  teacher: "descriptionTeacher",
};

function readResume(locale) {
  return resumeSingletons[locale].readOrThrow();
}

export async function getProfile(locale) {
  const resume = await readResume(locale);
  return {
    profile: {
      ...resume.profile,
      showPhoto: resume.profile.showPhoto !== false, // по умолчанию true
    },
    socialMedia: resume.socialMedia,
    sections: resume.sections,
    languages: resume.languages,
    hobbies: resume.hobbies,
    courses: resume.courses,
    sectionVisibility: resume.sectionVisibility,
  };
}

export async function getPitch(locale, focus) {
  const resume = await readResume(locale);
  return resume[pitchKey[focus]];
}

export async function getSkills(locale, focus) {
  const resume = await readResume(locale);
  const inFocus = (list) => list.filter((skill) => skill.focuses.includes(focus));

  const subcategoryLabels = resume.skills.subcategoryLabels || {};
  const subcategoryLabelMap = {};
  Object.keys(subcategoryLabels).forEach(key => {
    const value = Object.keys(SUBCATEGORY_KEYS).find(v => SUBCATEGORY_KEYS[v] === key);
    if (value) {
      subcategoryLabelMap[value] = subcategoryLabels[key];
    }
  });

  return {
    eyebrowHard: resume.skills.eyebrowHard,
    eyebrowSoft: resume.skills.eyebrowSoft,
    technicalLabel: resume.skills.technicalLabel,
    softLabel: resume.skills.softLabel,
    categoryLabels: resume.skills.categoryLabels,
    subcategoryLabels: subcategoryLabelMap,
    technicalSkills: inFocus(resume.skills.technicalSkills).map((skill) => ({
      name: skill.name,
      category: skill.category,
      subcategory: skill.subcategory || 'languages-frameworks',
    })),
    softSkills: inFocus(resume.skills.softSkills).map((skill) => skill.name),
  };
}

// Backend/frontend focuses use their override text when set, otherwise fall
// back to the default (fullstack) description.
async function resolveDescription(entry, focus) {
  if (focus !== "fullstack") {
    const override = entry[overrideKey[focus]];
    if (override && override.trim()) return override;
  }
  return entry.description();
}

async function readAllForFocus(collectionMap, locale, focus) {
  const all = await collectionMap[locale].all();
  const inFocus = all.map(({ entry }) => entry).filter((entry) => entry.focuses.includes(focus));
  const withBody = await Promise.all(
    inFocus.map(async (entry) => ({ ...entry, description: await resolveDescription(entry, focus) }))
  );
  return withBody.sort((a, b) => a.order - b.order);
}

export function getWorks(locale, focus) {
  return readAllForFocus(worksCollections, locale, focus);
}

export function getProjects(locale, focus) {
  return readAllForFocus(projectsCollections, locale, focus);
}

export async function getAcademic(locale) {
  const all = await academicCollections[locale].all();
  const withBody = await Promise.all(
    all.map(async ({ entry }) => ({ ...entry, institution: await entry.institution() }))
  );
  return withBody.sort((a, b) => a.order - b.order);
}