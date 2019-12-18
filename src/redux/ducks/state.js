import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';

export const types = {
  OFFMENU_TOGGLE: 'OFFMENU_TOGGLE',
  OFFMENU_CLOSE: 'OFFMENU_CLOSE',
  STATE_RESET: 'STATE_RESET',
  MODAL_OPEN: 'MODAL_OPEN',
  MODAL_CLOSE: 'MODAL_CLOSE',
  PRODUCT_SORT_SET: 'PRODUCT_SORT_SET',
  PRODUCT_SORT_RESET: 'PRODUCT_SORT_RESET'
};

export const actions = {
  offmenuToggle: obj => utils.action(types.OFFMENU_TOGGLE, obj),
  offmenuClose: obj => utils.action(types.OFFMENU_CLOSE, obj),
  modalClose: (key, delay) => utils.action(types.MODAL_CLOSE, {key, delay}),
  modalOpen: (key, data) => utils.action(types.MODAL_OPEN, {key, data}),
  stateReset: () => utils.action(types.STATE_RESET),
  setProductSort: obj => utils.action(types.PRODUCT_SORT_SET, obj),
  resetProductSort: obj => utils.action(types.PRODUCT_SORT_RESET, obj)
};

const initialState = utils.initialState({
  mobileMenu: false,
  headerUser: false,
  pathDrawer: {
    open: false,
    data: null
  },
  courseDrawer: {
    open: false,
    data: null
  },
  video: {
    open: false,
    data: null
  },
  assessment: {
    open: false,
    data: null
  },
  pageModal: {
    open: false,
    data: null
  },
  filters: false,
  productSort: {
    key: 'surveyWeight',
    order: 'DESC'
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
  case types.OFFMENU_CLOSE:
    return state.set(action.payload, false);
  case types.PRODUCT_SORT_SET:
    return state.setIn(['productSort', 'key'], action.payload.key || state.getIn(['productSort', 'key']))
      .setIn(['productSort', 'order'], action.payload.order.toUpperCase() || state.getIn(['productSort', 'order']));
  case types.PRODUCT_SORT_RESET:
    return state.set('productSort', initialState.get('productSort'));
  case types.STATE_RESET:
    return initialState
      .set('productSort', state.get('productSort'));

  default:
    return state;
  }
};

const getState = state => state.get('state');

export const selectors = {
  getState: createSelector([getState], s => s)
};
