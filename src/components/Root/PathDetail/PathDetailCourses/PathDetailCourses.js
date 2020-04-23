import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {fromJS} from 'immutable';

import CourseCarousel from '#root/components/sections/courseCarousel';
import PathDetailContainer from '../PathDetailContainer';
import {isXl, isLg, isSm} from '#root/components/mediaQuery';
import withWindowSize from '#root/components/withWindowSize';
import {mediaBreakpointUp} from '#root/utils/responsive';

const CarouselContainer = styled.div`
  position: relative;

  .course-carousel {
    margin: 0;
  }

  .course-card {
    h4 {
      font-size: 1.375em;
    }
  }
`;

const Wrapper = styled.div`
  margin: 0 0 6rem;

  ${mediaBreakpointUp('lg')} {
    margin: 0 0 9rem;
  }
`;

const PathDetailCourses = ({courses, title, ...props}) => {
  return (
    <Wrapper {...props}>
      <PathDetailContainer>
        <h4>{title}</h4>
      </PathDetailContainer>
      <div className="container container--lg">
        <CarouselContainer>
          <CourseCarousel carouselOpts={{groupCells: isXl() ? 3 : isLg() ? 3 : isSm() ? 2 : 1}} courses={fromJS(courses)} />
        </CarouselContainer>
      </div>
    </Wrapper>
  );
};

PathDetailCourses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.object.isRequired
      }).isRequired,
      comingSoon: PropTypes.bool,
      badge: PropTypes.object.isRequired,
      cardDescription: PropTypes.string.isRequired,
      length: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.object.isRequired
    })
  ),
  title: PropTypes.string
};

export default withWindowSize(PathDetailCourses);
