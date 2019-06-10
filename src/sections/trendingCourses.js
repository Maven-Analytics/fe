import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import CardTrendingCourse from '../components/cardTrendingCourse';
import TrackVisibility from '../components/trackVisibility';

const TrendingCourses = ({courses}) => {
  return (
    <TrackVisibility className="trending-courses">
      <div className="container container--lg">
        <header>
          <h2>Trending Courses</h2>
        </header>
        <Carousel>
          {courses.map(course => (
            <CarouselSlide key={course.get('id')}>
              <CardTrendingCourse {...course.toJS()}/>
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </TrackVisibility>
  );
};

TrendingCourses.propTypes = {
  courses: ImmutablePropTypes.list
};

TrendingCourses.defaultProps = {
  courses: List()
};

export default TrendingCourses;
