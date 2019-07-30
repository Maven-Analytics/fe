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
    title: 'Tell Us About Yourself',
    description: 'Take a quick survey so we can match your learning needs with the best Maven Analytics courses and paths.',
    linkTitle: 'TAKE SURVEY',
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
    title: 'Measure Your Baseline Skills',
    description: 'Test your skills with some of our in-depth practice assessments. We’ll match your current skills with the right courses and paths',
    linkTitle: 'TAKE ASSESSMENT',
    linkHref: '/',
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
    title: 'Learn & Expand Your Expertise',
    description: 'Take self-paced online courses with comprehensive videos, detailed course materials, and one-on-one support, specific to your learning goals and ambitions. ',
    linkTitle: 'VIEW COURSES & PATHS',
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
    title: 'Track & Promote Your Achievements',
    description: 'Earn certified credentials and badges for each course and path completed.  Promote your talents and achieve your certified data rockstar status.',
    linkTitle: 'VIEW CREDENTIALS',
    linkHref: '/',
    imgMobile: {
      src: '/static/img/step4-mobile.png',
      alt: 'Online courses.',
      width: 600,
      height: 380
    }
  }
];

const MissionContent = `## THERE'S A BETTER WAY TO **BUILD YOUR SKILLS**
Your time is valuable; don’t spend it sifting through courses, webinars and bootcamps trying to figure out where to start. Think of us as your personal team of instructors, experts, mentors and guides, here to **simplify the learning process** and **help you develop the exact skills you need.**`;

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
              value: 158,
              text: 'Countries Represented'
            },
            {
              value: 300,
              text: 'Training Videos',
              postFix: '+'
            },
            {
              value: 5000,
              text: '5-Star Reviews',
              postFix: '+'
            },
            {
              value: 100,
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
              title: 'Self-paced courses',
              icon: 'play'
            },
            {
              title: 'Skills assessments',
              icon: 'quiz'
            },
            {
              title: 'Verified credentisla',
              icon: 'badge'
            },
            {
              title: 'Team training',
              icon: 'team'
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
