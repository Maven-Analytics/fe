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
import RichText from '#root/components/richText';
import BrochureHero from '#root/components/sections/brochureHero';
import CtaSurvey from '#root/components/sections/ctaSurvey';
import {courseHeroBgSources, courseHeroBgSrc} from '#root/constants';
import {actions as stateActions} from '#root/redux/ducks/state';
import {Routes} from '#root/routes';
import {getCourses, getPaths} from '#root/services/contentful';
import {clickAction} from '#root/utils/componentHelpers';
import redirect from '#root/utils/redirect';

const Course = ({course, actions, paths}) => {
  return (
    <BrochureLayout>
      <Head meta={course.get('meta')}/>
      <div className="course-detail">
        <BrochureHero
          eyelash="Self-Paced Course"
          title={course.get('title')}
          description={course.get('previewDescription')}
          hours={course.get('length')}
          difficulty={course.get('difficulty')}
          tools={course.get('tools')}
          skills={course.get('skills')}
          badge={course.get('badge')}
          paths={paths}
          thumbnail={course.get('thumbnail')}
          video={course.get('video')}
          backgroundSources={courseHeroBgSources}
          backgroundSrc={courseHeroBgSrc}
          onVideoClick={clickAction(actions.modalOpen, 'video', {video: course.get('video')})}
        />
        <CtaSurvey/>
        <div className="container container--lg">
          <div className="course-detail__main">
            <section>
              <div>
                <h4>Course Description</h4>
                {course.get('description') && course.get('description') !== '' ? <RichText content={course.get('description')}/> : null}
              </div>
              <div>
                <h4>Course Outline</h4>
                {course.get('lessons') ? <CourseLessons lessons={course.get('lessons')}/> : null}
              </div>
              <div>
                {course.get('descriptionDetails') ? <RichText content={course.get('descriptionDetails')}/> : null}
              </div>
              <div className="course-detail__cta">
                <h3>Are you ready to become a DATA ROCKSTAR? Start learning today with your FREE 7-Day trial! </h3>
                <p>Every subscription includes access to the following course materials</p>
                <ul>
                  <li><MaIcon icon="check"/>Interactive Project files</li>
                  <li><MaIcon icon="check"/>Downloadable e-books</li>
                  <li><MaIcon icon="check"/>Graded quizzes and assessments</li>
                  <li><MaIcon icon="check"/>1-on-1 Expert support</li>
                  <li><MaIcon icon="check"/>100% satisfaction guarantee</li>
                  <li><MaIcon icon="check"/>Verified credentials & accredited badges</li>
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
                  <ImageContentful image={course.getIn(['author', 'thumbnail'])}/>
                  <span>
                    <h5>{course.getIn(['author', 'name'])}</h5>
                    <p>{course.getIn(['author', 'position'])}</p>
                  </span>
                </div>
                <div className="bio">
                  {course.hasIn(['author', 'bio']) ? <RichText content={course.getIn(['author', 'bio'])}/> : null}
                </div>
                {course.hasIn(['author', 'qualifications']) ? (
                  <div className="qualifications">
                    <h5>Qualitifications</h5>
                    <ul>
                      {course.getIn(['author', 'qualifications']).map(q => (
                        <li key={q}><MaIcon icon="star"/>{q}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="course-detail__testimonials">
                <h4>Testimonials</h4>
                <ul>
                  {course.has('testimonials') && course.get('testimonials').map(testimonial => (
                    <li key={testimonial.get('id')}>
                      <blockquote>
                        <RichText content={testimonial.get('quote')}/>
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

Course.getInitialProps = async ctx => {
  const {query: {slug}} = ctx;

  if (slug) {
    const [course] = await getCourses({
      query: {
        'fields.slug': slug
      }
    });

    if (!course) {
      redirect(ctx, Routes.Home);
    }

    const paths = await getPaths({
      query: {
        links_to_entry: course.id
      }
    });

    return {
      slug,
      course,
      paths
    };
  }

  redirect(ctx, Routes.Home);

  return {
    slug: null
  };
};

Course.propTypes = {
  course: ImmutablePropTypes.map.isRequired,
  paths: ImmutablePropTypes.list.isRequired,
  slug: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

Course.defaultProps = {
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
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
