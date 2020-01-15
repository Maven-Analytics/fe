import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  HEALTH_SET: 'HEALTH_SET',
  OFFMENU_TOGGLE: 'OFFMENU_TOGGLE',
  OFFMENU_CLOSE: 'OFFMENU_CLOSE',
  STATE_RESET: 'STATE_RESET',
  MODAL_OPEN: 'MODAL_OPEN',
  MODAL_CLOSE: 'MODAL_CLOSE',
  PRODUCT_SORT_SET: 'PRODUCT_SORT_SET',
  PRODUCT_SORT_RESET: 'PRODUCT_SORT_RESET',
  THINKIFIC_HEALTH_REQUEST: 'THINKIFIC_HEALTH_REQUEST',
  THINKIFIC_HEALTH_SUCCESS: 'THINKIFIC_HEALTH_SUCCESS',
  THINKIFIC_HEALTH_FAILURE: 'THINKIFIC_HEALTH_FAILURE'
};

export const actions = {
  healthSet: (key, healthy) => utils.action(types.HEALTH_SET, {key, healthy}),
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
  },
  health: {
    thinkific: true
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.HEALTH_SET:
    return state.setIn(['health', action.payload.key], action.payload.healthy);
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
      .set('productSort', state.get('productSort'))
      .set('health', state.get('health'));

  default:
    return state;
  }
};

const getState = state => state.get('state');

export const selectors = {
  getState: createSelector([getState], s => s)
};
