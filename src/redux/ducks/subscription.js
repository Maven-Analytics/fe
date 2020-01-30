import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  SUBSCRIPTION_GET_REQUEST: 'SUBSCRIPTION_GET_REQUEST',
  SUBSCRIPTION_GET_SUCCESS: 'SUBSCRIPTION_GET_SUCCESS',
  SUBSCRIPTION_GET_FAILURE: 'SUBSCRIPTION_GET_FAILURE',
  SUBSCRIPTION_SET: 'SUBSCRIPTION_SET',
  SUBSCRIPTION_RESET: 'SUBSCRIPTION_RESET'
};

export const actions = {
  subscriptionGet: obj => utils.action(types.SUBSCRIPTION_GET_REQUEST, obj),
  subscriptionSet: obj => utils.action(types.SUBSCRIPTION_SET, obj)
};

const initialState = utils.initialState({
  subscription_status: null,
  current: {},
  subscriptions: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SUBSCRIPTION_SET:
  case types.SUBSCRIPTION_GET_SUCCESS:
    return fromJS(action.payload);
  case types.SUBSCRIPTION_RESET:
    return initialState;
  default:
    return state;
  }
};

const getSubscription = state => state.get('subscription');
const getSubscriptions = state => state.getIn(['subscription', 'subscriptions']);
const getCurrentSubscription = state => state.getIn(['subscription', 'current']);
const getSubscriptionStatus = state => state.getIn(['subscription', 'status']);

export const selectors = {
  getSubscription: createSelector(
    [getSubscription],
    s => s
  ),
  getSubscriptions: createSelector(
    [getSubscriptions],
    s => s
  ),
  getCurrentSubscription: createSelector(
    [getCurrentSubscription],
    s => s
  ),
  getSubscriptionStatus: createSelector(
    [getSubscriptionStatus],
    s => s
  )
};
