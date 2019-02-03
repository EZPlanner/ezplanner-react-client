export const prettifyCourseName = course => {
  const regexObj = /(^[^\d]+)(.*)/.exec(course);
  return `${regexObj[1]} ${regexObj[2]}`;
};
