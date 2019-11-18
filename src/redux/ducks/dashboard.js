import {createSelector} from 'reselect';
import {fromJS, List, Map} from 'immutable';

import * as utils from '../../utils/duckHelpers';
import {selectors as courseSelectors} from './courses';
import {selectors as pathSelectors} from './paths';
import {getCourseProgress, getPathProgress, sortEnrollmentsByPercentageDesc} from '../../utils/dashboardHelpers';

export const types = {
  DASHBOARD_PROGRESS_REQUEST: 'DASHBOARD_PROGRESS_REQUEST',
  DASHBOARD_PROGRESS_SUCCESS: 'DASHBOARD_PROGRESS_SUCCESS',
  DASHBOARD_PROGRESS_FAILURE: 'DASHBOARD_PROGRESS_FAILURE',
  DASHBOARD_ONBOARDING_REQUEST: 'DASHBOARD_ONBOARDING_REQUEST',
  DASHBOARD_ONBOARDING_SUCCESS: 'DASHBOARD_ONBOARDING_SUCCESS',
  DASHBOARD_ONBOARDING_FAILURE: 'DASHBOARD_ONBOARDING_FAILURE'
};

export const actions = {
  getProgress: obj => utils.action(types.DASHBOARD_PROGRESS_REQUEST, obj),
  getOnboarding: () => utils.action(types.DASHBOARD_ONBOARDING_REQUEST)
};

const initialState = utils.initialState({
  enrollments: [],
  onboarding: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.DASHBOARD_PROGRESS_SUCCESS:
    return state.set('enrollments', fromJS(action.payload.enrollments));
  case types.DASHBOARD_GETTING_STARTED_SUCCESS:
    return state.set('onboarding', fromJS(action.payload));
  default:
    return state;
  }
};

const getEnrollments = state => state.getIn(['dashboard', 'enrollments']);
const getOnboarding = state => state.getIn(['dashboard', 'onboarding']);

export const selectors = {
  getProgress: createSelector(
    [pathSelectors.getPaths, courseSelectors.getCourses],
    (paths, courses) => {
      let courseProgress = courses.sort(sortEnrollmentsByPercentageDesc);
      let pathProgress = paths.sort(sortEnrollmentsByPercentageDesc);

      return fromJS({
        courses: courseProgress || [],
        paths: pathProgress || []
      });
    }
  ),
  getRecentCourse: createSelector(
    [getEnrollments, courseSelectors.getCourses],
    (enrollments, courses) => {
      // Get the latest enrollment that the user has started
      const latestEnrollment = enrollments.filter(e => e.get('percentage_completed')).first();

      // If there are no enrollments or the laltestEnrollment has not been started, return an empty map
      if (!latestEnrollment || !latestEnrollment.has('percentage_completed')) {
        return Map();
      }

      return courses.find(c => c.get('thinkificCourseId') === latestEnrollment.get('courseId'));
    }
  ),
  getEnrollments: createSelector(
    [getEnrollments],
    e => e
  ),
  getOnboarding: createSelector(
    [getOnboarding],
    s => s
  )
};
