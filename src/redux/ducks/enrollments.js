import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {fromJS, Map, List} from 'immutable';

export const types = {
  ENROLLMENTS_GET_REQUEST: 'ENROLLMENTS_GET_REQUEST',
  ENROLLMENTS_GET_SUCCESS: 'ENROLLMENTS_GET_SUCCESS',
  ENROLLMENTS_GET_FAILURE: 'ENROLLMENTS_GET_FAILURE',
  ENROLLMENTS_SET: 'ENROLLMENTS_SET'
};

export const actions = {
  enrollmentsGet: obj => utils.action(types.ENROLLMENTS_GET_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.ENROLLMENTS_GET_SUCCESS:
    return utils.stateListMerge(state, action.payload);
  case types.ENROLLMENTS_SET:
    return fromJS(action.payload);
  default:
    return state;
  }
};

const getEnrollments = state => state.get('enrollments');
const getEnrollmentsInCourses = (state, courses) => {
  if (!courses) {
    return List();
  }

  return state
    .get('enrollments')
    .filter(enrollment => {
      return courses.includes(enrollment.get('course_id'));
    });
};

export const selectors = {
  getEnrollments: createSelector(
    [getEnrollments],
    c => c
  ),
  getLatestEnrollment: createSelector(
    [getEnrollments],
    enrollments => {
      const latestEnrollment = enrollments.filter(e => e.get('percentage_completed')).first();

      // If there are no enrollments or the laltestEnrollment has not been started, return an empty map
      if (!latestEnrollment || !latestEnrollment.has('percentage_completed')) {
        return Map();
      }

      return latestEnrollment;
    }
  ),
  getEnrollmentsInCourses: createSelector(
    [getEnrollmentsInCourses],
    e => e
  )
};
