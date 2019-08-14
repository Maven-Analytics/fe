import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  FAQS_GET_REQUEST: 'FAQS_GET_REQUEST',
  FAQS_GET_SUCCESS: 'FAQS_GET_SUCCESS',
  FAQS_GET_FAILURE: 'FAQS_GET_FAILURE'
};

export const actions = {
  faqsGet: obj => utils.action(types.FAQS_GET_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.FAQS_GET_SUCCESS:
    return utils.stateListMerge(state, action.payload);
  default:
    return state;
  }
};

const getFaqs = state => state.get('faq');

export const selectors = {
  getFaqs: createSelector([getFaqs], p => p)
};
