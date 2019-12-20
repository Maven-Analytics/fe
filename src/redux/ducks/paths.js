import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {selectors as enrollmentSelectors} from './enrollments';
import {selectors as courseSelectors} from './courses';
import {selectors as userSelectors} from './user';
import {selectors as stateSelectors} from './state';
import {List} from 'immutable';
import {Map} from 'immutable';

export const types = {
  PATHS_GET_REQUEST: 'PATHS_GET_REQUEST',
  PATHS_GET_SUCCESS: 'PATHS_GET_SUCCESS',
  PATHS_GET_FAILURE: 'PATHS_GET_FAILURE'
};

export const actions = {
  pathsGet: obj => utils.action(types.PATHS_GET_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.PATHS_GET_SUCCESS:
    return utils.stateListMerge(state, action.payload);
  default:
    return state;
  }
};

const getPaths = state => state.get('paths');

export const selectors = {
  // eslint-disable-next-line max-params
  getPaths: createSelector([getPaths, enrollmentSelectors.getEnrollments, userSelectors.getUser, stateSelectors.getState], (paths, enrollments, user, state) => {
    paths = paths.map(path => {
      const pathCourses = path.get('courses') || List();
      // Set basic info
      path = path
        .set('instructors', pathCourses.map(course => course.get('author')).toSet().toList())
        .set('length', pathCourses.reduce((hours, course) => hours + (course.get('length') || 0), 0))
        .set('resumeUrl', pathCourses.getIn([0, 'url']));

      if (user) {
        const recommendedPath = user.getIn(['user', 'recommended_paths']) && user.getIn(['user', 'recommended_paths']).find(rp => rp.get('id') === path.get('id'));
        path = path
          .set('match', (recommendedPath && recommendedPath.get('percentage')) || 0);
      }

      const pathEnrollments = getPathEnrollments(path, enrollments);

      if (!pathEnrollments) {
        return path;
      }

      const latestEnrollment = pathEnrollments && pathEnrollments.get(0);
      const lastNotCompleteEnrollment = pathEnrollments && pathEnrollments.filter(enrollment => enrollment.get('percentage_completed') !== 1).first();
      const latestCourse = lastNotCompleteEnrollment ? pathCourses.find(course => course.get('thinkificCourseId') === lastNotCompleteEnrollment.get('course_id')) : path.getIn(['courses', 0]);
      const totalComplete = pathEnrollments.reduce((total, enrollment) => enrollment.get('percentage_completed') + total, 0);

      return path
        .set('percentage_completed', totalComplete / path.get('courses').count())
        .set('resumeUrl', latestCourse && latestCourse.get('url'))
        .set('lastTaken', latestEnrollment && latestEnrollment.getIn([0, 'updatedAt']));
    });

    paths = utils.sortProducts(paths, state);

    return paths;
  })
  // GetPath: createSelector([getPath], p => p),
  // GetCompletedPaths: createSelector([getPaths], p => p.filter(p => p.get('completed'))),
  // getPathsByCompletionDesc: createSelector([getPaths], c => c.sort((a, b) => b.get('percentage_completed') - a.get('percentage_completed')))
};

function getPathEnrollments(path, enrollments) {
  return path.has('courses') && enrollments && enrollments.count() && path.get('courses').map(course => enrollments.find(enrollment => enrollment.get('course_id') === course.get('thinkificCourseId'))).filter(e => e);
}
