import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import CardTrendingCourse from '../components/cardTrendingCourse';
import TrackVisibility from '../components/trackVisibility';
import {isXl, isLg, isMd} from '../components/mediaQuery';

const TrendingCourses = ({courses}) => {
  return (
    <TrackVisibility className="trending-courses">
      <div className="container container--lg">
        <header>
          <h2>Trending Courses</h2>
        </header>
        <Carousel
          options={{
            groupCells: isXl() ? 4 : isLg() ? 3 : isMd() ? 2 : 1
          }}
        >
          {courses.map(course => (
            <CarouselSlide key={course.get('id')}>
              <CardTrendingCourse
                title={course.get('title')}
                slug={course.get('slug')}
                thumbnail={course.get('thumbnail')}
                difficulty={course.get('difficulty')}
                recommended={course.get('recommended')}
              />
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
