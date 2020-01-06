import {Map} from 'immutable';
import {List} from 'immutable';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BrochureLayout from '#root/components/layout/brochure';
import BrochureHero from '#root/components/sections/brochureHero';
import CtaSurvey from '#root/components/sections/ctaSurvey';
import redirect from '#root/utils/redirect';

import CourseLessons from '../components/courseLessons';
import Head from '../components/head';
import ImageContentful from '../components/imageContentful';
import MaIcon from '../components/maIcon';
import RichText from '../components/richText';
import {courseHeroBgSources, courseHeroBgSrc} from '../constants';
import {actions as courseActions, selectors as courseSelectors} from '../redux/ducks/courses';
import {selectors as pathSelectors} from '../redux/ducks/paths';
import {actions as pathActions} from '../redux/ducks/paths';
import {actions as stateActions} from '../redux/ducks/state';
import {Routes} from '../routes';
import {clickAction} from '../utils/componentHelpers';

const Course = ({course, actions, paths}) => {
  paths = paths.filter(path => path.has('courses') && path.get('courses').find(c => c.get('id') === course.get('id')));
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

Course.getInitialProps = ctx => {
  const {query, store} = ctx;

  if (query.id) {
    store.dispatch(courseActions.coursesGet({params: {'fields.slug': query.id}}));
    store.dispatch(pathActions.pathsGet());

    return {
      slug: query.id
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
  course: courseSelectors.getCourses(state).find(c => c.get('slug') === ownProps.slug),
  paths: pathSelectors.getPaths(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
