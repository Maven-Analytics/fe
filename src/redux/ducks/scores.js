import {createSelector} from 'reselect';
import {Map} from 'immutable';

import * as utils from '../../utils/duckHelpers';

export const types = {
  SCORES_GET_REQUEST: 'SCORES_GET_REQUEST',
  SCORES_GET_SUCCESS: 'SCORES_GET_SUCCESS',
  SCORES_GET_FAILURE: 'SCORES_GET_FAILURE',
  SCORES_RESET: 'SCORES_RESET'
};

export const actions = {
  scoresGet: obj => utils.action(types.SCORES_GET_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SCORES_GET_SUCCESS:
    return utils.stateListMerge(state, action.payload);
  case types.SCORES_RESET:
    return initialState;
  default:
    return state;
  }
};

const getScores = state => state.get('scores');
const getScoreForCourse = (state, courseId) => {
  const final = state.get('scores').filter(score => score.get('type') === 'final').filter(s => s.get('course_id') === courseId).first();
  const benchmark = state.get('scores').filter(score => score.get('type') === 'benchmark').filter(s => s.get('course_id') === courseId).first();
  let map = Map();

  if (benchmark) {
    map = map.set('benchmark', benchmark);
  }

  if (final) {
    map = map.set('final', final);
  }

  return map;
};

export const selectors = {
  getScores: createSelector([getScores], s => s),
  getScoreForCourse: createSelector([getScoreForCourse], s => s)
};
