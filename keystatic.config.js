import { config, fields, collection, singleton } from "@keystatic/core";

const resumeSchema = {
  meta: fields.object(
    {
      title: fields.text({ label: "Page title" }),
      description: fields.text({ label: "Meta description", multiline: true }),
    },
    { label: "Meta / SEO" }
  ),
  profile: fields.object(
    {
      name: fields.text({ label: "Name" }),
      ocupation: fields.text({ label: "Occupation" }),
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
    { label: "Profile" }
  ),
  aboutMe: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      label: fields.text({ label: "Heading" }),
      description: fields.text({ label: "Description", multiline: true }),
    },
    { label: "About me" }
  ),
  skills: fields.object(
    {
      eyebrowHard: fields.text({ label: "Hard skills eyebrow" }),
      eyebrowSoft: fields.text({ label: "Soft skills eyebrow" }),
      technicalLabel: fields.text({ label: "Hard skills heading" }),
      softLabel: fields.text({ label: "Soft skills heading" }),
      technicalSkills: fields.array(fields.text({ label: "Skill" }), {
        label: "Hard skills",
        itemLabel: (props) => props.value || "Skill",
      }),
      softSkills: fields.array(fields.text({ label: "Skill" }), {
        label: "Soft skills",
        itemLabel: (props) => props.value || "Skill",
      }),
    },
    { label: "Skills" }
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
    { label: "Social / contacts" }
  ),
  sections: fields.object(
    {
      experience: fields.text({ label: "Experience heading" }),
      experienceEyebrow: fields.text({ label: "Experience eyebrow" }),
      education: fields.text({ label: "Education heading" }),
      educationEyebrow: fields.text({ label: "Education eyebrow" }),
      projects: fields.text({ label: "Projects heading" }),
      projectsEyebrow: fields.text({ label: "Projects eyebrow" }),
    },
    { label: "Section headings" }
  ),
};

const workSchema = {
  title: fields.slug({ name: { label: "Job title" } }),
  order: fields.integer({ label: "Sort order (lower = higher up)" }),
  period: fields.text({ label: "Period" }),
  company: fields.text({ label: "Company" }),
  description: fields.mdx({ label: "Description" }),
};

const academicSchema = {
  career: fields.slug({ name: { label: "Institution / program" } }),
  order: fields.integer({ label: "Sort order (lower = higher up)" }),
  date: fields.text({ label: "Date range" }),
  institution: fields.mdx({ label: "Institution detail" }),
};

const projectSchema = {
  name: fields.slug({ name: { label: "Project name" } }),
  order: fields.integer({ label: "Sort order (lower = higher up)" }),
  company: fields.text({ label: "Company / context" }),
  period: fields.text({ label: "Period" }),
  description: fields.mdx({ label: "Description" }),
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
