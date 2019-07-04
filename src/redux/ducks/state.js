import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';

export const types = {
  OFFMENU_TOGGLE: 'OFFMENU_TOGGLE',
  STATE_RESET: 'STATE_RESET',
  MODAL_OPEN: 'MODAL_OPEN',
  MODAL_CLOSE: 'MODAL_CLOSE'
};

export const actions = {
  offmenuToggle: obj => utils.action(types.OFFMENU_TOGGLE, obj),
  modalClose: (key, delay) => utils.action(types.MODAL_CLOSE, {key, delay}),
  modalOpen: (key, data) => utils.action(types.MODAL_OPEN, {key, data}),
  stateReset: () => utils.action(types.STATE_RESET)
};

const initialState = utils.initialState({
  mobileMenu: false,
  headerUser: false,
  pathDrawer: {
    open: false,
    data: null
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.MODAL_OPEN:
    return state.set(action.payload.key, fromJS({
      open: true,
      data: action.payload.data
    }));
  case types.MODAL_CLOSE:
    return state.update(u => {
      return u.setIn([action.payload.key, 'open'], false);
    });
  case types.OFFMENU_TOGGLE:
    return state.set(action.payload, !state.get(action.payload));
  case types.STATE_RESET:
    return initialState;

  default:
    return state;
  }
};

const getState = state => state.get('state');

export const selectors = {
  getState: createSelector([getState], s => s)
};
