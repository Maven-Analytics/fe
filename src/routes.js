import {fromJS} from 'immutable';

import accessConfig from './utils/accessConfig';

export const Routes = {
  Home: '/',
  Account: '/dashboard/account',
  AccountPassword: '/dashboard/account/password',
  Badges: '/badges',
  BiVideoSeries: '/bi-video-series',
  Contact: '/contact',
  Consulting: '/consulting',
  CoursesPaths: '/courses-learning-paths',
  Course: slug => `/course/${slug}`,
  CourseTake: `//${accessConfig('THINKIFIC_SUBDOMAIN', 'mavenanalytics')}.thinkific.com/courses/take`,
  Credentials: '/credentials',
  Dashboard: '/dashboard',
  DashboardPaths: '/dashboard/learning-paths',
  DashboardCourses: '/dashboard/courses',
  DashboardCredentials: '/dashboard/credentials',
  Error: '/error',
  FAQ: '/faq',
  ForgotPassword: '/forgot',
  HelpCenter: '//help.mavenanalytics.io',
  Login: '/login',
  Logout: '/logout',
  Path: '/path',
  PrivacyPolicy: '/privacy-policy',
  Reset: '/reset',
  SkillsAssessments: '/skills-assessments',
  Signup: '/signup',
  SignupAccount: '/signup/account',
  SignupThanks: '/signup/thanks',
  Team: '/meet-the-team',
  TeamTraining: '/team-training',
  Terms: '/terms',
  WelcomeSurvey: '/welcome',
  WelcomeResults: '/welcome/results'
};

export const menuLinksMain = fromJS([
  {
    title: 'Pricing',
    url: Routes.Signup
  },
  {
    title: 'Courses & Paths',
    url: Routes.CoursesPaths
  },
  {
    title: 'Skills Assessments',
    url: Routes.SkillsAssessments
  },
  {
    title: 'Team Training',
    url: Routes.TeamTraining
  }
]);

export const menuLinksRegister = fromJS([
  {
    title: 'Contact',
    url: Routes.Home
  },
  {
    title: 'Login',
    url: Routes.Login,
    icon: 'user'
  },
  {
    title: 'Sign Up',
    url: Routes.Signup,
    btn: true
  }
]);

export const footerLinks = fromJS([
  {
    title: 'Learn',
    links: [
      {
        text: 'Match Survey',
        url: Routes.WelcomeSurvey
      },
      {
        text: 'Practice Assessments',
        url: Routes.SkillsAssessments
      },
      {
        text: 'Courses & Paths',
        url: Routes.CoursesPaths
      }
    ]
  },
  {
    title: 'Resources',
    links: [
      {
        text: 'Help Center',
        url: Routes.HelpCenter
      },
      {
        text: 'Credentials & Badges',
        url: Routes.Credentials
      },
      {
        text: 'Team Training',
        url: Routes.TeamTraining
      },
      {
        text: 'Consulting',
        url: Routes.Consulting
      },
      {
        text: 'Why BI?',
        url: Routes.BiVideoSeries
      }
    ]
  }
]);

export const footerConnectLinks = fromJS([
  {
    text: 'Meet The Team',
    url: Routes.Team
  },
  {
    text: 'Contact',
    url: Routes.Contact
  }
]);

export const copyLinks = fromJS([
  {
    url: Routes.Terms,
    text: 'Terms & Conditions'
  },
  {
    url: Routes.PrivacyPolicy,
    text: 'Privacy'
  },
  {
    url: Routes.Contact,
    text: 'Contact'
  }
]);
