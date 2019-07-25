import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as stateActions} from '../redux/ducks/state';
import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import CardTrendingCourse from '../components/cardTrendingCourse';
import TrackVisibility from '../components/trackVisibility';
import {isXl, isLg, isMd} from '../components/mediaQuery';
import {clickAction} from '../utils/componentHelpers';

const TrendingCourses = ({courses, actions}) => {
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
                onView={clickAction(actions.modalOpen, 'courseDrawer', course)}
              />
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </TrackVisibility>
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
