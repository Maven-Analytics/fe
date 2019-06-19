import React from 'react';
import PropTypes from 'prop-types';

import Image from './image';

const CourseAuthor = ({name, thumbnail}) => {
  return (
    <span className="course-author">
      <Image src={thumbnail}/>
      <span className="name">{name}</span>
    </span>
  );
};

CourseAuthor.propTypes = {
  name: PropTypes.string,
  thumbnail: PropTypes.string
};

export default CourseAuthor;
