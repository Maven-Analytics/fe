import React from 'react';
import PropTypes from 'prop-types';

const CourseFilters = ({title}) => (
  <div className="course-filters">
    <h4>{title}</h4>
  </div>
);

CourseFilters.propTypes = {
  title: PropTypes.string
};

CourseFilters.defaultProps = {
  title: 'Filter Results'
};

export default CourseFilters;
