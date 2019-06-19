export const getPathById = (paths, id) => paths.find(c => c.get('id') === id);

export const getPathHours = path => {
  return path.get('courses').reduce((length, course) => {
    return length + (course.get('length') || 0);
  }, 0);
};
