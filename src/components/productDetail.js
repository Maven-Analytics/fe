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

const ProductDetail = ({children, productTerm, className, badge, titleTag: TitleTag, title, resumeUrl, description, percentage_completed, tools, hours, match, instructors, courseCount}) => {
  const classList = ['product-detail'];

  if (className) {
    classList.push(className);
  }

  return (
    <div className={classList.join(' ')}>
      <div className="product-detail__header">
        <ImageContentful showLoader={false} image={badge}/>
        <TitleTag>{title}</TitleTag>
        {resumeUrl ? (<Link href={resumeUrl}><a className="btn btn--primary-solid">Resume {productTerm}</a></Link>) : null}
      </div>
      <div className="product-detail__content">
        <div className="product-detail__content__main">
          {children}
        </div>
        <div className="product-detail__content__sidebar">
          <ProductMeta className="product-meta--stacked product-detail__meta">
            {percentage_completed > -1 ? (
              <ProductMetaItem label="Progress">
                <ProgressMeter value={percentage_completed}/>
              </ProductMetaItem>
            ) : null}
            <ProductMetaItem label="Featured Tools">
              <ProductTools tools={tools}/>
            </ProductMetaItem>
            {courseCount ? (
              <ProductMetaItem label="Number of Courses">
                {courseCount}
              </ProductMetaItem>
            ) : null}
            <ProductMetaItem label="Total Course Hours">
              {hours}
            </ProductMetaItem>
            {match ? (
              <ProductMetaItem label="Your Personal Match Score">
                {prettyPercent(match) || 0}%
              </ProductMetaItem>
            ) : null}
            {List.isList(instructors) ? (
              <ProductMetaItem label="Course Instructors">
                {instructors.map(instructor => (
                  <CourseAuthor key={instructor.get('id')} name={instructor.get('name')} thumbnail={instructor.get('thumbnail')}/>
                ))}
              </ProductMetaItem>
            ) : (
              <ProductMetaItem label="Course Instructor">
                <CourseAuthor key={instructors.get('id')} name={instructors.get('name')} thumbnail={instructors.get('thumbnail')}/>
              </ProductMetaItem>
            )}
          </ProductMeta>
        </div>

      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  productTerm: PropTypes.string,
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
  instructors: PropTypes.oneOfType([ImmutablePropTypes.map, ImmutablePropTypes.list]),
  className: PropTypes.string,
  children: PropTypes.node
};

ProductDetail.defaultProps = {
  badge: Map(),
  titleTag: 'h2',
  description: Map(),
  tools: List(),
  instructors: Map(),
  children: null
};

export default ProductDetail;
