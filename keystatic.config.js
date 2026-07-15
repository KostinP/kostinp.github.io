import { config, fields, collection, singleton } from "@keystatic/core";
import { FOCUSES } from "./lib/focuses.js";
import { SKILL_CATEGORIES } from "./lib/skill-categories.js";

const focusMultiselect = (label) =>
  fields.multiselect({
    label,
    options: FOCUSES.map((value) => ({ label: value, value })),
    defaultValue: FOCUSES,
  });

const makePitchSchema = (label) =>
  fields.object(
    {
      meta: fields.object(
        {
          title: fields.text({ label: "Page title" }),
          description: fields.text({ label: "Meta description", multiline: true }),
        },
        { label: "Meta / SEO" }
      ),
      ocupation: fields.text({ label: "Occupation" }),
      aboutMe: fields.object(
        {
          eyebrow: fields.text({ label: "Eyebrow" }),
          label: fields.text({ label: "Heading" }),
          description: fields.text({ label: "Description", multiline: true }),
        },
        { label: "About me" }
      ),
    },
    { label }
  );

const skillSchema = fields.object({
  name: fields.text({ label: "Skill" }),
  category: fields.select({
    label: "Category",
    options: SKILL_CATEGORIES.map((value) => ({ label: value, value })),
    defaultValue: "programming",
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
  { label: "Section visibility" }
);

const resumeSchema = {
  profile: fields.object(
    {
      name: fields.text({ label: "Name" }),
      location: fields.text({ label: "Location" }),
      email: fields.text({ label: "Email" }),
      telephone: fields.text({ label: "Telephone" }),
      image: fields.image({
        label: "Photo",
        directory: "public/images",
        publicPath: "/images/",
      }),
      downloadCta: fields.text({ label: "Download CV button label" }),
    },
    { label: "Profile (shared across focuses)" }
  ),
  skills: fields.object(
    {
      eyebrowHard: fields.text({ label: "Hard skills eyebrow" }),
      eyebrowSoft: fields.text({ label: "Soft skills eyebrow" }),
      technicalLabel: fields.text({ label: "Hard skills heading" }),
      softLabel: fields.text({ label: "Soft skills heading" }),
      categoryLabels: fields.object(
        {
          design: fields.text({ label: "Design category label" }),
          programming: fields.text({ label: "Programming category label" }),
          teaching: fields.text({ label: "Teaching category label" }),
        },
        { label: "Category labels" }
      ),
      technicalSkills: fields.array(skillSchema, {
        label: "Hard skills",
        itemLabel: (props) => props.fields.name.value || "Skill",
      }),
      softSkills: fields.array(skillSchema, {
        label: "Soft skills",
        itemLabel: (props) => props.fields.name.value || "Skill",
      }),
    },
    { label: "Skills (shared list, tagged per focus)" }
  ),
  socialMedia: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      label: fields.text({ label: "Heading" }),
      social: fields.array(
        fields.object({
          label: fields.text({ label: "Display label" }),
          name: fields.text({ label: "Key (e.g. linkedin)" }),
          url: fields.url({ label: "URL" }),
          icon: fields.text({ label: "Boxicons class" }),
        }),
        {
          label: "Links",
          itemLabel: (props) => props.fields.label.value || "Link",
        }
      ),
    },
    { label: "Social / contacts (shared)" }
  ),
  sections: fields.object(
    {
      experience: fields.text({ label: "Experience heading" }),
      experienceEyebrow: fields.text({ label: "Experience eyebrow" }),
      achievementsLabel: fields.text({ label: "Achievements sub-label" }),
      education: fields.text({ label: "Education heading" }),
      educationEyebrow: fields.text({ label: "Education eyebrow" }),
      courses: fields.text({ label: "Courses heading" }),
      coursesEyebrow: fields.text({ label: "Courses eyebrow" }),
      projects: fields.text({ label: "Projects heading" }),
      projectsEyebrow: fields.text({ label: "Projects eyebrow" }),
      hobbies: fields.text({ label: "Hobbies heading" }),
      hobbiesEyebrow: fields.text({ label: "Hobbies eyebrow" }),
    },
    { label: "Section headings (shared)" }
  ),
  languages: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      label: fields.text({ label: "Heading" }),
      items: fields.array(
        fields.object({
          name: fields.text({ label: "Language" }),
          level: fields.text({ label: "Level label (e.g. B1 Intermediate)" }),
          dots: fields.integer({ label: "Filled dots" }),
          totalDots: fields.integer({ label: "Total dots", defaultValue: 7 }),
        }),
        { label: "Languages", itemLabel: (props) => props.fields.name.value || "Language" }
      ),
    },
    { label: "Languages (shared)" }
  ),
  hobbies: fields.object(
    {
      items: fields.array(fields.text({ label: "Hobby" }), {
        label: "Hobbies",
        itemLabel: (props) => props.value || "Hobby",
      }),
    },
    { label: "Hobbies (shared)" }
  ),
  courses: fields.object(
    {
      items: fields.array(
        fields.object({
          name: fields.text({ label: "Course name" }),
          provider: fields.text({ label: "Provider" }),
          date: fields.text({ label: "Date" }),
        }),
        { label: "Courses", itemLabel: (props) => props.fields.name.value || "Course" }
      ),
    },
    { label: "Courses (shared)" }
  ),
  sectionVisibility: sectionVisibilitySchema,
  pitchFullstack: makePitchSchema("Pitch — Fullstack"),
  pitchBackend: makePitchSchema("Pitch — Backend"),
  pitchFrontend: makePitchSchema("Pitch — Frontend"),
  pitchTeacher: makePitchSchema("Pitch — Teacher"),
};

const workSchema = {
  title: fields.slug({ name: { label: "Job title" } }),
  order: fields.integer({ label: "Sort order (lower = higher up)" }),
  period: fields.text({ label: "Period" }),
  company: fields.text({ label: "Company" }),
  focuses: focusMultiselect("Show on"),
  description: fields.mdx({ label: "Description (default / fullstack)" }),
  descriptionBackend: fields.mdx.inline({
    label: "Description override — Backend (optional, falls back to default)",
  }),
  descriptionFrontend: fields.mdx.inline({
    label: "Description override — Frontend (optional, falls back to default)",
  }),
  descriptionTeacher: fields.mdx.inline({
    label: "Description override — Teacher (optional, falls back to default)",
  }),
  achievements: fields.mdx.inline({
    label: "Achievements (optional, hidden if empty)",
  }),
};

const academicSchema = {
  career: fields.slug({ name: { label: "Institution / program" } }),
  order: fields.integer({ label: "Sort order (lower = higher up)" }),
  date: fields.text({ label: "Date range" }),
  institution: fields.mdx({ label: "Institution detail" }),
  degree: fields.text({ label: "Degree / program (optional)" }),
};

const projectSchema = {
  name: fields.slug({ name: { label: "Project name" } }),
  order: fields.integer({ label: "Sort order (lower = higher up)" }),
  company: fields.text({ label: "Company / context" }),
  period: fields.text({ label: "Period" }),
  focuses: focusMultiselect("Show on"),
  description: fields.mdx({ label: "Description (default / fullstack)" }),
  descriptionBackend: fields.mdx.inline({
    label: "Description override — Backend (optional, falls back to default)",
  }),
  descriptionFrontend: fields.mdx.inline({
    label: "Description override — Frontend (optional, falls back to default)",
  }),
  descriptionTeacher: fields.mdx.inline({
    label: "Description override — Teacher (optional, falls back to default)",
  }),
};

export default config({
  storage: { kind: "local" },
  singletons: {
    resumeEn: singleton({
      label: "Resume (EN)",
      path: "content/resume/en",
      schema: resumeSchema,
    }),
    resumeRu: singleton({
      label: "Resume (RU)",
      path: "content/resume/ru",
      schema: resumeSchema,
    }),
  },
  collections: {
    worksEn: collection({
      label: "Experience (EN)",
      path: "content/works/en/*",
      slugField: "title",
      format: { contentField: "description" },
      schema: workSchema,
    }),
    worksRu: collection({
      label: "Experience (RU)",
      path: "content/works/ru/*",
      slugField: "title",
      format: { contentField: "description" },
      schema: workSchema,
    }),
    academicEn: collection({
      label: "Education (EN)",
      path: "content/academic/en/*",
      slugField: "career",
      format: { contentField: "institution" },
      schema: academicSchema,
    }),
    academicRu: collection({
      label: "Education (RU)",
      path: "content/academic/ru/*",
      slugField: "career",
      format: { contentField: "institution" },
      schema: academicSchema,
    }),
    projectsEn: collection({
      label: "Projects (EN)",
      path: "content/projects/en/*",
      slugField: "name",
      format: { contentField: "description" },
      schema: projectSchema,
    }),
    projectsRu: collection({
      label: "Projects (RU)",
      path: "content/projects/ru/*",
      slugField: "name",
      format: { contentField: "description" },
      schema: projectSchema,
    }),
  },
});
