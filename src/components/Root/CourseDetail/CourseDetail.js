import {fromJS, Map} from 'immutable';
import {List} from 'immutable';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CourseLessons from '#root/components/courseLessons';
import Head from '#root/components/head';
import ImageContentful from '#root/components/imageContentful';
import BrochureLayout from '#root/components/layout/brochure';
import MaIcon from '#root/components/maIcon';
import Markdown from '#root/components/markdown';
import CtaSurvey from '#root/components/sections/CtaSurvey';
import {actions as stateActions} from '#root/redux/ducks/state';
import {Routes} from '#root/routes';
import {getCourses, getPaths} from '#root/services/contentful';
import redirect from '#root/utils/redirect';
import CourseHero from '#root/components/sections/CourseHero';
import gql from 'graphql-tag';

const courseQuery = gql`
  query CourseBySlug($slug: String!) {
    course(slug: $slug) {
      id
      author {
        id
        biography
        name
        position
        qualifications
        thumbnail {
          id
          file {
            url
          }
        }
      }
      cardDescription
      comingSoon
      badge {
        id
        file {
          url
        }
      }
      description
      descriptionFull
      descriptionDetail
      descriptionDetails
      difficulty
      enrollment {
        id
        percentage_completed
      }
      descriptionPreview
      hours
      length
      lessons {
        lessons
        title
      }
      match
      paths {
        badge {
          id
          file {
            url
          }
        }
      }
      skills
      slug
      testimonials {
        id
        name
        text
      }
      thinkificCourseId
      thumbnail {
        id
        file {
          url
        }
      }
      title
      tools
      url
    }
  }
`;

const CourseDetail = ({course, actions, paths}) => {
  console.log(course.toJS());
  return (
    <BrochureLayout>
      <Head meta={course.get('meta')} />
      <div className="course-detail">
        <CourseHero actions={actions} course={course} paths={course.get('paths')} />
        <CtaSurvey />
        <div className="container container--lg">
          <div className="course-detail__main">
            <section>
              <div>
                <h4>Course Description</h4>
                {course.get('descriptionFull') && course.get('descriptionFull') !== '' ? <Markdown content={course.get('descriptionFull')} /> : null}
              </div>
              <div>
                <h4>Course Outline</h4>
                {course.get('lessons') ? <CourseLessons lessons={course.get('lessons')} /> : null}
              </div>
              <div>{course.get('descriptionDetail') ? <Markdown content={course.get('descriptionDetail')} /> : null}</div>
              <div className="course-detail__cta">
                <h3>Are you ready to become a DATA ROCKSTAR? Start learning today with your FREE 7-Day trial! </h3>
                <p>Every subscription includes access to the following course materials</p>
                <ul>
                  <li>
                    <MaIcon icon="check" />
                    Interactive Project files
                  </li>
                  <li>
                    <MaIcon icon="check" />
                    Downloadable e-books
                  </li>
                  <li>
                    <MaIcon icon="check" />
                    Graded quizzes and assessments
                  </li>
                  <li>
                    <MaIcon icon="check" />
                    1-on-1 Expert support
                  </li>
                  <li>
                    <MaIcon icon="check" />
                    100% satisfaction guarantee
                  </li>
                  <li>
                    <MaIcon icon="check" />
                    Verified credentials & accredited badges
                  </li>
                </ul>
                <Link href="/signup">
                  <a className="btn btn--primary-solid">Sign Up Today</a>
                </Link>
              </div>
            </section>
            <aside>
              <div className="course-detail__author">
                <h4>Meet Your Instructor</h4>
                <div className="meta">
                  <ImageContentful image={course.getIn(['author', 'thumbnail'])} />
                  <span>
                    <h5>{course.getIn(['author', 'name'])}</h5>
                    <p>{course.getIn(['author', 'position'])}</p>
                  </span>
                </div>
                <div className="bio">
                  {course.hasIn(['author', 'biography']) ? <Markdown content={course.getIn(['author', 'biography'])} /> : null}
                </div>
                {course.hasIn(['author', 'qualifications']) ? (
                  <div className="qualifications">
                    <h5>Qualitifications</h5>
                    <ul>
                      {course.getIn(['author', 'qualifications']).map(q => (
                        <li key={q}>
                          <MaIcon icon="star" />
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="course-detail__testimonials">
                <h4>Testimonials</h4>
                <ul>
                  {course.has('testimonials') &&
                    course.get('testimonials').map(testimonial => (
                      <li key={testimonial.get('id')}>
                        <blockquote>
                          <Markdown content={testimonial.get('text')} />
                          <footer>
                            <cite>- {testimonial.get('name')}</cite>
                          </footer>
                        </blockquote>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </BrochureLayout>
  );
};

CourseDetail.propTypes = {
  errorCode: PropTypes.number,
  path: PropTypes.object
};

CourseDetail.getInitialProps = async ({apolloClient, query: {slug}}) => {
  try {
    const {
      data: {course}
    } = await apolloClient.query({
      query: courseQuery,
      variables: {slug}
    });

    return {course: fromJS(course)};
  } catch {
    return {
      errorCode: 404
    };
  }
};

CourseDetail.propTypes = {
  course: ImmutablePropTypes.map.isRequired,
  paths: ImmutablePropTypes.list.isRequired,
  slug: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

CourseDetail.defaultProps = {
  course: Map(),
  paths: List()
};

const mapStateToProps = (state, ownProps) => ({
  course: fromJS(ownProps.course ? ownProps.course : {}),
  // Course: courseSelectors.getCourses(state).find(c => c.get('slug') === ownProps.slug),
  paths: fromJS(ownProps.paths ? ownProps.paths : [])
  // Paths: pathSelectors.getPaths(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...stateActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
