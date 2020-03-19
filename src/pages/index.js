import gql from 'graphql-tag';
import {fromJS, isImmutable} from 'immutable';
import * as PropTypes from 'prop-types';
import React from 'react';

import pageFragment from '#root/api/fragments/page';
import spotlightFragment from '#root/api/fragments/spotlight';
import Head from '#root/components/head';
import Brochure from '#root/components/layout/brochure';
import Clients from '#root/components/sections/clients';
import Hero from '#root/components/sections/hero';
import MethodMobile from '#root/components/sections/methodMobile';
import MethodPath from '#root/components/sections/methodPath';
import Mission from '#root/components/sections/mission';
import StatCounter from '#root/components/sections/statCounter';
import StudentSpotlights from '#root/components/sections/studentSpotlights';
import TrendingCourses from '#root/components/sections/trendingCourses';
import {Routes} from '#root/routes';

const methodItems = [
  {
    text: 1,
    img: '/static/img/step1.png',
    width: 1000,
    height: 633,
    title: 'Find your Path',
    description: 'Take a quick, 2-minute survey and we’ll match you with the best courses & paths to help you reach your goals',
    linkTitle: 'FIND YOUR PATH',
    linkHref: Routes.WelcomeSurvey,
    sectionHeight: 540,
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
    sectionHeight: 606,
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
    sectionHeight: 597,
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

const MissionContent = `
Our Mission
## Empower everyday people to change the world with data.
Our formula is simple: quality content, exceptional instructors, and unique tools to help you build the exact skills you need, exactly when you need them.`;

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

const Home = ({spotlights, page}) => {
  spotlights = fromJS(spotlights);
  page = fromJS(page);

  return (
    <Brochure>
      {isImmutable(page) && page.get('meta') && isImmutable(page.get('meta')) && !page.get('meta').isEmpty() ? (
        <Head meta={page.get('meta')} />
      ) : null}
      <Hero />

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
            value: 30000,
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
        features={fromJS([
          {
            title: 'Self-Paced Courses',
            icon: 'play',
            description:
              'Stay ahead of the curve with our award-winning, self-paced courses and paths. Our training is designed to help you quickly build the most practical, in-demand analytics and business intelligence skills',
            linkText: 'Explore Courses & Paths',
            linkUrl: Routes.CoursesPaths
          },
          {
            title: 'Skills Assessments',
            icon: 'quiz',
            description:
              'Labels like “beginner” and “expert” mean different things to different people. That’s why our courses include preliminary assessments to benchmark your skills, along with final assessments to prove how far you’ve come',
            linkText: 'Try A Practice Assessment',
            linkUrl: Routes.SkillsAssessments
          },
          {
            title: 'Verified Credentials',
            icon: 'badge',
            description:
              'Instead of traditional certificates, we issue secure digital credentials (in the form of badges) to validate your skills. They even link directly to real-time job postings, to help you turn your new skills into a new career',
            linkText: 'View Credentials',
            linkUrl: Routes.Credentials
          },
          {
            title: 'Student Dashboard',
            icon: 'dashboard',
            description:
              'Your student dashboard allows you to track your progress towards courses and paths, manage your credentials, explore new content, and share your achievements with the world',
            linkText: 'Sign Up For Free',
            linkUrl: Routes.Signup
          }
        ])}
      />
      <div id="method">
        <MethodMobile items={methodItems} />
        <MethodPath items={methodItems} />
      </div>
      <TrendingCourses />
      <StudentSpotlights spotlights={spotlights} />
      <Clients clients={HappyClients} />
    </Brochure>
  );
};

const spotlightQuery = gql`
  {
    spotlights {
      ...spotlight
    }
  }
  ${spotlightFragment}
`;

const pageQuery = gql`
  query($slug: String!) {
    page(slug: $slug) {
      ...page
    }
  }
  ${pageFragment}
`;

Home.getInitialProps = async ({apolloClient}) => {
  const {
    data: {page}
  } = await apolloClient.query({
    query: pageQuery,
    variables: {slug: 'home'}
  });

  const {
    data: {spotlights}
  } = await apolloClient.query({
    query: spotlightQuery
  });

  return {
    spotlights,
    page
  };
};

Home.propTypes = {
  spotlights: PropTypes.array,
  page: PropTypes.object
};

Home.defaultProps = {
  spotlights: [],
  page: {}
};

export default Home;
