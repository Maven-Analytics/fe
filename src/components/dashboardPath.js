import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';
import {Map, List} from 'immutable';

import ImageContentful from './imageContentful';
import ProgressMeter from './progressMeter';
import RichText from './richText';
import ProductTools from './productTools';
import ProductMeta from './productMeta';
import ProductMetaItem from './productMetaItem';

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
          {resumeUrl ? (
            <Link href={resumeUrl}>
              <a className="btn btn--primary-solid">Resume Course</a>
            </Link>
          ) : null}
          <button onClick={onDetailClick} className="btn btn--default">View Path Details</button>
        </div>
      </div>
      <div className="dashboard-path__details">
        <ProgressMeter value={percentage_completed} title="Progress"/>
        <ProductMeta className="product-meta--grid-2x2 product-meta--border-top">
          <ProductMetaItem label="Number of Courses">
            {courseCount}
          </ProductMetaItem>
          <ProductMetaItem label="Total Hours">
            {hours || 0}
          </ProductMetaItem>
          <ProductMetaItem label="Match Score">
            {match}
          </ProductMetaItem>
          <ProductMetaItem label="Tools Featured">
            <ProductTools tools={tools}/>
          </ProductMetaItem>
        </ProductMeta>
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
