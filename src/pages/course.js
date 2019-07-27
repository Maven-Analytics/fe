import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {bindActionCreators} from 'redux';
import Link from 'next/link';

import {actions as courseActions, selectors as courseSelectors} from '../redux/ducks/courses';
import {actions as stateActions} from '../redux/ducks/state';
import MainLayout from '../layouts/main';
import {redirect} from '../utils/routingHelpers';
import {Routes} from '../routes';
import CourseHero from '../components/courseHero';
import {clickAction} from '../utils/componentHelpers';
import CtaSurvey from '../sections/ctaSurvey';
import RichText from '../components/richText';
import CourseLessons from '../components/courseLessons';
import ImageContentful from '../components/imageContentful';
import MaIcon from '../components/maIcon';

const Course = ({course, actions}) => {
  return (
    <MainLayout>
      <div className="course-detail">
        <CourseHero
          title={course.get('title')}
          description={course.get('previewDescription')}
          hours={course.get('length')}
          difficulty={course.get('difficulty')}
          tools={course.get('tools')}
          skills={course.get('skills')}
          badge={course.get('badge')}
          paths={course.get('paths')}
          thumbnail={course.get('thumbnail')}
          video="video"
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
                <h3>Are you ready to become a DATA ROCKSTAR? Start learning today with your FREE 10-Day trial! </h3>
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
                  <RichText content={course.getIn(['author', 'bio'])}/>
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
            </aside>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

Course.getInitialProps = ctx => {
  const {res, query, store} = ctx;

  if (!query.id) {
    return redirect(Routes.Home, res);
  }

  store.dispatch(courseActions.coursesGet({params: {'fields.slug': query.id}}));

  return {
    slug: query.id
  };
};

Course.propTypes = {
  course: ImmutablePropTypes.map.isRequired,
  slug: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

Course.defaultProps = {
  course: Map()
};

const mapStateToProps = (state, ownProps) => ({
  course: courseSelectors.getCourse(state, ownProps.slug)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
