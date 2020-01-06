import {List} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import Carousel from '#root/components/carousel';
import CarouselSlide from '#root/components/carouselSlide';
import CourseCard from '#root/components/courseCard';
import {isLg, isMd} from '#root/components/mediaQuery';

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
