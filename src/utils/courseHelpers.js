import {Map} from 'immutable';

export const getCourseById = (courses, id) => courses && courses.find && (courses.find(c => c.get('id') === id) || Map());

export const getCourseBySlug = (courses, slug) => courses && courses.find && courses.find(c => c && c.get && c.get('slug') === slug);

export const getMatchScoreForCourse = (course, user) => {
  if (!user || !user.get('recommended_courses')) {
    return;
  }

  if (!course || !course.get('id')) {
    return;
  }

  const match = user
    .get('recommended_courses')
    .find(r => r.get('id') === course.get('id'));

  return match ? match.get('percentage') : null;
};
