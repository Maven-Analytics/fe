import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Map} from 'immutable';
import Link from 'next/link';

import ImageContentful from './imageContentful';
import CourseHours from './courseHours';
import CourseAuthor from './courseAuthor';
import CourseBanner from './courseBanner';
import MaIcon from './maIcon';
import {Routes} from '../routes';

const CourseCard = ({course, condensed, match, recommended}) => {
  const classList = ['course-card'];

  if (condensed) {
    classList.push('course-card--condensed');
  }

  return (
    <div className={classList.join(' ')}>
      {match && condensed === false ? (
        <CourseBanner>
          <span className="text">Match</span>
          <span className="value">{match}</span>
        </CourseBanner>
      ) : null}
      {recommended && condensed === false ? (
        <CourseBanner>
          <MaIcon icon="recommended"/>
          <span className="text">{recommended}</span>
        </CourseBanner>
      ) : null}
      <div className="course-card__image">
        <ImageContentful cover image={course.get('thumbnail')}/>
        {condensed === false ? (
          <div className="badge">
            <ImageContentful image={course.get('badge')}/>
          </div>
        ) : null}
      </div>
      <div className="course-card__content">
        <h4>{course.get('title')}</h4>
        {condensed === false ? (
          <p>{course.get('excerpt')}</p>
        ) : null}
      </div>
      <div className="course-card__footer">
        <span>
          <Link href={`${Routes.Course}/${course.get('slug')}`}>
            <a className="btn">View Course</a>
          </Link>
        </span>
        {condensed === false ? (
          <CourseHours hours={course.get('length')}/>
        ) : null}
        <CourseAuthor name={course.getIn(['author', 'name'])} thumbnail={course.getIn(['author', 'thumbnail'])}/>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: ImmutablePropTypes.map,
  condensed: PropTypes.bool,
  match: PropTypes.string,
  recommended: PropTypes.string
};

CourseCard.defaultProps = {
  course: Map(),
  condensed: false
};

export default CourseCard;
