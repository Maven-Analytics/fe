import React from 'react';
import PropTypes from 'prop-types';

import ImageContentful from './imageContentful';

const CourseAuthor = ({name, thumbnail}) => {
  return (
    <span className="course-author">
      <ImageContentful image={thumbnail}/>
      <span className="name">{name}</span>
    </span>
  );
};

CourseAuthor.propTypes = {
  name: PropTypes.string,
  thumbnail: PropTypes.string
};

export default CourseAuthor;
