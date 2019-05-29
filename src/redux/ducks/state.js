import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  OFFMENU_TOGGLE: 'OFFMENU_TOGGLE'
};

export const actions = {
  offmenuToggle: obj => utils.action(types.OFFMENU_TOGGLE, obj)
};

const initialState = utils.initialState({
  mobileMenu: false
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.OFFMENU_TOGGLE:
    return state.set(action.payload, !state.get(action.payload));

  default:
    return state;
  }
};

const getState = state => state.get('state');

export const selectors = {
  getState: createSelector([getState], s => s)
};
