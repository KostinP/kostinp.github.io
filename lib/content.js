import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { FOCUSES } from "./focuses.js";
import { SUBCATEGORY_KEYS } from "./skill-subcategories.js";

export { FOCUSES };

const reader = createReader(process.cwd(), keystaticConfig);

const pitchKey = {
  fullstack: "pitchFullstack",
  backend: "pitchBackend",
  frontend: "pitchFrontend",
  teacher: "pitchTeacher",
};
// Capitalized locale suffix used to address the per-locale/per-focus MDX
// override fields, e.g. locale "en" + focus "backend" -> "descriptionEnBackend".
const localeSuffix = { en: "En", ru: "Ru" };
const focusSuffix = { backend: "Backend", frontend: "Frontend", teacher: "Teacher" };

const loc = (bilingualValue, locale) => bilingualValue[locale];

function readResume() {
  return reader.singletons.resume.readOrThrow();
}

export async function getProfile(locale) {
  const resume = await readResume();
  return {
    profile: {
      name: loc(resume.profile.name, locale),
      location: loc(resume.profile.location, locale),
      email: resume.profile.email,
      telephone: resume.profile.telephone,
      showPhoto: loc(resume.profile.showPhoto, locale) !== false, // по умолчанию true
      image: resume.profile.image,
      downloadCta: loc(resume.profile.downloadCta, locale),
    },
    socialMedia: {
      eyebrow: loc(resume.socialMedia.eyebrow, locale),
      label: loc(resume.socialMedia.label, locale),
      social: resume.socialMedia.social.map((item) => ({
        label: loc(item.label, locale),
        name: item.name,
        url: item.url,
        icon: item.icon,
      })),
    },
    sections: Object.fromEntries(
      Object.entries(resume.sections).map(([key, value]) => [key, loc(value, locale)])
    ),
    languages: {
      eyebrow: loc(resume.languages.eyebrow, locale),
      label: loc(resume.languages.label, locale),
      items: resume.languages.items.map((item) => ({
        name: loc(item.name, locale),
        level: loc(item.level, locale),
        dots: item.dots,
        totalDots: item.totalDots,
      })),
    },
    hobbies: { items: resume.hobbies.items.map((item) => loc(item, locale)) },
    courses: {
      items: resume.courses.items.map((item) => ({
        name: loc(item.name, locale),
        provider: item.provider,
        date: item.date,
      })),
    },
    sectionVisibility: resume.sectionVisibility,
  };
}

export async function getPitch(locale, focus) {
  const resume = await readResume();
  const pitch = resume[pitchKey[focus]];
  return {
    meta: {
      title: loc(pitch.meta.title, locale),
      description: loc(pitch.meta.description, locale),
    },
    ocupation: loc(pitch.ocupation, locale),
    aboutMe: {
      eyebrow: loc(pitch.aboutMe.eyebrow, locale),
      label: loc(pitch.aboutMe.label, locale),
      description: loc(pitch.aboutMe.description, locale),
    },
  };
}

export async function getSkills(locale, focus) {
  const resume = await readResume();
  const inFocus = (list) => list.filter((skill) => skill.focuses.includes(focus));

  const subcategoryLabels = resume.skills.subcategoryLabels || {};
  const subcategoryLabelMap = {};
  Object.keys(subcategoryLabels).forEach((key) => {
    const value = Object.keys(SUBCATEGORY_KEYS).find((v) => SUBCATEGORY_KEYS[v] === key);
    if (value) {
      subcategoryLabelMap[value] = loc(subcategoryLabels[key], locale);
    }
  });

  return {
    eyebrowHard: loc(resume.skills.eyebrowHard, locale),
    eyebrowSoft: loc(resume.skills.eyebrowSoft, locale),
    technicalLabel: loc(resume.skills.technicalLabel, locale),
    softLabel: loc(resume.skills.softLabel, locale),
    categoryLabels: Object.fromEntries(
      Object.entries(resume.skills.categoryLabels).map(([key, value]) => [key, loc(value, locale)])
    ),
    subcategoryLabels: subcategoryLabelMap,
    technicalSkills: inFocus(resume.skills.technicalSkills).map((skill) => ({
      name: loc(skill.name, locale),
      category: skill.category,
      subcategory: skill.subcategory || "languages-frameworks",
    })),
    softSkills: inFocus(resume.skills.softSkills).map((skill) => loc(skill.name, locale)),
  };
}

// Backend/frontend focuses use their locale+focus override text when set,
// otherwise fall back to the default (fullstack) description for that locale.
async function resolveDescription(entry, locale, focus) {
  const suffix = localeSuffix[locale];
  if (focus !== "fullstack") {
    const override = entry[`description${suffix}${focusSuffix[focus]}`];
    if (override && override.trim()) return override;
  }
  const defaultDescription = entry[`description${suffix}`];
  return typeof defaultDescription === "function" ? defaultDescription() : defaultDescription;
}

export async function getWorks(locale, focus) {
  const all = await reader.collections.works.all();
  const inFocus = all.map(({ entry }) => entry).filter((entry) => entry.focuses.includes(focus));
  const withBody = await Promise.all(
    inFocus.map(async (entry) => ({
      title: loc(entry.title, locale),
      order: entry.order,
      period: loc(entry.period, locale),
      company: loc(entry.company, locale),
      description: await resolveDescription(entry, locale, focus),
      achievements: locale === "en" ? entry.achievementsEn : entry.achievementsRu,
    }))
  );
  return withBody.sort((a, b) => a.order - b.order);
}

export async function getProjects(locale, focus) {
  const all = await reader.collections.projects.all();
  const inFocus = all.map(({ entry }) => entry).filter((entry) => entry.focuses.includes(focus));
  const withBody = await Promise.all(
    inFocus.map(async (entry) => ({
      name: loc(entry.name, locale),
      order: entry.order,
      company: loc(entry.company, locale),
      period: loc(entry.period, locale),
      description: await resolveDescription(entry, locale, focus),
    }))
  );
  return withBody.sort((a, b) => a.order - b.order);
}

export async function getAcademic(locale) {
  const all = await reader.collections.academic.all();
  const withBody = await Promise.all(
    all.map(async ({ entry }) => ({
      career: loc(entry.career, locale),
      order: entry.order,
      date: loc(entry.date, locale),
      institution: locale === "en" ? entry.institutionEn : await entry.institutionRu(),
      degree: loc(entry.degree, locale),
    }))
  );
  return withBody.sort((a, b) => a.order - b.order);
}
