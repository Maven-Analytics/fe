import React from 'react';
import PropTypes from 'prop-types';

import Loader from './loader';

const DashboardCard = ({size, children, title, loading, style}) => {
  const classList = ['dashboard-card'];

  if (size) {
    classList.push(`dashboard-card--${size}`);
  }

  if (loading) {
    classList.push('loading');
  }

  return (
    <div className={classList.join(' ')} style={style}>
      {loading ? <Loader loading={loading}/> : null}
      {title && title !== '' ? <h4 className="dashboard-card__title">{title}</h4> : null}
      {children}
    </div>
  );
};

DashboardCard.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  title: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.object
};

export default DashboardCard;
