import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import ImageContentful from './imageContentful';
import withState from './withState';
import ProgressMeter from './progressMeter';
import ResumeProduct from './resumeProduct';
import {clickAction} from '../utils/componentHelpers';

const DashboardCourse = ({title, percentage_completed, resumeUrl, badge, excerpt, course, actions}) => {
  return (
    <div className="dashboard-course">
      <div className="dashboard-course__badge">
        <ImageContentful image={badge} />
      </div>
      <div className="dashboard-course__content">
        <h5>{title}</h5>
        <p>{excerpt}</p>
        <ProgressMeter value={percentage_completed} title="Progress" />
        <div className="dashboard-course__footer">
          <button onClick={clickAction(actions.modalOpen, 'courseDrawer', course)} className="btn btn--empty-dark">
            View Course Details
          </button>
          <ResumeProduct resumeUrl={resumeUrl} productTerm="Course" started={percentage_completed > 0} className="btn btn--primary-solid" />
        </div>
      </div>
    </div>
  );
};

DashboardCourse.propTypes = {
  title: PropTypes.string,
  percentage_completed: PropTypes.number,
  resumeUrl: PropTypes.string,
  badge: ImmutablePropTypes.map,
  excerpt: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  course: ImmutablePropTypes.map
};

DashboardCourse.defaultProps = {
  badge: Map()
};

export default withState(DashboardCourse);
