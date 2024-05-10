export const generateProgressBar = (level: number) => {
  const totalBars = 20;  // Total number of slots in the progress bar
  const filledBars = Math.round((level / 100) * totalBars);
  const emptyBars = totalBars - filledBars;

  const filledSection = '='.repeat(filledBars);
  const emptySection = '.'.repeat(emptyBars);

  return `[${filledSection}${emptySection}]`;
}
