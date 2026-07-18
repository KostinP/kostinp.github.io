import { getLocale } from "next-intl/server";
import { getSkills, getProfile } from "@/lib/content";
import { SKILL_CATEGORIES } from "@/lib/skill-categories";

const Skill = ({ skill }) => <li className="skill-tag">{skill}</li>;

const groupByCategoryAndSubcategory = (skills) => {
  const result = {};
  
  skills.forEach(skill => {
    const category = skill.category || 'programming';
    const subcategory = skill.subcategory || 'Other';
    
    if (!result[category]) {
      result[category] = {};
    }
    if (!result[category][subcategory]) {
      result[category][subcategory] = [];
    }
    result[category][subcategory].push(skill.name);
  });
  
  return result;
};

export const Skills = async ({ focus }) => {
  const locale = await getLocale();
  const [{ sectionVisibility }, skills] = await Promise.all([
    getProfile(locale),
    getSkills(locale, focus),
  ]);

  if (!sectionVisibility.skills) return null;

  const groupedSkills = groupByCategoryAndSubcategory(skills.technicalSkills);
  const categoryKeys = Object.keys(groupedSkills);
  const subcategoryLabels = skills.subcategoryLabels || {};

  return (
    <>
      <section className="technical-skills section" id="skills">
        <p className="eyebrow">{skills.eyebrowHard}</p>
        <h2 className="section-title">{skills.technicalLabel}</h2>
        <div className="skills__content bd-grid">
          {categoryKeys.map((category) => {
            const subcategories = groupedSkills[category];
            const subcategoryKeys = Object.keys(subcategories).sort();
            
            return (
              <details key={category} className="skills__category" open>
                <summary className="skills__category-summary">
                  {skills.categoryLabels[category] || category}
                </summary>
                {subcategoryKeys.map((subcategory) => {
                  const displayName = subcategoryLabels[subcategory] || subcategory;
                  return (
                    <div key={subcategory} className="skills__subcategory">
                      <div className="skills__subcategory-title">{displayName}</div>
                      <ul className="skill-tag-list">
                        {subcategories[subcategory].map((skill) => (
                          <Skill key={skill} skill={skill} />
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </details>
            );
          })}
        </div>
      </section>
      
      {skills.softSkills.length > 0 && (
        <section className="soft-skills section">
          <p className="eyebrow">{skills.eyebrowSoft}</p>
          <h2 className="section-title">{skills.softLabel}</h2>
          <div className="skills__content bd-grid">
            <ul className="skill-tag-list">
              {skills.softSkills.map((skill) => (
                <Skill key={skill} skill={skill} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};