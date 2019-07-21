import {createSelector} from 'reselect';
import {fromJS, List} from 'immutable';

import * as utils from '../../utils/duckHelpers';

export const types = {
  ACTIVE_FILTER_ADD: 'ACTIVE_FILTER_ADD',
  ACTIVE_FILTER_REMOVE: 'ACTIVE_FILTER_REMOVE'
};

export const actions = {
  activeFilterAdd: obj => utils.action(types.ACTIVE_FILTER_ADD, obj),
  activeFilterRemove: obj => utils.action(types.ACTIVE_FILTER_REMOVE, obj)
  // filterAdd: obj => utils.action(types.FILTER_ADD, obj),
  // filtersInit: query => utils.action(types.FILTERS_INIT, {query}),
  // filtersActiveSet: obj => utils.action(types.FILTERS_ACTIVE_SET, obj)
};

const initialState = utils.initialState({
  'fields.filters.sys.id': [],
  'length[gt]': [],
  'length[lt]': [],
  enrollmentFilter: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.ACTIVE_FILTER_ADD:
    return state.update(action.payload.key, u => {
      return u.contains(action.payload.filter) ? u : u.push(action.payload.filter);
    });
  case types.ACTIVE_FILTER_REMOVE:
    return state.update(action.payload.key, u => {
      if (!u) {
        return;
      }

      return u.delete(u.indexOf(action.payload.filter));
    });
  // case types.FILTERS_ACTIVE_SET:
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

const getActiveFilters = state => state.get('activeFilters');

export const selectors = {
  getActiveFilters: createSelector([getActiveFilters], filters => filters)
};
