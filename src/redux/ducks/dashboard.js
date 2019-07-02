import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';
import {getCourses} from './courses';
import {getPaths} from './paths';

export const types = {
  DASHBOARD_PROGRESS_REQUEST: 'DASHBOARD_PROGRESS_REQUEST',
  DASHBOARD_PROGRESS_SUCCESS: 'DASHBOARD_PROGRESS_SUCCESS',
  DASHBOARD_PROGRESS_FAILURE: 'DASHBOARD_PROGRESS_FAILURE'
};

export const actions = {
  getProgress: obj => utils.action(types.DASHBOARD_PROGRESS_REQUEST, obj)
};

const initialState = utils.initialState({
  recentCourse: null,
  courses: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.DASHBOARD_PROGRESS_SUCCESS:
    return state.merge(fromJS(action.payload));
  default:
    return state;
  }
};

const getProgress = state => state.getIn(['dashboard', 'progress']);

export const selectors = {
  getProgress: createSelector([getProgress, getPaths, getCourses], (progress, paths, courses) => {

  })
};
