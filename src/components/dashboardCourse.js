import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';
import {connect} from 'react-redux';

import {selectors as courseSelectors} from '../redux/ducks/courses';
import ImageContentful from './imageContentful';
import withState from './withState';
import ProgressMeter from './progressMeter';
import ResumeProduct from './resumeProduct';
import {clickAction} from '../utils/componentHelpers';

const DashboardCourse = ({percentage_completed, course, actions}) => {
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
          <button onClick={clickAction(actions.modalOpen, 'courseDrawer', course)} className="btn btn--empty-dark">
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
  course: ImmutablePropTypes.map,
  courseId: PropTypes.number.isRequired
};

DashboardCourse.defaultProps = {
  badge: Map(),
  course: Map()
};

const mapStateToProps = (state, props) => ({
  course: courseSelectors.getCourseById(state, props.courseId)
});

export default connect(mapStateToProps)(withState(DashboardCourse));
