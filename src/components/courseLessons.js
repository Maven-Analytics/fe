import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import RichText from './richText';

const CourseLessons = ({lessons}) => {
  return (
    <div className="course-lessons">
      <RichText content={lessons}/>
    </div>
  );
};

CourseLessons.propTypes = {
  lessons: ImmutablePropTypes.map.isRequired
};

export default CourseLessons;
