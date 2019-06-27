import React from 'react';
import PropTypes from 'prop-types';

const DashboardCard = ({size, children}) => {
  const classList = ['dashboard-card'];

  if (size) {
    classList.push(`dashboard-card--${size}`);
  }

  return (
    <div className={classList.join(' ')}>
      {children}
    </div>
  );
};

DashboardCard.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string
};

export default DashboardCard;
