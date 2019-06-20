export const getCourseById = (courses, id) => courses && courses.find && courses.find(c => c.get('id') === id);
