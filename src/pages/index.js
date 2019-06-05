import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS} from 'immutable';
import Link from 'next/link';
import {TimelineMax as Timeline, Power1} from 'gsap';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {selectors as errorSelectors} from '../redux/ducks/error';
import Main from '../layouts/main';
import Hero from '../sections/hero';
import StatCounter from '../sections/statCounter';
import MethodScroll from '../sections/methodScroll';
import MethodMobile from '../sections/methodMobile';
import Mission from '../sections/mission';
import TrendingCourses from '../sections/trendingCourses';
import Clients from '../sections/clients';
import StudentSpotlights from '../sections/studentSpotlights';

const methodItems = [
  {
    text: 1,
    img: '/static/img/step1-browser.png',
    imgRetina: '/static/img/step1-browser@2x.png',
    img2: '/static/img/step1-popout.png',
    img2Retina: '/static/img/step1-popout@2x.png',
    width: 480,
    height: 287,
    top: 241,
    title: 'Tell Us About Yourself',
    description: 'Take a quick survey so we can match your learning needs with the best Maven Analytics courses and paths.',
    linkTitle: 'TAKE SURVEY',
    linkHref: '/',
    imgMobile: {
      src: '/static/img/step1-mobile.png',
      alt: 'Match your learning needs with the best Maven Analytics courses and paths',
      srcSet: '/static/img/step1-mobile.png 834w, /static/img/step1-mobile.png 1668w',
      width: 834,
      height: 512
    }
  },
  {
    text: 2,
    img: '/static/img/step2-browser.png',
    imgRetina: '/static/img/step2-browser@2x.png',
    img2: '/static/img/step2-popout.png',
    img2Retina: '/static/img/step2-popout@2x.png',
    width: 479,
    height: 347,
    top: 232,
    title: 'Measure Your Baseline Skills',
    description: 'Test your skills with some of our in-depth practice assessments. We’ll match your current skills with the right courses and paths',
    linkTitle: 'TAKE ASSESSMENT',
    linkHref: '/',
    imgMobile: {
      src: '/static/img/step2-mobile.png',
      alt: 'We’ll match your current skills with the right courses and paths',
      srcSet: '/static/img/step2-mobile.png 834w, /static/img/step2-mobile.png 1668w',
      width: 834,
      height: 549
    }
  },
  {
    text: 3,
    img: '/static/img/step3-browser.png',
    imgRetina: '/static/img/step3-browser@2x.png',
    img2: '/static/img/step3-popout.png',
    img2Retina: '/static/img/step3-popout@2x.png',
    ratio: '61.17%',
    width: 698,
    height: 427,
    top: 234,
    title: 'Learn & Expand Your Expertise',
    description: 'Take self-paced online courses with comprehensive videos, detailed course materials, and one-on-one support, specific to your learning goals and ambitions. ',
    linkTitle: 'VIEW COURSES & PATHS',
    linkHref: '/',
    imgMobile: {
      src: '/static/img/step3-mobile.png',
      alt: 'Online courses.',
      srcSet: '/static/img/step3-mobile.png 838w, /static/img/step3-mobile.png 1676w',
      width: 838,
      height: 631
    }
  },
  {
    text: 4,
    img: '/static/img/step4-browser.png',
    imgRetina: '/static/img/step4-browser@2x.png',
    img2: '/static/img/step4-popout.png',
    img2Retina: '/static/img/step4-popout@2x.png',
    width: 581,
    height: 427,
    top: 161,
    title: 'Track & Promote Your Achievements',
    description: 'Earn certified credentials and badges for each course and path completed.  Promote your talents and achieve your certified data rockstar status.',
    linkTitle: 'VIEW CREDENTIALS',
    linkHref: '/',
    imgMobile: {
      src: '/static/img/step4-mobile.png',
      alt: 'Online courses.',
      srcSet: '/static/img/step4-mobile.png 838w, /static/img/step4-mobile.png 1676w',
      width: 838,
      height: 558
    }
  }
];

const MissionContent = `## THERE'S A BETTER WAY TO **BUILD YOUR SKILLS**
Your time is valuable; don’t spend it sifting through courses, webinars and bootcamps trying to figure out where to start. Think of us as your personal team of instructors, experts, mentors and guides, here to **simplify the learning process** and **help you develop the exact skills you need.**`;

const Courses = fromJS([
  {
    title: 'Power Query, Power Pivot and DAX',
    difficulty: 3,
    link: '/',
    image: '//via.placeholder.com/253x102',
    recommended: true
  },
  {
    title: 'Data Visualization with Excel Charts & Graphs',
    difficulty: 3,
    link: '/',
    image: '//via.placeholder.com/253x102'
  },
  {
    title: 'Up and Running with Power BI Desktop',
    difficulty: 3,
    link: '/',
    image: '//via.placeholder.com/253x102',
    recommended: true
  },
  {
    title: 'Publishing to Power BI Service',
    difficulty: 3,
    link: '/',
    image: '//via.placeholder.com/253x102'
  }
]);

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
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.login({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <Main>
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
          courses={fromJS([...Courses.map((course, index) => course.set('id', index)), ...Courses.map((course, index) => course.set('id', index + 4)), ...Courses.map((course, index) => course.set('id', index + 8))])}
        />
        <StudentSpotlights/>
        <Clients clients={HappyClients}/>

        <div  className="container">

          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
          <h1>Homepage</h1>
        </div>
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions
    }, dispatch)
  };
};

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
