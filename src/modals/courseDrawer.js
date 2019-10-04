import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as stateActions, selectors as stateSelectors} from '../redux/ducks/state';
import {selectors as userSelectors} from '../redux/ducks/user';
import CloseButton from '../components/closeButton';
import ProductDetail from '../components/productDetail';
import {clickAction} from '../utils/componentHelpers';
import {getMatchScoreForCourse} from '../utils/courseHelpers';
import RichText from '../components/richText';
import CourseLessons from '../components/courseLessons';
import {Routes} from '../routes';

const CourseDrawer = ({actions, state, user}) => {
  const isOpen = state.getIn(['courseDrawer', 'open']);
  const course = state.getIn(['courseDrawer', 'data']);

  const classList = ['course-drawer'];
  const close = clickAction(actions.modalClose, 'courseDrawer');

  if (isOpen) {
    classList.push('open');
  }

  return (
    <div className={classList.join(' ')} tabIndex={isOpen ? 0 : -1}>
      <div onClick={close} className="course-drawer__fog" />
      <div className="course-drawer__inner">
        <CloseButton onClick={close} />
        <div className="course-drawer__content">
          {course ? (
            <ProductDetail
              productTerm="Course"
              className="product-detail--course"
              badge={course.get('badge')}
              title={course.get('title')}
              percentage_completed={course.get('percentage_completed')}
              titleTag="h2"
              match={getMatchScoreForCourse(course, user)}
              resumeUrl={course.get('url')}
              tools={course.get('tools')}
              hours={course.get('length')}
              instructors={course.get('author')}
              showScores={user.has('id')}
              id={course.get('thinkificCourseId')}
              url={Routes.Course(course.get('slug'))}
            >
              {course.get('description') && course.get('description') !== '' ? <RichText content={course.get('description')} /> : null}
              {course.get('lessons') ? <CourseLessons lessons={course.get('lessons')} /> : null}
              {course.get('descriptionDetails') ? <RichText content={course.get('descriptionDetails')} /> : null}
            </ProductDetail>
          ) : null}
        </div>
      </div>
    </div>
  );
};

CourseDrawer.propTypes = {
  state: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: ImmutablePropTypes.map
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state),
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...stateActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDrawer);
