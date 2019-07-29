import {createSelector} from 'reselect';
import {Map} from 'immutable';

import * as utils from '../../utils/duckHelpers';

export const types = {
  SCORES_GET_REQUEST: 'SCORES_GET_REQUEST',
  SCORES_GET_SUCCESS: 'SCORES_GET_SUCCESS',
  SCORES_GET_FAILURE: 'SCORES_GET_FAILURE'
};

export const actions = {
  scoresGet: obj => utils.action(types.SCORES_GET_REQUEST, obj)
};

const initialState = utils.initialState({
  final: [],
  benchmark: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SCORES_GET_SUCCESS:
    return state.update(s => {
      s = s.set('final', utils.stateListMerge(s.get('final'), action.payload.final));
      s = s.set('benchmark', utils.stateListMerge(s.get('benchmark'), action.payload.benchmark));

      return s;
    });
  default:
    return state;
  }
};

const getScores = state => state.get('scores');
const getScoreForCourse = (state, courseId) => {
  const final = state.getIn(['scores', 'final']).filter(s => s.get('course_id') === courseId).first();
  const benchmark = state.getIn(['scores', 'benchmark']).filter(s => s.get('course_id') === courseId).first();
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
