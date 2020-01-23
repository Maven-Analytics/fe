import {List, Map} from 'immutable';
import * as PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import ImageContentful from './imageContentful';
import MaIcon from './maIcon';
import Markdown from './markdown';

const StudentSpotlight = ({callout, completedCourses, image, location, name, text, title}) => {
  return (
    <div className="student-spotlight">
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="student-spotlight__header">
            <ImageContentful image={image}/>
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
            <Markdown content={text}/>
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
  callout: PropTypes.string,
  completedCourses: ImmutablePropTypes.list,
  image: ImmutablePropTypes.map,
  location: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string
};

StudentSpotlight.defaultProps = {
  completedCourses: List([]),
  image: Map()
};

export default StudentSpotlight;
