import {List, fromJS, isImmutable} from 'immutable';

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
      .filter(activeVal => value.map(v => v && v.toLowerCase()).contains(activeVal.toLowerCase()))
      // AND FILTERING
      // .count() === filter.get('active').count();
      // OR FILTERING
      .count() > 0;
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
    .filter(activeVal => value && value.toLowerCase() === activeVal.toLowerCase())
    // AND FILTERING
    // .count() === filter.get('active').count();
    // OR FILTERING
    .count() > 0;
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
        // return filter.get('range') ? contains.concat(filter.get('active').map(() => true)) : contains.push(true);
        return contains.concat(filter.get('active').map(() => true));
      }

      return contains.push(false);
    }, List())
    .filter(c => c)
    // AND FILTERING
    // .count() === filter.get('active').count();
    // OR FILTERING
    .count() > 0;
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

  return filters.reduce((map, filter, id) => {
    const queryVal = query.get(id);

    if (queryVal) {
      // If the value is already a list, return the value, else create a list out of the single value
      let val = List.isList(queryVal) ? queryVal : List([queryVal]);
      const filter = filters.get(id);

      if (filter.get('range')) {
        val = val.map(v => parseFloat(v));
      }

      return map.setIn([id, 'active'], val);
    }

    return map.setIn([id, 'active'], List());
  }, filters);
};

export const getFiltersFromCourses = courses => {
  if (!courses) {
    return List();
  }

  const tools = courses
    .reduce((list, course) => {
      return list.concat(course.get('tools'));
    }, List())
    .filter(t => t)
    .reduce((list, tool) => list.includes(tool) ? list : list.push(tool), List());

  const instructors = courses
    .reduce((list, course) => {
      return list.push(course.getIn(['author', 'slug']));
    }, List())
    .filter(t => t)
    .reduce((list, tool) => list.includes(tool) ? list : list.push(tool), List());

  const skills = courses
    .reduce((list, course) => {
      return list.concat(course.get('skills'));
    }, List())
    .filter(t => t)
    .reduce((list, tool) => list.includes(tool) ? list : list.push(tool), List());

  return fromJS({
    tools,
    instructors,
    skills
  });
};
