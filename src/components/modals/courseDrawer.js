import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CloseButton from '#root/components/closeButton';
import CourseLessons from '#root/components/courseLessons';
import ProductDetail from '#root/components/productDetail';
import RichText from '#root/components/richText';
import {selectors as courseSelectors} from '#root/redux/ducks/courses';
import {actions as stateActions, selectors as stateSelectors} from '#root/redux/ducks/state';
import {Routes} from '#root/routes';
import {clickAction} from '#root/utils/componentHelpers';

const CourseDrawer = ({actions, state, courses}) => {
  const isOpen = state.getIn(['courseDrawer', 'open']);
  const course = courses.find(course => course.get('id') === state.getIn(['courseDrawer', 'data']));

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
              comingSoon={course.get('comingSoon')}
              badge={course.get('badge')}
              title={course.get('title')}
              percentage_completed={course.get('percentage_completed')}
              titleTag="h2"
              match={course.get('match')}
              resumeUrl={course.get('url')}
              tools={course.get('tools')}
              hours={course.get('length')}
              instructors={course.get('author')}
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
  courses: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state),
  courses: courseSelectors.getCourses(state)
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
