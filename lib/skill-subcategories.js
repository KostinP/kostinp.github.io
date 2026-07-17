// Общие подкатегории для всех локалей
export const SKILL_SUBCATEGORIES = [
  { value: "languages-frameworks", label: "Languages & Frameworks" },
  { value: "game-development", label: "Game Development" },
  { value: "tools-platforms", label: "Tools & Platforms" },
  { value: "databases-devops", label: "Databases & DevOps" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "ux-ui-design", label: "UX/UI Design" },
  { value: "3d-animation", label: "3D & Animation" },
  { value: "curriculum-instruction", label: "Curriculum & Instruction" },
  { value: "student-engagement", label: "Student Engagement" },
];

// Маппинг value -> ключ для labels в YAML
export const SUBCATEGORY_KEYS = {
  "languages-frameworks": "languagesFrameworks",
  "game-development": "gameDevelopment",
  "tools-platforms": "toolsPlatforms",
  "databases-devops": "databasesDevops",
  "graphic-design": "graphicDesign",
  "ux-ui-design": "uxUiDesign",
  "3d-animation": "threeDAnimation",
  "curriculum-instruction": "curriculumInstruction",
  "student-engagement": "studentEngagement",
};

// Маппинг value -> отображаемое имя для использования в коде
export const getSubcategoryLabel = (value, locale = 'en') => {
  const subcat = SKILL_SUBCATEGORIES.find(s => s.value === value);
  if (!subcat) return value;
  return subcat.label;
};