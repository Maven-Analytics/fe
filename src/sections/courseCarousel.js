import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import CourseCard from '../components/courseCard';
import TrackVisibility from '../components/trackVisibility';
import {isLg} from '../components/mediaQuery';
import withWindowSize from '../components/withWindowSize';
import {prettyPercent} from '../utils/componentHelpers';

const CourseCarousel = ({courses, title, eyelash, description, helperText, separator}) => {
  return (
    <TrackVisibility className="course-carousel">
      <header>
        {title ? <h2>{title} <span>{eyelash}</span></h2> : null}
        {description ? <p>{description}</p> : null}
        {helperText ? <small>{helperText}</small> : null }
      </header>
      <Carousel
        options={{
          pageDots: false,
          groupCells: isLg() ? 3 : 2
        }}
      >
        {courses.map(course => {
          let match;

          if (course.get('percentage')) {
            match = `${prettyPercent(course.get('percentage'))}%`;
          }

          return (
            <CarouselSlide key={course.get('id')}>
              <CourseCard match={match} course={course}/>
            </CarouselSlide>
          );
        })}
      </Carousel>
      {separator ? <hr/> : null}
    </TrackVisibility>
  );
};

CourseCarousel.propTypes = {
  title: PropTypes.string,
  eyelash: PropTypes.string,
  description: PropTypes.string,
  helperText: PropTypes.string,
  courses: ImmutablePropTypes.list,
  separator: PropTypes.bool
};

CourseCarousel.defaultProps = {
  courses: List()
};

export default withWindowSize(CourseCarousel);
