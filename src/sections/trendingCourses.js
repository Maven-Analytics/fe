import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as stateActions} from '../redux/ducks/state';
import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import TrackVisibility from '../components/trackVisibility';
import {isXl, isLg, isMd} from '../components/mediaQuery';
import {clickAction} from '../utils/componentHelpers';
import CourseCard from '../components/courseCard';

const TrendingCourses = ({courses, actions}) => {
  return (
    <div className="trending-courses">
      <div className="container container--lg">
        <header>
          <h2>Trending Courses</h2>
        </header>
        <Carousel
          options={{
            groupCells: isLg() ? 3 : isMd() ? 2 : 1
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
  );
};

TrendingCourses.propTypes = {
  courses: ImmutablePropTypes.list,
  actions: PropTypes.objectOf(PropTypes.func)
};

TrendingCourses.defaultProps = {
  courses: List()
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingCourses);
