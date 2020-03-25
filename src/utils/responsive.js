export const gridBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

export const mediaBreakpointUp = name => {
  const min = gridBreakpoints[name];

  if (min) {
    return `@media (min-width: ${min}px)`;
  }
};

export const mediaBreakpointOnly = name => {
  const min = gridBreakpoints[name];
  const keys = Object.keys(gridBreakpoints);
  const index = keys.indexOf(name);

  const max = gridBreakpoints[keys[index + 1]] - 1 || null;

  let query = `@media(min-width: ${min}px)`;

  if (max) {
    query += `and (max-width: ${max}px)`;
  }

  return query;
};

export const collapseUp = () => {
  return `@media (min-width: ${gridBreakpoints.lg}px)`;
};
