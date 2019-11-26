import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';

export const types = {
  CHECKOUT_SET_PLAN_REQUEST: 'CHECKOUT_SET_PLAN_REQUEST',
  CHECKOUT_SET_PLAN_SUCCESS: 'CHECKOUT_SET_PLAN_SUCCESS',
  CHECKOUT_SET_PLAN_FAILURE: 'CHECKOUT_SET_PLAN_FAILURE'
};

export const actions = {
  checkoutSetPlan: (plan, ctx) => utils.action(types.CHECKOUT_SET_PLAN_REQUEST, {plan, ctx})
};

const initialState = utils.initialState({
  plan: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.CHECKOUT_SET_PLAN_REQUEST:
    return state.merge(fromJS(action.payload).delete('iat').delete('exp'));

  default:
    return state;
  }
};

const getCheckout = state => state.get('checkout');

export const selectors = {
  getCheckout: createSelector([getCheckout], s => s)
};
