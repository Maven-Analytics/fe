import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {getPathBySlug} from '../../utils/pathHelpers';

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
const getPath = (state, slug) => {
  return getPathBySlug(state.get('paths'), slug);
};

export const selectors = {
  getPaths: createSelector([getPaths], p => p),
  getPath: createSelector([getPath], p => p),
  // GetCompletedPaths: createSelector([getPaths], p => p.filter(p => p.get('completed'))),
  getPathsByCompletionDesc: createSelector([getPaths], c => c.sort((a, b) => b.get('percentage_completed') - a.get('percentage_completed')))
};
