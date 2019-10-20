import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  PAGES_GET_REQUEST: 'PAGES_GET_REQUEST',
  PAGES_GET_SUCCESS: 'PAGES_GET_SUCCESS',
  PAGES_GET_FAILURE: 'PAGES_GET_FAILURE'
};

export const actions = {
  pagesGet: obj => utils.action(types.PAGES_GET_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PAGES_GET_SUCCESS:
      return utils.stateListMerge(state, action.payload);
    default:
      return state;
  }
};

const getPages = state => state.get('pages');
const getPage = (state, slug) => state.get('pages').find(p => p.get('slug') === slug);
const getPageById = (state, id) => state.get('pages').find(p => p.get('id') === id);

export const selectors = {
  getPages: createSelector(
    [getPages],
    p => p
  ),
  getPage: createSelector(
    [getPage],
    p => p
  ),
  getPageById: createSelector(
    [getPageById],
    p => p
  )
};
