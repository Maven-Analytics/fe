import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  SPOTLIGHTS_GET_REQUEST: 'SPOTLIGHTS_GET_REQUEST',
  SPOTLIGHTS_GET_SUCCESS: 'SPOTLIGHTS_GET_SUCCESS',
  SPOTLIGHTS_GET_FAILURE: 'SPOTLIGHTS_GET_FAILURE'
};

export const actions = {
  spotlightsGet: obj => utils.action(types.SPOTLIGHTS_GET_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SPOTLIGHTS_GET_SUCCESS:
    return utils.stateListMerge(state, action.payload);
  default:
    return state;
  }
};

const getSpotlights = state => state.get('spotlights');

export const selectors = {
  getSpotlights: createSelector([getSpotlights], s => s)
};
