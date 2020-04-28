import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {fromJS, List} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import imageFragment from '#root/api/fragments/image';
import Carousel from '#root/components/carousel';
import CarouselSlide from '#root/components/carouselSlide';
import CourseCard from '#root/components/courseCard';
import {isLg, isMd} from '#root/components/mediaQuery';
import withWindowSize from '../withWindowSize';

const trendingQuery = gql`
  {
    courses(trending: true) {
      author {
        name
        thumbnail {
          ...image
        }
      }
      cardDescription
      badge {
        ...image
      }
      id
      length
      thumbnail {
        ...image
      }
      title
    }
  }
  ${imageFragment}
`;

const TrendingCourses = () => {
  const getCourses = () => {
    const {data: {courses = []} = {}} = useQuery(trendingQuery);

    return fromJS(courses);
  };

  const courses = getCourses();

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
              pageDots: false,
              prevNextButtons: isMd(),
              groupCells: isLg() ? 3 : isMd() ? 2 : 1
            }}
          >
            {courses.map(course => (
              <CarouselSlide key={course.get('id')}>
                <CourseCard full course={course} recommended={course.get('recommended') ? 'Recommended for you' : null} />
              </CarouselSlide>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default withWindowSize(TrendingCourses);
