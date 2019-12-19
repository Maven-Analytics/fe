import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';

export const types = {
  SUBSCRIPTION_GET_REQUEST: 'SUBSCRIPTION_GET_REQUEST',
  SUBSCRIPTION_GET_SUCCESS: 'SUBSCRIPTION_GET_SUCCESS',
  SUBSCRIPTION_GET_FAILURE: 'SUBSCRIPTION_GET_FAILURE'
};

export const actions = {
  subscriptionGet: obj => utils.action(types.SUBSCRIPTION_GET_REQUEST, obj)
};

const initialState = utils.initialState({
  status: null,
  current: {},
  subscriptions: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SUBSCRIPTION_GET_SUCCESS:
    return fromJS(action.payload);
  default:
    return state;
  }
};

const getSubscriptions = state => state.getIn(['subscription', 'subscriptions']);
const getCurrentSubscription = state => state.getIn(['subscription', 'current']);
const getSubscriptionStatus = state => state.getIn(['subscription', 'status']);

export const selectors = {
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
