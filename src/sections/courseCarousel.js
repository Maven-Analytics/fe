import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import CourseCard from '../components/courseCard';
import TrackVisibility from '../components/trackVisibility';
import {isLg, isMd, isSm} from '../components/mediaQuery';
import withWindowSize from '../components/withWindowSize';
import {prettyPercent} from '../utils/componentHelpers';

const CourseCarousel = ({courses, title, eyelash, description, helperText, separator}) => {
  if (!courses || !courses.count()) {
    return null;
  }

  return (
    <div className="course-carousel">
      <header>
        {title ? <h2>{title} <span>{eyelash}</span></h2> : null}
        {description ? <p>{description}</p> : null}
        {helperText ? <small>{helperText}</small> : null }
      </header>
      <Carousel
        options={{
          pageDots: false,
          groupCells: isLg() ? 3 : isSm() ? 2 : 1
        }}
      >
        {courses.map(course => {
          let match;

          if (course.get('match')) {
            match = `${prettyPercent(course.get('match'))}%`;
          }

          return (
            <CarouselSlide key={course.get('id')}>
              <CourseCard
                match={match}
                course={course}
              />
            </CarouselSlide>
          );
        })}
      </Carousel>
      {separator ? <hr/> : null}
    </div>
  );
};

CourseCarousel.propTypes = {
  title: PropTypes.string,
  eyelash: PropTypes.string,
  description: PropTypes.string,
  helperText: PropTypes.string,
  courses: ImmutablePropTypes.list,
  separator: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.func)
};

CourseCarousel.defaultProps = {
  courses: List()
};

export default withWindowSize(CourseCarousel);
