import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';

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
    return fromJS(action.payload);
  default:
    return state;
  }
};

const getPaths = state => state.get('paths');

export const selectors = {
  getPaths: createSelector([getPaths], p => p)
};
