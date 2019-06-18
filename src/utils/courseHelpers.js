export const getCourseById = (courses, id) => courses.find(c => c.get('id') === id);
