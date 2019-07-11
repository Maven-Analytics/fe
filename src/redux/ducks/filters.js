import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';
import {selectors as courseSelectors} from './courses';
import {setFiltersFromQuery, getFilteredCourses} from '../../utils/filterHelpers';

export const types = {
  FILTERS_SET: 'FILTERS_SET',
  FILTERS_INIT: 'FILTERS_INIT',
  FILTER_ADD: 'FILTER_ADD',
  FILTER_RESET: 'FILTER_RESET'
};

export const actions = {
  filterAdd: obj => utils.action(types.FILTER_ADD, obj),
  filtersInit: query => utils.action(types.FILTERS_INIT, {query})
};

const initialState = utils.initialState([
  {
    label: 'Tools',
    key: 'tools',
    id: 'tools',
    options: [],
    active: []
  },
  {
    label: 'Learning Paths',
    key: 'paths',
    id: 'paths',
    options: [],
    active: []
  },
  {
    label: 'Instructors',
    key: ['author', 'id'],
    id: 'instructors',
    options: [],
    active: []
  },
  {
    label: 'Skills',
    key: 'skills',
    id: 'skills',
    options: [],
    active: []
  },
  {
    label: 'Length',
    key: 'length',
    id: 'length',
    range: true,
    active: []
  }
]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.FILTERS_SET:
    return utils.stateMerge(state, action.payload);

  case types.FILTERS_INIT:
    return utils.stateMerge(state, setFiltersFromQuery(fromJS(action.payload.query), state));
  default:
    return state;
  }
};

const getFilters = state => state.get('filters');

export const selectors = {
  getFilters: createSelector([getFilters], filters => filters),
  getFilteredCourses: createSelector([courseSelectors.getCourses, getFilters], (courses, filters) => getFilteredCourses(filters, courses))
};
