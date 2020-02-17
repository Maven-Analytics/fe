import {List, Map} from 'immutable';
import {Loader} from 'maven-ui';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {noop, prettyPercent} from '#root/utils/componentHelpers';

import CourseAuthor from './courseAuthor';
import CourseScores from './courseScores';
import ImageContentful from './imageContentful';
import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import MaIcon from './maIcon';
import ProductMeta from './productMeta';
import ProductMetaItem from './productMetaItem';
import ProductTools from './productTools';
import ProgressMeter from './progressMeter';
import ResumeProduct from './resumeProduct';

const ProductDetail = ({
  comingSoon,
  children,
  productTerm,
  className,
  badge,
  titleTag: TitleTag,
  title,
  resumeUrl,
  onResumeClick: handleResumeClick,
  id,
  percentage_completed,
  tools,
  hours,
  match,
  instructors,
  courseCount,
  url
}) => {
  const classList = ['product-detail'];

  if (className) {
    classList.push(className);
  }

  // Let linkTerm = 'Resume';

  // if (!percentage_completed) {
  //   linkTerm = 'Start';
  // }

  return (
    <div className={classList.join(' ')}>
      <div className="product-detail__header">
        <ImageContentful showLoader={false} image={badge} />
        <TitleTag>{title}</TitleTag>
        {id ? (
          <>
            <LoggedIn>
              {comingSoon ? null : <ResumeProduct resumeUrl={resumeUrl} onClick={handleResumeClick} productTerm={productTerm} started={percentage_completed > 0} className="btn btn--primary-solid" />}
              {/* <Link href={resumeUrl || '#'}><a className="btn btn--primary-solid">{linkTerm} {productTerm}</a></Link> */}
            </LoggedIn>
            <LoggedOut>
              {url ? (
                <Link href={url}>
                  <a className="btn btn--primary-solid" onClick={handleResumeClick}>View Full Details</a>
                </Link>
              ) : comingSoon ? null : <ResumeProduct onClick={handleResumeClick} productTerm={productTerm} started={percentage_completed > 0} className="btn btn--primary-solid" />}
            </LoggedOut>
          </>
        ) : null}

      </div>
      <div className="product-detail__content">
        <div className="product-detail__content__main">{children}</div>
        <div className="product-detail__content__sidebar">
          <ProductMeta className="product-meta--stacked product-detail__meta">
            {percentage_completed > -1 ? (
              <ProductMetaItem label="Progress">
                <ProgressMeter value={percentage_completed} />
              </ProductMetaItem>
            ) : null}
            <ProductMetaItem label="Featured Tools">
              <ProductTools tools={tools} />
            </ProductMetaItem>
            {courseCount ? <ProductMetaItem label="Number of Courses">{courseCount}</ProductMetaItem> : null}
            <ProductMetaItem label="Total Course Hours">{hours}</ProductMetaItem>
            {match ? <ProductMetaItem label="Your Personal Match Score">{prettyPercent(match) || 0}%</ProductMetaItem> : null}
            {List.isList(instructors) ? (
              <ProductMetaItem label="Course Instructors">
                {instructors.map(instructor => (
                  <CourseAuthor key={instructor.get('id')} name={instructor.get('name')} thumbnail={instructor.get('thumbnail')} />
                ))}
              </ProductMetaItem>
            ) : (
              <ProductMetaItem label="Course Instructor">
                <CourseAuthor key={instructors.get('id')} name={instructors.get('name')} thumbnail={instructors.get('thumbnail')} />
              </ProductMetaItem>
            )}
            <LoggedIn>
              {productTerm && !productTerm.toLowerCase().includes('path') ? (
                <CourseScores courseId={id}>
                  {(loading, scores) => {
                    const loader = <Loader loading={loading} />;
                    const noScore = <MaIcon icon="minus" />;
                    const final = scores.getIn(['final', 'score']) || -1;
                    const benchmark = scores.getIn(['benchmark', 'score']) || -1;

                    return (
                      <Fragment>
                        <ProductMetaItem label="Benchmark Assessment Score">
                          <div style={{position: 'relative'}}>
                            {loader}
                            {benchmark > -1 && loading === false ? `${prettyPercent(benchmark)}%` : noScore}
                          </div>
                        </ProductMetaItem>
                        <ProductMetaItem label="Final Assessment Score">
                          <div style={{position: 'relative'}}>
                            {loader}
                            {final > -1 && loading === false ? `${prettyPercent(final)}%` : noScore}
                          </div>
                        </ProductMetaItem>
                      </Fragment>
                    );
                  }}
                </CourseScores>
              ) : null}
            </LoggedIn>
          </ProductMeta>
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  comingSoon: PropTypes.bool,
  productTerm: PropTypes.string,
  badge: ImmutablePropTypes.map,
  titleTag: PropTypes.string,
  title: PropTypes.string.isRequired,
  resumeUrl: PropTypes.string,
  onResumeClick: PropTypes.func,
  percentage_completed: PropTypes.number,
  tools: ImmutablePropTypes.list,
  courseCount: PropTypes.number,
  hours: PropTypes.number,
  match: PropTypes.number,
  instructors: PropTypes.oneOfType([ImmutablePropTypes.map, ImmutablePropTypes.list]),
  className: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.any.isRequired,
  url: PropTypes.string
};

ProductDetail.defaultProps = {
  badge: Map(),
  children: null,
  description: Map(),
  instructors: Map(),
  onResumeClick: noop,
  tools: List(),
  titleTag: 'h2'
};

export default ProductDetail;
