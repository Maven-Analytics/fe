import React from 'react';
import PropTypes from 'prop-types';

const DashboardCard = ({size, children, title}) => {
  const classList = ['dashboard-card'];

  if (size) {
    classList.push(`dashboard-card--${size}`);
  }

  return (
    <div className={classList.join(' ')}>
      {title && title !== '' ? <h4 className="dashboard-card__title">{title}</h4> : null}
      {children}
    </div>
  );
};

DashboardCard.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string
};

export default DashboardCard;
