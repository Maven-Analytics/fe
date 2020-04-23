import {List} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import Carousel from '#root/components/carousel';
import CarouselSlide from '#root/components/carouselSlide';
import CourseCard from '#root/components/courseCard';
import {isLg, isSm, isXl} from '#root/components/mediaQuery';
import withWindowSize from '#root/components/withWindowSize';
import {prettyPercent} from '#root/utils/componentHelpers';

const CourseCarousel = ({carouselOpts, courses, title, eyelash, description, helperText, separator, largeCols, hideOffscreenSlides}) => {
  if (!courses || !courses.count()) {
    return null;
  }

  return (
    <div className={['course-carousel', hideOffscreenSlides ? 'hide-offscreen' : ''].join(' ')}>
      <header>
        {title ? (
          <h2>
            <span>{title}</span> <span className="eyelash">{eyelash}</span>
          </h2>
        ) : null}
        {description ? <p>{description}</p> : null}
        {helperText ? <small>{helperText}</small> : null}
      </header>
      <Carousel
        className="arrow-buttons"
        options={{
          pageDots: false,
          groupCells: isXl() ? 3 : isLg() ? largeCols : isSm() ? 2 : 1,
          prevNextButtons: true,
          ...carouselOpts
        }}
      >
        {courses.map(course => {
          let match;

          if (course.get('match')) {
            match = `${prettyPercent(course.get('match'))}%`;
          }

          return (
            <CarouselSlide key={course.get('id')}>
              <CourseCard match={match} course={course} />
            </CarouselSlide>
          );
        })}
      </Carousel>
      {separator ? <hr /> : null}
    </div>
  );
};

CourseCarousel.propTypes = {
  carouselOpts: PropTypes.object,
  title: PropTypes.string,
  eyelash: PropTypes.string,
  description: PropTypes.string,
  helperText: PropTypes.string,
  courses: ImmutablePropTypes.list,
  separator: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.func),
  largeCols: PropTypes.number,
  hideOffscreenSlides: PropTypes.bool
};

CourseCarousel.defaultProps = {
  carouselOpts: {},
  courses: List(),
  largeCols: 3
};

export default withWindowSize(CourseCarousel);
