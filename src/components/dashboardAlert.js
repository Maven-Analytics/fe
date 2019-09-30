import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

const DashboardAlert = ({enrollments, user}) => {
  let content;

  // If the user has enrollments, but all of themm are expired show a message
  if (enrollments.count() && user.get('enrolled') === false) {
  }

  if (!content) {
    return null;
  }

  return <div className="dashboard-alert"></div>;
};

DashboardAlert.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func)
};
