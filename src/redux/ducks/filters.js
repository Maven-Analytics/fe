import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';
import {setFiltersFromQuery, getActiveFilters} from '../../utils/filterHelpers';

export const types = {
  FILTER_OPTIONS_SET: 'FILTER_OPTIONS_SET',
  FILTERS_ACTIVE_SET: 'FILTERS_ACTIVE_SET',
  FILTERS_INIT: 'FILTERS_INIT',
  FILTER_ADD: 'FILTER_ADD',
  FILTERS_RESET: 'FILTERS_RESET'
};

export const actions = {
  filterAdd: obj => utils.action(types.FILTER_ADD, obj),
  filtersInit: query => utils.action(types.FILTERS_INIT, {query}),
  filtersActiveSet: obj => utils.action(types.FILTERS_ACTIVE_SET, obj)
};

const initialState = utils.initialState({
  tools: {
    label: 'Tools',
    key: 'tools',
    id: 'tools',
    options: [],
    active: []
  },
  paths: {
    label: 'Learning Paths',
    key: ['paths'],
    id: 'paths',
    options: [],
    active: []
  },
  instructors: {
    label: 'Instructors',
    key: ['author', 'slug'],
    id: 'instructors',
    options: [],
    active: []
  },
  skills: {
    label: 'Skills',
    key: 'skills',
    id: 'skills',
    options: [],
    active: []
  },
  length: {
    label: 'Length',
    key: 'length',
    id: 'length',
    range: true,
    active: []
  },
  status: {
    label: 'Status',
    key: 'status',
    id: 'status',
    options: ['Not Started', 'In Progress', 'Completed'],
    active: []
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.FILTERS_ACTIVE_SET:
    return state.update(s => {
      const newFilters = fromJS(action.payload);

      newFilters.forEach((value, key) => {
        s = s.setIn([key, 'active'], value);
      });

      return s;
    });
  case types.FILTER_OPTIONS_SET:
    return state.update(s => {
      action.payload.forEach((value, key) => {
        s = s.setIn([key, 'options'], fromJS(value));
      });

      return s;
    });
  case types.FILTERS_INIT:
    return utils.stateMapMerge(state, setFiltersFromQuery(fromJS(action.payload.query), state));
  default:
    return state;
  }
};

const getFilters = state => state.get('filters');

export const selectors = {
  getFilters: createSelector([getFilters], filters => filters),
  getActiveFilters: createSelector([getFilters], filters => getActiveFilters(filters))
};
