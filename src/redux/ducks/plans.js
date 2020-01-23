import {createSelector} from 'reselect';

import {plans} from '../../constants';
import * as utils from '../../utils/duckHelpers';

export const types = {};

export const actions = {
  updatePlan: obj => utils.action(types.SELECTED_PLAN_UPDATE, obj)
};

const initialState = utils.initialState(plans);

export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const getPlans = state => state.get('plans');

export const selectors = {
  getPlans: createSelector([getPlans], p => p)
};
