import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import ImageContentful from './imageContentful';
import ProgressMeter from './progressMeter';

const DashboardCourse = ({title, percentage_completed, detailUrl, resumeUrl, badge, excerpt}) => {
  return (
    <div className="dashboard-course">
      <div className="dashboard-course__badge">
        <ImageContentful image={badge}/>
      </div>
      <div className="dashboard-course__content">
        <h5>{title}</h5>
        <p>{excerpt}</p>
        <ProgressMeter value={percentage_completed} title="Progress"/>
        <div className="dashboard-course__footer">
          <Link href={detailUrl}>
            <a className="btn btn--empty-dark">View Course Details</a>
          </Link>
          <Link href={resumeUrl}>
            <a className="btn btn--primary-solid">Resume Course</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

DashboardCourse.propTypes = {
  title: PropTypes.string,
  percentage_completed: PropTypes.number,
  detailUrl: PropTypes.string,
  resumeUrl: PropTypes.string,
  badge: ImmutablePropTypes.map,
  excerpt: PropTypes.string
};

DashboardCourse.defaultProps = {
  badge: Map()
};

export default DashboardCourse;
