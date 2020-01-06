import {List} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

const DashboardGrid = ({children, horizontal, vertical, cols}) => {
  const classList = ['dashboard-grid'];

  if (horizontal) {
    classList.push('dashboard-grid--horizontal');
  }

  if (vertical) {
    classList.push('dashboard-grid--vertical');
  }

  if (cols) {
    classList.push(`dashboard-grid--${cols}-col`);
  }

  return (
    <div className={classList.join(' ')}>
      {List.isList(children) ? children.map((child, index) => (
        <div key={index} className="dashboard-grid__item">
          {child}
        </div>
      )) : children}
    </div>
  );
};

DashboardGrid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.element), ImmutablePropTypes.list]),
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  cols: PropTypes.number
};

export default DashboardGrid;
