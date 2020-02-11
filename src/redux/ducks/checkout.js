import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  CHECKOUT_SET_PLAN_REQUEST: 'CHECKOUT_SET_PLAN_REQUEST',
  CHECKOUT_SET_PLAN_SUCCESS: 'CHECKOUT_SET_PLAN_SUCCESS',
  CHECKOUT_SET_PLAN_FAILURE: 'CHECKOUT_SET_PLAN_FAILURE',
  CHECKOUT_UNSET: 'CHECKOUT_UNSET'
};

export const actions = {
  checkoutSetPlan: (plan, ctx) => utils.action(types.CHECKOUT_SET_PLAN_REQUEST, {plan, ctx}),
  checkoutUnset: () => utils.action(types.CHECKOUT_UNSET)
};

const initialState = utils.initialState({
  plan: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.CHECKOUT_SET_PLAN_REQUEST:
    return state.merge(fromJS(action.payload).delete('iat').delete('exp'));
  case types.CHECKOUT_UNSET:
    return initialState;
  default:
    return state;
  }
};

const getCheckout = state => state.get('checkout');

export const selectors = {
  getCheckout: createSelector([getCheckout], s => s)
};
