import {List, Map} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import {clickAction} from '#root/utils/componentHelpers';

import {selectors as courseSelectors} from '../redux/ducks/courses';
import ImageContentful from './imageContentful';
import ProgressMeter from './progressMeter';
import ResumeProduct from './resumeProduct';
import withState from './withState';

const DashboardCourse = ({percentage_completed, courses, courseId, actions}) => {
  const course = courses.find(c => c.get('thinkificCourseId') === courseId);

  if (!course) {
    return null;
  }

  return (
    <div className="dashboard-course">
      <div className="dashboard-course__badge">
        <ImageContentful image={course.get('badge')} />
      </div>
      <div className="dashboard-course__content">
        <h5>{course.get('title')}</h5>
        <p>{course.get('excerpt')}</p>
        <ProgressMeter value={percentage_completed} title="Progress" />
        <div className="dashboard-course__footer">
          <button onClick={clickAction(actions.modalOpen, 'courseDrawer', course.get('id'))} className="btn btn--empty-dark">
            View Course Details
          </button>
          <ResumeProduct resumeUrl={course.get('url')} productTerm="Course" started={percentage_completed > 0} className="btn btn--primary-solid" />
        </div>
      </div>
    </div>
  );
};

DashboardCourse.propTypes = {
  percentage_completed: PropTypes.number,
  actions: PropTypes.objectOf(PropTypes.func),
  courses: ImmutablePropTypes.list,
  courseId: PropTypes.number.isRequired
};

DashboardCourse.defaultProps = {
  badge: Map(),
  courses: List()
};

const mapStateToProps = state => ({
  courses: courseSelectors.getCourses(state)
});

export default connect(mapStateToProps)(withState(DashboardCourse));
