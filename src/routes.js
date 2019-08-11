import {fromJS} from 'immutable';

import config from './config';

export const Routes = {
  Home: '/',
  Account: '/dashboard/account',
  AccountPassword: '/dashboard/account/password',
  Badges: '/badges',
  Contact: '/contact',
  Consulting: '/consulting',
  CoursesPaths: '/courses-learning-paths',
  Course: slug => `/course/${slug}`,
  CourseTake: `//${config.THINKIFIC_SUBDOMAIN}.thinkific.com/courses/take`,
  Credentials: '/credentials',
  Dashboard: '/dashboard',
  DashboardPaths: '/dashboard/learning-paths',
  DashboardCourses: '/dashboard/courses',
  DashboardCredentials: '/dashboard/credentials',
  FAQ: '/faq',
  ForgotPassword: '/forgot',
  Login: '/login',
  Path: '/path',
  PrivacyPolicy: '/privacy-policy',
  Reset: '/reset',
  SkillsAssessments: '/skills-assessments',
  Signup: '/signup',
  SignupAccount: '/signup/account',
  SignupThanks: '/signup/thanks',
  Team: '/team',
  TeamTraining: '/team-training',
  Terms: '/terms',
  WelcomeSurvey: '/welcome',
  WelcomeResults: '/welcome/results'
};

export const menuLinksMain = fromJS([
  {
    title: 'Pricing',
    url: Routes.Home
  },
  {
    title: 'Courses & Paths',
    url: Routes.CoursesPaths
  },
  {
    title: 'Skills Assessments',
    url: Routes.Home
  },
  {
    title: 'Team Training',
    url: Routes.Home
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
        text: 'Get Started',
        url: Routes.Signup
      },
      {
        text: 'Courses & Paths',
        url: Routes.CoursesPaths
      },
      {
        text: 'Skills Assessments',
        url: Routes.SkillsAssessments
      },
      {
        text: 'Team Training',
        url: Routes.TeamTraining
      }
    ]
  },
  {
    title: 'Resources',
    links: [
      {
        text: 'Credentials & Badges',
        url: Routes.Credentials
      },
      {
        text: 'FAQ',
        url: Routes.FAQ
      },
      {
        text: 'Consulting',
        url: Routes.FAQ
      }
    ]
  }
]);

export const footerConnectLinks = fromJS([
  {
    text: 'Meet The Team',
    url: Routes.Team
  }
]);

export const copyLinks = fromJS([
  {
    url: Routes.Home,
    text: 'Terms & Conditions'
  },
  {
    url: Routes.Home,
    text: 'Privacy'
  },
  {
    url: Routes.Home,
    text: 'Contact'
  }
]);
