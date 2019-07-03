import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';
import {Map, List} from 'immutable';

import ImageContentful from './imageContentful';
import ProgressMeter from './progressMeter';
import RichText from './richText';
import ProductTools from './productTools';

const DashboardPath = ({title, percentage_completed, onDetailClick, resumeUrl, badge, shortDescription, match, courseCount, hours, tools}) => {
  return (
    <div className="dashboard-path">
      <div className="dashboard-path__badge">
        <ImageContentful image={badge}/>
      </div>
      <div className="dashboard-path__content">
        <h4>{title}</h4>
        <RichText content={shortDescription}/>
        <div className="dashboard-path__footer">
          <Link href={resumeUrl}>
            <a className="btn btn--primary-solid">Resume Course</a>
          </Link>
          <button onClick={onDetailClick} className="btn btn--default">View Path Details</button>
        </div>
      </div>
      <div className="dashboard-path__details">
        <ProgressMeter value={percentage_completed} title="Progress"/>
        <ul>
          <li>
            <span className="text">Number of Courses</span>
            <span className="value">{courseCount}</span>
          </li>
          <li>
            <span className="text">Total Hours</span>
            <span className="value">{hours || 0}</span>
          </li>
          <li>
            <span className="text">Match Score</span>
            <span className="value">{match}</span>
          </li>
          <li>
            <div className="text">Tools Featured</div>
            <div className="value">
              <ProductTools tools={tools}/>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

DashboardPath.propTypes = {
  title: PropTypes.string,
  percentage_completed: PropTypes.number,
  onDetailClick: PropTypes.string,
  resumeUrl: PropTypes.string,
  badge: ImmutablePropTypes.map,
  shortDescription: ImmutablePropTypes.map,
  match: PropTypes.string,
  courseCount: PropTypes.number,
  hours: PropTypes.number,
  tools: ImmutablePropTypes.list
};

DashboardPath.defaultProps = {
  badge: Map(),
  tools: List()
};

export default DashboardPath;
