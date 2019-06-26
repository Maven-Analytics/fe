import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';
import {plans} from '../../constants';

export const types = {
  CHECKOUT_REQUEST: 'CHECKOUT_REQUEST',
  CHECKOUT_SUCCESS: 'CHECKOUT_SUCCESS',
  CHECKOUT_FAILURE: 'CHECKOUT_FAILURE',
  GET_CHECKOUT_REQUEST: 'GET_CHECKOUT_REQUEST',
  GET_CHECKOUT_SUCCESS: 'GET_CHECKOUT_SUCCESS',
  GET_CHECKOUT_FAILURE: 'GET_CHECKOUT_FAILURE'
};

export const actions = {
  setPlan: (plan, ctx) => utils.action(types.CHECKOUT_REQUEST, {plan, ctx}),
  getCheckout: obj => utils.action(types.GET_CHECKOUT_REQUEST, obj)
};

const initialState = utils.initialState({
  plan: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.CHECKOUT_REQUEST:
  case types.GET_CHECKOUT_SUCCESS:
    return state.merge(fromJS(action.payload).delete('iat').delete('exp'));

  default:
    return state;
  }
};

const getCheckout = state => state.get('checkout');

export const selectors = {
  getCheckout: createSelector([getCheckout], s => s)
};
