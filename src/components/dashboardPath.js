import {List, Map} from 'immutable';
import * as PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import ImageContentful from './imageContentful';
import Markdown from './markdown';
import ProductMeta from './productMeta';
import ProductMetaItem from './productMetaItem';
import ProductTools from './productTools';
import ProgressMeter from './progressMeter';
import ResumeProduct from './resumeProduct';

const DashboardPath = ({title, percentage_completed, onDetailClick, resumeUrl, badge, descriptionPreview, match, courseCount, hours, tools}) => {
  return (
    <div className="dashboard-path">
      <div className="dashboard-path__badge">
        <ImageContentful image={badge} />
      </div>
      <div className="dashboard-path__content">
        <h4>{title}</h4>
        <Markdown content={descriptionPreview} />
        <div className="dashboard-path__footer">
          {resumeUrl ? (
            <ResumeProduct resumeUrl={resumeUrl} productTerm="Path" started={percentage_completed > 0} className="btn btn--primary-solid" />
          ) : null}
          <button onClick={onDetailClick} className="btn btn--default">
            View Path Details
          </button>
        </div>
      </div>
      <div className="dashboard-path__details">
        <ProgressMeter value={percentage_completed} title="Progress" />
        <ProductMeta className="product-meta--grid-2x2 product-meta--border-top">
          <ProductMetaItem label="Number of Courses">{courseCount}</ProductMetaItem>
          <ProductMetaItem label="Total Hours">{hours || 0}</ProductMetaItem>
          <ProductMetaItem label="Match Score">{match}</ProductMetaItem>
          <ProductMetaItem label="Tools Featured">
            <ProductTools tools={tools} />
          </ProductMetaItem>
        </ProductMeta>
      </div>
    </div>
  );
};

DashboardPath.propTypes = {
  title: PropTypes.string,
  percentage_completed: PropTypes.number,
  onDetailClick: PropTypes.func.isRequired,
  resumeUrl: PropTypes.string,
  badge: ImmutablePropTypes.map,
  descriptionPreview: PropTypes.string,
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
