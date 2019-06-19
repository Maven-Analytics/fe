import React from 'react';
import PropTypes from 'prop-types';

const CourseBanner = ({children}) => {
  return (
    <div className="course-banner">
      {children}
    </div>
  );
};

CourseBanner.propTypes = {
  children: PropTypes.node.isRequired
};

export default CourseBanner;
