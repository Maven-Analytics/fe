import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Map} from 'immutable';

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
  thumbnail: ImmutablePropTypes.map
};

CourseAuthor.defaultProps = {
  thumbnail: Map()
};

export default CourseAuthor;
