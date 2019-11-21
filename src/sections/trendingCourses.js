import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import {isLg, isMd} from '../components/mediaQuery';
import CourseCard from '../components/courseCard';

const TrendingCourses = ({courses}) => {
  return (
    <div className="trending-courses">
      <div className="container container--lg">
        <header>
          <h2>Trending Courses</h2>
        </header>
        <div className="trending-courses__inner">

          <Carousel
            className="arrow-buttons"
            options={{
              groupCells: isLg() ? 3 : isMd() ? 2 : 1,
              prevNextButtons: isMd()
            }}
          >
            {courses.map(course => (
              <CarouselSlide key={course.get('id')}>
                <CourseCard
                  full
                  course={course}
                  recommended={course.get('recommended') ? 'Recommended for you' : null}
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

TrendingCourses.propTypes = {
  courses: ImmutablePropTypes.list,
  actions: PropTypes.objectOf(PropTypes.func)
};

TrendingCourses.defaultProps = {
  courses: List()
};

export default TrendingCourses;
