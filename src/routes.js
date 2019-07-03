import {fromJS} from 'immutable';

import config from './config';

export const Routes = {
  Home: '/',
  Account: '/dashboard/account',
  AccountPassword: '/dashboard/account/password',
  Badges: '/badges',
  Contact: '/contact',
  Courses: '/courses',
  Course: '/course',
  CourseTake: `//${config.THINKIFIC_SUBDOMAIN}.thinkific.com/courses/take`,
  Dashboard: '/dashboard',
  DashboardPaths: '/dashboard/learning-paths',
  DashboardCourses: '/dashboard/courses',
  DashboardCredentials: '/dashboard/credentials',
  ForgotPassword: '/forgot',
  Login: '/login',
  Path: '/path',
  PrivacyPolicy: '/privacy-policy',
  Reset: '/reset',
  Signup: '/signup',
  SignupAccount: '/signup/account',
  SignupThanks: '/signup/thanks',
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
    url: Routes.Home
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
        url: Routes.Home
      },
      {
        text: 'Skills Assessments',
        url: Routes.Home
      },
      {
        text: 'Courses',
        url: Routes.Home
      },
      {
        text: 'Learning Paths',
        url: Routes.Home
      },
      {
        text: 'Team Training',
        url: Routes.Home
      }
    ]
  },
  {
    title: 'Resources',
    links: [
      {
        text: 'Success Stories',
        url: Routes.Home
      },
      {
        text: 'Certified Credentials',
        url: Routes.Home
      },
      {
        text: 'FAQ',
        url: Routes.Home
      }
    ]
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
