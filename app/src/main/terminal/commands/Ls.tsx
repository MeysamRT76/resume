import { generateSkills } from "../../utils/SkillRow.tsx";

const Ls = () => {
  const languages = JSON.parse(import.meta.env.VITE_LANGUAGES || []);
  const technologies = JSON.parse(import.meta.env.VITE_TECHNOLOGIES || []);

  return (
    <pre>
      Languages:<br />
      { generateSkills(languages) }
      <br />
      Technology / Frameworks / Others<br />
      { generateSkills(technologies) }
    </pre>
  )
}

export default Ls
