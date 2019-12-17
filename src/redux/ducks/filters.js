import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';

export const types = {
  FILTERS_GET_REQUEST: 'FILTERS_GET_REQUEST',
  FILTERS_GET_SUCCESS: 'FILTERS_GET_SUCCESS',
  FILTERS_GET_FAILURE: 'FILTERS_GET_FAILURE'
};

export const actions = {
  filtersGet: obj => utils.action(types.FILTERS_GET_REQUEST, obj)
  // FilterAdd: obj => utils.action(types.FILTER_ADD, obj),
  // filtersInit: query => utils.action(types.FILTERS_INIT, {query}),
  // filtersActiveSet: obj => utils.action(types.FILTERS_ACTIVE_SET, obj)
};

const initialState = utils.initialState({
  Tools: [],
  'Learning Paths': [],
  Instructors: [],
  Skills: [],
  Status: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.FILTERS_GET_SUCCESS:
    return state.update(s => {
      action.payload.forEach(filter => {
        s = s.update(filter.group, g => g.find(f => f.get('id') === filter.id) ? g : g.push(fromJS(filter)));
      });

      return s;
    });
    // Case types.FILTERS_ACTIVE_SET:
    //   return state.update(s => {
    //     const newFilters = fromJS(action.payload);

    //     newFilters.forEach((value, key) => {
    //       s = s.setIn([key, 'active'], value);
    //     });

    //     return s;
    //   });
    // case types.FILTER_OPTIONS_SET:
    //   return state.update(s => {
    //     action.payload.forEach((value, key) => {
    //       s = s.setIn([key, 'options'], fromJS(value));
    //     });

  //     return s;
  //   });
  // case types.FILTERS_INIT:
  //   return utils.stateMapMerge(state, setFiltersFromQuery(fromJS(action.payload.query), state));
  default:
    return state;
  }
};

const getFilters = state => state.get('filters');

export const selectors = {
  getFilters: createSelector([getFilters], filters => filters)
  // GetActiveFilters: createSelector([getFilters], filters => getActiveFilters(filters))
};
