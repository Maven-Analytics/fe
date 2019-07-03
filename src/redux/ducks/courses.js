import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';
import {getCourseBySlug} from '../../utils/courseHelpers';

export const types = {
  COURSESINIT_REQUEST: 'COURSESINIT_REQUEST',
  COURSESINIT_SUCCESS: 'COURSESINIT_SUCCESS',
  COURSESINIT_FAILURE: 'COURSESINIT_FAILURE'
};

export const actions = {
  coursesInit: obj => utils.action(types.COURSESINIT_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.COURSESINIT_SUCCESS:
    return utils.stateMerge(state, action.payload);
  default:
    return state;
  }
};

const getCourses = state => state.get('courses');
const getCourse = (state, slug) => {
  return getCourseBySlug(state.get('courses'), slug);
};

export const selectors = {
  getCourses: createSelector([getCourses], c => c),
  getCourse: createSelector([getCourse], c => c)
};
