import {Map, List} from 'immutable';
import {Routes} from '../routes';

export const getPathById = (paths, id) => paths && paths.find && paths.find(p => p.get('id') === id);

export const getPathBySlug = (paths, slug) => paths && paths.find && paths.find(p => p.get('slug') === slug);

export const getPathHours = path => {
  if (!path || !path.has('courses')) {
    return 0;
  }

  return path.get('courses').reduce((length, course) => {
    return length + (course.get('length') || 0);
  }, 0);
};

export const getMatchForPath = (path, user) => {
  if (!user || !user.isEmpty || user.isEmpty() || !user.has('recommended_paths')) {
    return 0;
  }

  if (!path || !path.isEmpty || path.isEmpty() || !path.has('id')) {
    return 0;
  }

  const recommendedPath = user.get('recommended_paths').find(rp => rp.get('id') === path.get('id'));

  if (!recommendedPath || !recommendedPath.has('percentage')) {
    return 0;
  }

  return recommendedPath.get('percentage');
};

export const getPathEnrollments = (path, enrollments) => {
  if (!enrollments || !enrollments.isEmpty || enrollments.isEmpty()) {
    return List();
  }

  const pathCourses = path.get('courses').reduce((map, c) => map.set(c.get('thinkificCourseId'), true), Map());
  const pathEnrollments = enrollments.filter(e => pathCourses.has(e.get('courseId')));

  return pathEnrollments;
};

export const getResumeCourseUrl = (path, enrollments) => {
  const pathEnrollments = getPathEnrollments(path, enrollments);

  if (!pathEnrollments || pathEnrollments.isEmpty()) {
    return `${Routes.Path}/${path.get('slug')}`;
  }

  // Get the latest enrollment by most percentage_completed NOT equal to 0 or 1
  let latestEnrollment = pathEnrollments
    .sort((a, b) => b.get('percentage_completed') - a.get('percentage_completed'))
    .filter(e => e.get('percentage_completed') !== 0 && e.get('percentage_completed') !== 1)
    .first();

  if (!latestEnrollment || latestEnrollment.isEmpty()) {
    latestEnrollment = enrollments.find(e => e.get('courseId') === path.getIn(['courses', 0, 'thinkificCourseId']));
  }

  return `${Routes.CourseTake}/${latestEnrollment.get('thinkificSlug')}`;
};
