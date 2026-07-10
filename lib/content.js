import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

const resumeSingletons = { en: reader.singletons.resumeEn, ru: reader.singletons.resumeRu };
const worksCollections = { en: reader.collections.worksEn, ru: reader.collections.worksRu };
const academicCollections = { en: reader.collections.academicEn, ru: reader.collections.academicRu };
const projectsCollections = { en: reader.collections.projectsEn, ru: reader.collections.projectsRu };

export function getResume(locale) {
  return resumeSingletons[locale].readOrThrow();
}

async function readAllSorted(collectionMap, locale, bodyField) {
  const all = await collectionMap[locale].all();
  const withBody = await Promise.all(
    all.map(async ({ entry }) => ({ ...entry, [bodyField]: await entry[bodyField]() }))
  );
  return withBody.sort((a, b) => a.order - b.order);
}

export function getWorks(locale) {
  return readAllSorted(worksCollections, locale, "description");
}

export function getAcademic(locale) {
  return readAllSorted(academicCollections, locale, "institution");
}

export function getProjects(locale) {
  return readAllSorted(projectsCollections, locale, "description");
}
