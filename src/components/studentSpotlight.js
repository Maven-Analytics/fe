import React from 'react';
import PropTypes from 'prop-types';

import Image from './image';
import Markdown from './markdown';
import MaIcon from './maIcon';

const StudentSpotlight = ({name, title, location, quote, courses, callout, image}) => {
  return (
    <div className="student-spotlight">
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="student-spotlight__header">
            <Image src={image}/>
            <div className="meta">
              <p className="name">{name}</p>
              <p className="title">{title}</p>
              <p className="location">{location}</p>
            </div>
          </div>
          <div className="student-spotlight__courses">
            <p>Courses Completed</p>
            <ul>
              {courses.map(course => (
                <li key={course}>
                  <MaIcon icon="check"/>
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <Markdown className="student-spotlight__quote" content={quote}/>
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
  quote: PropTypes.string,
  courses: PropTypes.array,
  callout: PropTypes.string,
  image: PropTypes.string
};

StudentSpotlight.defaultProps = {
  courses: []
};

export default StudentSpotlight;
