import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

const DashboardGrid = ({children, horizontal, vertical}) => {
  const classList = ['dashboard-grid'];

  if (horizontal) {
    classList.push('dashboard-grid--horizontal');
  }

  if (vertical) {
    classList.push('dashboard-grid--vertical');
  }

  return (
    <div className={classList.join(' ')}>
      {children.map((child, index) => (
        <div key={index} className="dashboard-grid__item">
          {child}
        </div>
      ))}
    </div>
  );
};

DashboardGrid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), ImmutablePropTypes.list]),
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool
};

export default DashboardGrid;
