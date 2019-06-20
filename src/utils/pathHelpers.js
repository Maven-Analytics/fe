export const getPathById = (paths, id) => paths && paths.find && paths.find(p => p.get('id') === id);

export const getPathBySlug = (paths, slug) => paths && paths.find && paths.find(p => p.get('slug') === slug);

export const getPathHours = path => {
  return path.get('courses').reduce((length, course) => {
    return length + (course.get('length') || 0);
  }, 0);
};
