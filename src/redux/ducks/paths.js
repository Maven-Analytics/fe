import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {getPathBySlug} from '../../utils/pathHelpers';

export const types = {
  PATHSINIT_REQUEST: 'PATHSINIT_REQUEST',
  PATHSINIT_SUCCESS: 'PATHSINIT_SUCCESS',
  PATHSINIT_FAILURE: 'PATHSINIT_FAILURE'
};

export const actions = {
  pathsInit: obj => utils.action(types.PATHSINIT_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.PATHSINIT_SUCCESS:
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
  getCompletedPaths: createSelector([getPaths], p => p.filter(p => p.get('completed'))),
  getPathsByCompletionDesc: createSelector([getPaths], c => c.sort((a, b) => b.get('percentage_completed') - a.get('percentage_completed')))
};
