import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  AUTHORS_INIT_REQUEST: 'AUTHORS_INIT_REQUEST',
  AUTHORS_INIT_SUCCESS: 'AUTHORS_INIT_SUCCESS',
  AUTHORS_INIT_FAILURE: 'AUTHORS_INIT_FAILURE'
};

export const actions = {
  authorsInit: obj => utils.action(types.AUTHORS_INIT_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.AUTHORS_INIT_SUCCESS:
    return utils.stateListMerge(state, action.payload);
  default:
    return state;
  }
};

const getAuthors = state => state.get('authors');

export const selectors = {
  getAuthors: createSelector([getAuthors], p => p)
};
