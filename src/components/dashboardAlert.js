import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

const DashboardAlert = ({enrollments, user}) => {
  let content;

  if (!content) {
    return null;
  }

  return <div className="dashboard-alert"></div>;
};

DashboardAlert.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func)
};
