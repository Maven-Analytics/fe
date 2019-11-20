import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';
import Link from 'next/link';

import ImageContentful from './imageContentful';
import RichText from './richText';
import ProgressMeter from './progressMeter';
import ProductMeta from './productMeta';
import ProductMetaItem from './productMetaItem';
import ProductTools from './productTools';
import CourseAuthor from './courseAuthor';
import {prettyPercent} from '../utils/componentHelpers';
import ResumeProduct from './resumeProduct';

const PathDetail = ({badge, titleTag: TitleTag, title, resumeUrl, description, percentage_completed, tools, courseCount, hours, match, instructors}) => {
  const classList = ['path-detail'];

  return (
    <div className={classList.join(' ')}>
      <div className="path-detail__header">
        <ImageContentful showLoader={false} image={badge} />
        <TitleTag>{title}</TitleTag>
        <ResumeProduct resumeUrl={resumeUrl} productTerm="Path" started={percentage_completed > 0} className="btn btn--primary-solid" />
      </div>
      <div className="path-detail__content">
        <div className="path-detail__content__main">
          <RichText content={description} />
        </div>
        <div className="path-detail__content__sidebar">
          <ProductMeta className="product-meta--stacked path-detail__meta">
            {percentage_completed > -1 ? (
              <ProductMetaItem label="Progress">
                <ProgressMeter value={percentage_completed} />
              </ProductMetaItem>
            ) : null}
            <ProductMetaItem label="Featured Tools">
              <ProductTools tools={tools} />
            </ProductMetaItem>
            <ProductMetaItem label="Number of Courses">
              {courseCount}
            </ProductMetaItem>
            <ProductMetaItem label="Total Course Hours">
              {hours}
            </ProductMetaItem>
            {match ? (
              <ProductMetaItem label="Your Personal Match Score">
                {prettyPercent(match) || 0}%
              </ProductMetaItem>
            ) : null}
            {instructors ? (
              <ProductMetaItem label="Course Instructors">
                {instructors.map(instructor => (
                  <CourseAuthor key={instructor.get('id')} name={instructor.get('name')} thumbnail={instructor.get('thumbnail')} />
                ))}
              </ProductMetaItem>
            ) : null}
          </ProductMeta>
        </div>

      </div>
    </div>
  );
};

PathDetail.propTypes = {
  badge: ImmutablePropTypes.map,
  titleTag: PropTypes.string,
  title: PropTypes.string.isRequired,
  resumeUrl: PropTypes.string,
  description: ImmutablePropTypes.map,
  percentage_completed: PropTypes.number,
  tools: ImmutablePropTypes.list,
  courseCount: PropTypes.number,
  hours: PropTypes.number,
  match: PropTypes.number,
  instructors: ImmutablePropTypes.list
};

PathDetail.defaultProps = {
  badge: Map(),
  titleTag: 'h2',
  description: Map(),
  tools: List(),
  instructors: List()
};

export default PathDetail;
