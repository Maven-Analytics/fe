import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map, fromJS, List} from 'immutable';
import {bindActionCreators} from 'redux';
import Link from 'next/link';

import {actions as courseActions, selectors as courseSelectors} from '../redux/ducks/courses';
import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import {actions as stateActions} from '../redux/ducks/state';
import BrochureLayout from '../layouts/brochure';
import {redirect} from '../utils/routingHelpers';
import {Routes} from '../routes';
import BrochureHero from '../sections/brochureHero';
import {clickAction} from '../utils/componentHelpers';
import CtaSurvey from '../sections/ctaSurvey';
import RichText from '../components/richText';
import CourseLessons from '../components/courseLessons';
import Image from '../components/image';
import MaIcon from '../components/maIcon';
import Head from '../components/head';
import {courseHeroBgSources, courseHeroBgSrc} from '../constants';
import BrochureContent from '../components/brochureContent';
import ImageContentful from '../components/imageContentful';

const SkillsAssessments = ({courses, page}) => {
  return (
    <BrochureLayout>
      <Head meta={page.get('meta')}/>
      <BrochureHero
        className="brochure-hero--medium"
        eyelash="Skills Assessments"
        title="SHOW US YOUR SKILLS"
        description={page.get('heroDescription')}
        meta={false}
        image={<ImageContentful image={page.get('heroImage')}/>}
        colClasses={['col-md-6', 'col-md-6']}
        backgroundSources={courseHeroBgSources}
        backgroundSrc={courseHeroBgSrc}
      />
      <BrochureContent className="page-assessments" title="Try a Free Sample Assessment<br/>to see how you might score.">
        <ul className="page-assessments__courses">
          {courses.map(course => (
            <li key={course.get('id')}>
              <div className="page-assessments__course">
                <ImageContentful image={course.get('badge')} modifier="badge"/>
                <div className="content">
                  <h3>{course.get('title')}</h3>
                  <p>{course.get('cardDescription')}</p>
                  <Link href={course.get('assessmentUrl')}>
                    <a className="btn btn--primary-solid">Take Assessment</a>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <blockquote className="page-assessments__testimonial">
          <p>When I started a new job as a Data Visualization Analyst, I thought I had the skills to hit the ground running. However, I quickly realized that I would need to up my game if I was going to be successful.</p>
          <p>After completing the Excel and Power BI paths from Maven Analytics, I went from barely being able to keep up to getting callouts from VPs for how great my dashboards look!</p>
          <cite>- Zack T, New York</cite>
        </blockquote>
      </BrochureContent>
    </BrochureLayout>
  );
};

SkillsAssessments.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(courseActions.coursesInit({params: {'fields.assessmentPage': true}}));
  store.dispatch(pageActions.pagesGet({slug: 'skills-assessments'}));
  return {};
};

SkillsAssessments.propTypes = {
  courses: ImmutablePropTypes.list.isRequired,
  page: ImmutablePropTypes.map
};

SkillsAssessments.defaultProps = {
  courses: List(),
  page: Map()
};

const mapStateToProps = state => ({
  courses: courseSelectors.getCourses(state),
  page: pageSelectors.getPage(state, 'skills-assessments')
});

export default connect(mapStateToProps)(SkillsAssessments);
