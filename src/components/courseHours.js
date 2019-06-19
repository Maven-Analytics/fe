import React from 'react';
import PropTypes from 'prop-types';

const CourseHours = ({hours, text}) => {
  return (
    <span className="course-hours">
      <span className="hours">{hours}</span>
      <span className="text">{text}</span>
    </span>
  );
};

CourseHours.propTypes = {
  hours: PropTypes.number,
  text: PropTypes.string
};

CourseHours.defaultProps = {
  hours: 0,
  text: 'course hours'
};

export default CourseHours;
