import {List, Map, fromJS, isImmutable} from 'immutable';

export const getActiveFilters = filters => {
  return filters
    .filter(f => f.get('active') && f.get('active').count())
    .filter(f => !f.isEmpty());
};

export const courseHasFilter = (filter, course) => {
  const key = filter.get('key');
  const value = List.isList(key) ? course.getIn([...key.toJS()]) : course.get(key);

  if (List.isList(value)) {
    return filter
      .get('active')
      .reduce((contains, activeVal) => {
        if (value.map(v => v && v.toLowerCase()).contains(activeVal.toLowerCase())) {
          contains = true;
        }

        return contains;
      }, false);
  }

  if (filter.get('range')) {
    return filter
      .get('active')
      .reduce((contains, val, index) => {
        if (typeof value === 'undefined') {
          return false;
        }

        if (index === 0 && value < val) {
          contains = false;
        }

        if (index === 1 && value > val) {
          contains = false;
        }

        return contains;
      }, true);
  }

  return filter
    .get('active')
    .reduce((contains, activeVal) => {
      if (value && value.toLowerCase() === activeVal.toLowerCase()) {
        contains = true;
      }

      return contains;
    }, false);
};

export const courseHasFilters = (filters, course) => {
  const totalfilters = filters
    .map(f => f.get('active'))
    .reduce((list, f) => list.concat(f), List())
    .count();

  return filters
    .reduce((contains, filter) => {
      const hasFilter = courseHasFilter(filter, course);

      if (hasFilter) {
        return filter.get('range') ? contains.concat(filter.get('active').map(() => true)) : contains.push(true);
      }

      return contains.push(false);
    }, List())
    .filter(c => c)
    .count() === totalfilters;
};

export const getFilteredCourses = (filters, courses) => {
  const activeFilters = getActiveFilters(filters);

  if (!activeFilters || !activeFilters.count()) {
    return courses;
  }

  return courses
    .filter(course => {
      return courseHasFilters(activeFilters, course);
    });
};

export const setFiltersFromQuery = (query, filters) => {
  if (!isImmutable(query)) {
    query = fromJS(query);
  }

  return query.reduce((map, queryVal, id) => {
    const filterIndex = map.findIndex(f => f.get('id') === id);

    if (filterIndex > -1) {
      // If the value is already a list, return the value, else create a list out of the single value
      let val = List.isList(queryVal) ? queryVal : List([queryVal]);
      const filter = filters.get(filterIndex);

      if (filter.get('range')) {
        val = val.map(v => parseFloat(v));
      }

      return map.setIn([filterIndex, 'active'], val);
    }

    return map;
  }, filters);
};
