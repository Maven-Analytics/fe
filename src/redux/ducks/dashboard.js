import {createSelector} from 'reselect';
import {fromJS, List, Map} from 'immutable';

import * as utils from '../../utils/duckHelpers';
import {selectors as courseSelectors} from './courses';
import {selectors as pathSelectors} from './paths';
import {getCourseProgress, getPathProgress, sortEnrollmentsByPercentageDesc} from '../../utils/dashboardHelpers';

export const types = {
  DASHBOARD_PROGRESS_REQUEST: 'DASHBOARD_PROGRESS_REQUEST',
  DASHBOARD_PROGRESS_SUCCESS: 'DASHBOARD_PROGRESS_SUCCESS',
  DASHBOARD_PROGRESS_FAILURE: 'DASHBOARD_PROGRESS_FAILURE'
};

export const actions = {
  getProgress: obj => utils.action(types.DASHBOARD_PROGRESS_REQUEST, obj)
};

const initialState = utils.initialState({
  enrollments: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.DASHBOARD_PROGRESS_SUCCESS:
    return fromJS(action.payload);
  default:
    return state;
  }
};

const getEnrollments = state => state.getIn(['dashboard', 'enrollments']);

export const selectors = {
  getProgress: createSelector([pathSelectors.getPaths, courseSelectors.getCourses], (paths, courses) => {
    let courseProgress = courses
      .sort(sortEnrollmentsByPercentageDesc);
    let pathProgress = paths
      .sort(sortEnrollmentsByPercentageDesc);

    return fromJS({
      courses: courseProgress || [],
      paths: pathProgress || []
    });
  }),
  getRecentCourse: createSelector([getEnrollments, courseSelectors.getCourses], (enrollments, courses) => {
    const latestEnrollment = enrollments.first();

    // If there are no enrollments or the laltestEnrollment has not been started, return an empty map
    if (!latestEnrollment || !latestEnrollment.get('percentage_completed')) {
      return Map();
    }

    return courses.find(c => c.get('thinkificCourseId') === latestEnrollment.get('courseId'));
  }),
  getEnrollments: createSelector([getEnrollments], e => e)
};
