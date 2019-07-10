import {Map, fromJS, List} from 'immutable';

import {getPathEnrollments} from './pathHelpers';

export const getCourseProgress = (course, enrollments) => {
  if (course && !Map.isMap(course)) {
    throw new Error('course must be a Map');
  }

  if (enrollments && !List.isList(enrollments)) {
    throw new Error('enrollments must be a List');
  }

  if (!course || course.isEmpty() || !course.get('thinkificCourseId')) {
    return;
  }

  const enrollment = enrollments.find(enrollment => enrollment.get('courseId') === course.get('thinkificCourseId'));

  const progress = fromJS({
    courseId: course.get('thinkificCourseId'),
    course: course.toJS(),
    percentage_completed: 0
  });

  if (!enrollment) {
    return progress;
  }

  return progress.merge(enrollment);
};

export const getPathProgress = (path, enrollments) => {
  if (path && !Map.isMap(path)) {
    throw new Error('path must be a Map');
  }

  if (enrollments && !List.isList(enrollments)) {
    throw new Error('enrollments must be a List');
  }

  if (!path.has('courses')) {
    return;
  }

  let progress = fromJS({
    pathId: path.get('id'),
    path: path.toJS(),
    percentage_completed: 0
  });

  const totalCourses = path.get('courses').count();
  const pathEnrollments = getPathEnrollments(path, enrollments);

  progress = pathEnrollments.reduce((map, enrollment) => {
    return map.update(u => {
      const prevPercentage = u.get('percentage_completed');
      const newPercentage = enrollment.get('percentage_completed') + prevPercentage;
      return u.set('percentage_completed', newPercentage);
    });
  }, progress);

  // Divide the total progress by the amount of courses in the path
  progress = progress.update('percentage_completed', p => totalCourses > 0 ? p / totalCourses : 0);

  if (progress.get('percentage_completed') === 1) {
    progress = progress.set('completed', true)
      .set('completed_at', pathEnrollments.getIn([0, 'completed_at']));
  }

  return progress;
};

export const sortEnrollmentsByPercentageDesc = (a, b) => {
  return a.has('percentage_completed') && b.has('percentage_completed') ? b.get('percentage_completed') - a.get('percentage_completed') : 0;
};
