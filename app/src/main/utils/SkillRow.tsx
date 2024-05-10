import {generateProgressBar} from "./ProgressBar.tsx";

type ProgressBarOptions = { name: string; level: number; }
type SkillsList = ProgressBarOptions[];

export const generateSkills = (skills: SkillsList) => {
  // used for generate justified text.
  let maxLen: number = 0;

  let skillsBody: string = '';

  skills.forEach((s: ProgressBarOptions) => {
    const nameLength: number = s.name.length;
    if (nameLength > maxLen) {
      maxLen = nameLength;
    }
  })

  skills.forEach((s: ProgressBarOptions) => {
    const spacesString = ' '.repeat(maxLen - s.name.length);
    skillsBody += `${s.name} ${spacesString} ${generateProgressBar(s.level)} ${s.level}% \n`;
  })

  return `${skillsBody}`;
}
