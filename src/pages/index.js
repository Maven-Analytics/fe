import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS, List, Map, isImmutable} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as courseSelectors, actions as courseActions} from '../redux/ducks/courses';
import {selectors as spotlightSelectors, actions as spotlightActions} from '../redux/ducks/spotlights';
import {selectors as pageSelectors, actions as pageActions} from '../redux/ducks/pages';
import Brochure from '../layouts/brochure';
import Hero from '../sections/hero';
import StatCounter from '../sections/statCounter';
import MethodScroll from '../sections/methodScroll';
import MethodMobile from '../sections/methodMobile';
import Mission from '../sections/mission';
import TrendingCourses from '../sections/trendingCourses';
import Clients from '../sections/clients';
import StudentSpotlights from '../sections/studentSpotlights';
import Head from '../components/head';
import {Routes} from '../routes';

const methodItems = [
  {
    text: 1,
    img: '/static/img/step1.png',
    width: 1000,
    height: 633,
    title: 'Find your Path',
    description: 'Take a quick, 2-minute survey and we’ll match you with the best courses & paths to help you reach your goals',
    linkTitle: 'TAKE THE SURVEY',
    linkHref: Routes.WelcomeSurvey,
    imgMobile: {
      src: '/static/img/step1-mobile.png',
      alt: 'Match your learning needs with the best Maven Analytics courses and paths',
      width: 600,
      height: 380
    }
  },
  {
    text: 2,
    img: '/static/img/step2.png',
    width: 1000,
    height: 633,
    top: 232,
    title: 'Assess your Skills',
    description: 'Kick off each course with a benchmark assessment to see how your skills stack up, and where they fall short',
    linkTitle: 'TRY A PRACTICE ASSESSMENT',
    linkHref: Routes.SkillsAssessments,
    imgMobile: {
      src: '/static/img/step2-mobile.png',
      alt: 'We’ll match your current skills with the right courses and paths',
      width: 600,
      height: 380
    }
  },
  {
    text: 3,
    img: '/static/img/step3.png',
    imgRetina: '/static/img/step3-browser@2x.png',
    ratio: '61.17%',
    width: 1000,
    height: 633,
    top: 234,
    title: 'Build your Expertise',
    description: 'Complete courses & paths to develop expert-level analytics and business intelligence skills',
    linkTitle: 'EXPLORE COURSES & PATHS',
    linkHref: Routes.CoursesPaths,
    imgMobile: {
      src: '/static/img/step3-mobile.png',
      alt: 'Online courses.',
      width: 600,
      height: 380
    }
  },
  {
    text: 4,
    img: '/static/img/step4.png',
    width: 1000,
    height: 633,
    top: 161,
    title: 'Track your Progress',
    description: 'Earn credentials, track your progress, and share your achievements from your personal student dashboard',
    linkTitle: 'LEARN ABOUT CREDENTIALS',
    linkHref: Routes.Credentials,
    imgMobile: {
      src: '/static/img/step4-mobile.png',
      alt: 'Online courses.',
      width: 600,
      height: 380
    }
  }
];

const MissionContent = `## REAL WORLD SKILLS

In a world that runs on data, we’re here to help you keep pace. Our formula is simple: quality content, exceptional instructors, unparalleled support, and tools to help you build powerful, practical analytics and BI skills.`;
const HappyClients = fromJS([
  {
    name: 'Beam',
    image: '/static/img/client-logo-1.png'
  },
  {
    name: '1010Data',
    image: '/static/img/client-logo-2.png'
  },
  {
    name: 'Cogniscient Media',
    image: '/static/img/client-logo-3.png'
  },
  {
    name: 'McCann Worldgroup',
    image: '/static/img/client-logo-4.png'
  },
  {
    name: 'Johnson & Johnson',
    image: '/static/img/client-logo-5.png'
  },
  {
    name: 'Toms of Maine',
    image: '/static/img/client-logo-6.png'
  },
  {
    name: 'Wayfair',
    image: '/static/img/client-logo-7.png'
  }
]);

class Home extends Component {
  render() {
    const {spotlights, page} = this.props;

    return (
      <Brochure>
        {isImmutable(page) && page.get('meta') && isImmutable(page.get('meta')) && !page.get('meta').isEmpty() ? <Head meta={page.get('meta')}/> : null}
        <Hero/>

        <StatCounter
          stats={fromJS([
            {
              value: 97,
              text: 'Student Satisfaction',
              postFix: '%'
            },
            {
              value: 850,
              text: 'Training Videos',
              postFix: '+'
            },
            {
              value: 5000,
              text: '5-Star Reviews',
              postFix: '+'
            },
            {
              value: 200,
              text: 'Happy Students',
              postFix: 'K+'
            }
          ])}
        />

        <Mission
          scrollTo="#method"
          content={MissionContent}
          icons={fromJS([
            {
              title: 'Self-Paced Courses',
              icon: 'play'
            },
            {
              title: 'Skills Assessments',
              icon: 'quiz'
            },
            {
              title: 'Verified Credentials',
              icon: 'badge'
            },
            {
              title: 'Student Dashboard',
              icon: 'dashboard'
            }
          ])}
        />
        <div id="method">
          <MethodMobile items={methodItems}/>
          <MethodScroll items={methodItems}/>
        </div>
        <TrendingCourses
          courses={this.props.courses}
        />
        <StudentSpotlights spotlights={spotlights}/>
        <Clients clients={HappyClients}/>
      </Brochure>
    );
  }
}

Home.getInitialProps = ctx => {
  const {store} = ctx;
  store.dispatch(courseActions.coursesInit({
    params: {
      'fields.trending': true
    }
  }));

  store.dispatch(spotlightActions.spotlightsGet());
  store.dispatch(pageActions.pagesGet({slug: 'home'}));
};

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  courses: ImmutablePropTypes.list,
  spotlights: ImmutablePropTypes.list,
  page: ImmutablePropTypes.map
};

Home.defaultProps = {
  courses: List(),
  spotlights: List(),
  page: Map()
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state),
  courses: courseSelectors.getCourses(state),
  spotlights: spotlightSelectors.getSpotlights(state),
  page: pageSelectors.getPage(state, 'home')
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
