import { config, fields, collection, singleton } from "@keystatic/core";
import { FOCUSES } from "./lib/focuses.js";
import { SKILL_CATEGORIES } from "./lib/skill-categories.js";
import { SKILL_SUBCATEGORIES, SUBCATEGORY_KEYS } from "./lib/skill-subcategories.js";

const focusMultiselect = (label) =>
  fields.multiselect({
    label,
    options: FOCUSES.map((value) => ({ label: value, value })),
    defaultValue: FOCUSES,
  });

// Wraps a single-locale field factory into an { en, ru } pair, so every
// translatable value lives on the same entry instead of a separate EN/RU
// collection — order/focuses/etc. can then only ever be defined once.
const bilingual = (fieldFactory, label) =>
  fields.object(
    { en: fieldFactory(`${label} (EN)`), ru: fieldFactory(`${label} (RU)`) },
    { label }
  );
const bilingualText = (label, opts) => bilingual((l) => fields.text({ label: l, ...opts }), label);

const makePitchSchema = (label) =>
  fields.object(
    {
      meta: fields.object(
        {
          title: bilingualText("Page title"),
          description: bilingualText("Meta description", { multiline: true }),
        },
        { label: "Meta / SEO" }
      ),
      ocupation: bilingualText("Occupation"),
      aboutMe: fields.object(
        {
          eyebrow: bilingualText("Eyebrow"),
          label: bilingualText("Heading"),
          description: bilingualText("Description", { multiline: true }),
        },
        { label: "About me" }
      ),
    },
    { label }
  );

const skillSchema = fields.object({
  name: bilingualText("Skill"),
  category: fields.select({
    label: "Category",
    options: SKILL_CATEGORIES.map((value) => ({ label: value, value })),
    defaultValue: "programming",
  }),
  subcategory: fields.select({
    label: "Subcategory",
    options: SKILL_SUBCATEGORIES.map(({ value, label }) => ({ label, value })),
    defaultValue: "languages-frameworks",
  }),
  focuses: focusMultiselect("Show on"),
});

const sectionVisibilitySchema = fields.object(
  {
    aboutMe: fields.checkbox({ label: "About me", defaultValue: true }),
    skills: fields.checkbox({ label: "Skills", defaultValue: true }),
    languages: fields.checkbox({ label: "Languages", defaultValue: true }),
    socialMedia: fields.checkbox({ label: "Social / contacts", defaultValue: true }),
    experience: fields.checkbox({ label: "Experience", defaultValue: true }),
    education: fields.checkbox({ label: "Education", defaultValue: true }),
    courses: fields.checkbox({ label: "Courses", defaultValue: true }),
    projects: fields.checkbox({ label: "Projects", defaultValue: true }),
    hobbies: fields.checkbox({ label: "Hobbies", defaultValue: true }),
  },
  { label: "Section visibility (shared — not locale-specific)" }
);

const subcategoryLabelsSchema = () => {
  const obj = {};
  SKILL_SUBCATEGORIES.forEach(({ value, label }) => {
    obj[SUBCATEGORY_KEYS[value]] = bilingualText(label, { defaultValue: label });
  });
  return obj;
};

const resumeSchema = {
  profile: fields.object(
    {
      name: bilingualText("Name"),
      location: bilingualText("Location"),
      email: fields.text({ label: "Email" }),
      telephone: fields.text({ label: "Telephone" }),
      showPhoto: bilingual(
        (l) => fields.checkbox({ label: l, description: "Display profile photo in the resume", defaultValue: true }),
        "Show photo"
      ),
      image: fields.image({
        label: "Photo",
        directory: "public/images",
        publicPath: "/images/",
      }),
      downloadCta: bilingualText("Download CV button label"),
    },
    { label: "Profile" }
  ),
  skills: fields.object(
    {
      eyebrowHard: bilingualText("Hard skills eyebrow"),
      eyebrowSoft: bilingualText("Soft skills eyebrow"),
      technicalLabel: bilingualText("Hard skills heading"),
      softLabel: bilingualText("Soft skills heading"),
      categoryLabels: fields.object(
        {
          design: bilingualText("Design category label"),
          programming: bilingualText("Programming category label"),
          teaching: bilingualText("Teaching category label"),
        },
        { label: "Category labels" }
      ),
      subcategoryLabels: fields.object(
        subcategoryLabelsSchema(),
        { label: "Subcategory labels" }
      ),
      technicalSkills: fields.array(skillSchema, {
        label: "Hard skills",
        itemLabel: (props) => props.fields.name.fields.en.value || "Skill",
      }),
      softSkills: fields.array(skillSchema, {
        label: "Soft skills",
        itemLabel: (props) => props.fields.name.fields.en.value || "Skill",
      }),
    },
    { label: "Skills (one tagged list, names per locale)" }
  ),
  socialMedia: fields.object(
    {
      eyebrow: bilingualText("Eyebrow"),
      label: bilingualText("Heading"),
      social: fields.array(
        fields.object({
          label: bilingualText("Display label"),
          name: fields.text({ label: "Key (e.g. linkedin)" }),
          url: fields.url({ label: "URL" }),
          icon: fields.text({ label: "Boxicons class" }),
        }),
        {
          label: "Links",
          itemLabel: (props) => props.fields.label.fields.en.value || "Link",
        }
      ),
    },
    { label: "Social / contacts" }
  ),
  sections: fields.object(
    {
      experience: bilingualText("Experience heading"),
      experienceEyebrow: bilingualText("Experience eyebrow"),
      achievementsLabel: bilingualText("Achievements sub-label"),
      education: bilingualText("Education heading"),
      educationEyebrow: bilingualText("Education eyebrow"),
      courses: bilingualText("Courses heading"),
      coursesEyebrow: bilingualText("Courses eyebrow"),
      projects: bilingualText("Projects heading"),
      projectsEyebrow: bilingualText("Projects eyebrow"),
      hobbies: bilingualText("Hobbies heading"),
      hobbiesEyebrow: bilingualText("Hobbies eyebrow"),
    },
    { label: "Section headings" }
  ),
  languages: fields.object(
    {
      eyebrow: bilingualText("Eyebrow"),
      label: bilingualText("Heading"),
      items: fields.array(
        fields.object({
          name: bilingualText("Language"),
          level: bilingualText("Level label (e.g. B1 Intermediate)"),
          dots: fields.integer({ label: "Filled dots" }),
          totalDots: fields.integer({ label: "Total dots", defaultValue: 7 }),
        }),
        { label: "Languages", itemLabel: (props) => props.fields.name.fields.en.value || "Language" }
      ),
    },
    { label: "Languages" }
  ),
  hobbies: fields.object(
    {
      items: fields.array(bilingualText("Hobby"), {
        label: "Hobbies",
        itemLabel: (props) => props.fields.en.value || "Hobby",
      }),
    },
    { label: "Hobbies" }
  ),
  courses: fields.object(
    {
      items: fields.array(
        fields.object({
          name: bilingualText("Course name"),
          provider: fields.text({ label: "Provider" }),
          date: fields.text({ label: "Date" }),
        }),
        { label: "Courses", itemLabel: (props) => props.fields.name.fields.en.value || "Course" }
      ),
    },
    { label: "Courses" }
  ),
  sectionVisibility: sectionVisibilitySchema,
  pitchFullstack: makePitchSchema("Pitch — Fullstack"),
  pitchBackend: makePitchSchema("Pitch — Backend"),
  pitchFrontend: makePitchSchema("Pitch — Frontend"),
  pitchTeacher: makePitchSchema("Pitch — Teacher"),
};

// Filename/slug is decoupled from the (now bilingual) display title, so
// renaming a title in either language doesn't move the file.
const keyField = (label) => fields.slug({ name: { label: `${label} (used for filename, not shown)` } });

// One default-locale MDX body (RU, the site's defaultLocale) plus the other
// locale and all focus overrides as inline MDX siblings in frontmatter —
// same mechanism the focus overrides already used, just on another axis.
const descriptionFields = () => ({
  descriptionRu: fields.mdx({ label: "Description — RU (default / fullstack)" }),
  descriptionEn: fields.mdx.inline({ label: "Description — EN (default / fullstack)" }),
  descriptionRuBackend: fields.mdx.inline({ label: "Description override — Backend, RU (optional)" }),
  descriptionRuFrontend: fields.mdx.inline({ label: "Description override — Frontend, RU (optional)" }),
  descriptionRuTeacher: fields.mdx.inline({ label: "Description override — Teacher, RU (optional)" }),
  descriptionEnBackend: fields.mdx.inline({ label: "Description override — Backend, EN (optional)" }),
  descriptionEnFrontend: fields.mdx.inline({ label: "Description override — Frontend, EN (optional)" }),
  descriptionEnTeacher: fields.mdx.inline({ label: "Description override — Teacher, EN (optional)" }),
});

const workSchema = {
  key: keyField("Key"),
  title: bilingualText("Job title"),
  order: fields.integer({ label: "Sort order (lower = higher up)" }),
  period: bilingualText("Period"),
  company: bilingualText("Company"),
  focuses: focusMultiselect("Show on"),
  ...descriptionFields(),
  achievementsRu: fields.mdx.inline({ label: "Achievements — RU (optional, hidden if empty)" }),
  achievementsEn: fields.mdx.inline({ label: "Achievements — EN (optional, hidden if empty)" }),
};

const academicSchema = {
  key: keyField("Key"),
  career: bilingualText("Institution / program"),
  order: fields.integer({ label: "Sort order (lower = higher up)" }),
  date: bilingualText("Date range"),
  institutionRu: fields.mdx({ label: "Institution detail — RU" }),
  institutionEn: fields.mdx.inline({ label: "Institution detail — EN" }),
  degree: bilingualText("Degree / program (optional)"),
};

const projectSchema = {
  key: keyField("Key"),
  name: bilingualText("Project name"),
  order: fields.integer({ label: "Sort order (lower = higher up)" }),
  company: bilingualText("Company / context"),
  period: bilingualText("Period"),
  focuses: focusMultiselect("Show on"),
  ...descriptionFields(),
};

export default config({
  storage: { kind: "local" },
  singletons: {
    resume: singleton({
      label: "Resume",
      path: "content/resume",
      schema: resumeSchema,
    }),
  },
  collections: {
    works: collection({
      label: "Experience",
      path: "content/works/*",
      slugField: "key",
      format: { contentField: "descriptionRu" },
      schema: workSchema,
    }),
    academic: collection({
      label: "Education",
      path: "content/academic/*",
      slugField: "key",
      format: { contentField: "institutionRu" },
      schema: academicSchema,
    }),
    projects: collection({
      label: "Projects",
      path: "content/projects/*",
      slugField: "key",
      format: { contentField: "descriptionRu" },
      schema: projectSchema,
    }),
  },
});
