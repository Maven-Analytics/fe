import * as qs from 'query-string';

const pathToQuery = path => {
  const search = path.split('?')[1];

  if (!search) {
    return {};
  }

  let initFilters = qs.parse(search) || {};

  const keys = Object.keys(initFilters);

  keys.forEach(key => {
    let value = initFilters[key];
    if (typeof value === 'string') {
      if (key === 'fields.length[lt]' || key === 'fields.length[gt]') {
        value = parseInt(value, 10);
      }

      value = [value];
    }

    initFilters[key] = value;
  });

  return initFilters;
};

export default pathToQuery;
