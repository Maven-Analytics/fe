import {fromJS} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import ImageContentful from './imageContentful';
import MaIcon from './maIcon';
import RichText from './richText';

const StudentSpotlight = ({name, title, location, description, completedCourses, callout, image}) => {
  return (
    <div className="student-spotlight">
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="student-spotlight__header">
            <ImageContentful image={fromJS(image)}/>
            <div className="meta">
              <p className="name">{name}</p>
              <p className="title">{title}</p>
              <p className="location">{location}</p>
            </div>
          </div>
          <div className="student-spotlight__courses">
            <p>Courses Completed</p>
            <ul>
              {completedCourses.map(course => (
                <li key={course}>
                  <MaIcon icon="check"/>
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className="student-spotlight__quote">
            <RichText content={fromJS(description)}/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 offset-md-4">
          <div className="student-spotlight__callout">{callout}</div>
        </div>
      </div>
    </div>
  );
};

StudentSpotlight.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.object,
  completedCourses: PropTypes.array,
  callout: PropTypes.string,
  image: PropTypes.object
};

StudentSpotlight.defaultProps = {
  completedCourses: []
};

export default StudentSpotlight;
