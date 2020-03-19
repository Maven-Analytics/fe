import {fromJS} from 'immutable';

const THINKIFIC_SUBDOMAIN = process.env.THINKIFIC_SUBDOMAIN || 'mavenanalytics';

export const Routes = {
  Home: '/',
  Account: '/dashboard/account',
  AccountBilling: '/dashboard/account/billing',
  AccountInvoices: '/dashboard/account/invoices',
  AccountPassword: '/dashboard/account/password',
  Badges: '/badges',
  BiVideoSeries: '/bi-video-series',
  Blog: '/blog',
  Contact: '/contact',
  Consulting: '/consulting',
  CoursesPaths: '/courses-learning-paths',
  Course: slug => `/course/${slug}`,
  CourseTake: `http://${THINKIFIC_SUBDOMAIN}.thinkific.com/courses/take`,
  Credentials: '/credentials',
  Dashboard: '/dashboard',
  DashboardPaths: '/dashboard/learning-paths',
  DashboardCourses: '/dashboard/courses',
  DashboardCredentials: '/dashboard/credentials',
  Error: '/error',
  FAQ: '/faq',
  ForgotPassword: '/forgot',
  HelpCenter: 'https://help.mavenanalytics.io',
  Login: '/login',
  Logout: '/logout',
  Path: '/path',
  PrivacyPolicy: '/privacy',
  Reset: '/reset',
  SkillsAssessments: '/skills-assessments',
  Signup: '/signup',
  SignupAccount: '/signup/account',
  SignupCheckout: '/signup/checkout',
  SignupThanks: '/signup/thanks',
  Team: '/meet-the-team',
  TeamTraining: '/team-training',
  Terms: '/terms',
  WelcomeSurvey: '/welcome',
  WelcomeResults: '/welcome/results'
};

export const menuLinksMain = [
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
];

export const menuLinksRegister = [
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
    className: 'btn btn--primary',
    title: 'Sign Up',
    url: Routes.Signup
  }
];

export const userMenuLinks = [
  {
    title: 'Dashboard',
    url: Routes.Dashboard
  },
  {
    title: 'My Account',
    url: Routes.Account
  },
  {
    title: 'Sign Out',
    url: Routes.Logout
  }
];

export const footerLinks = [
  {
    title: 'Learn',
    links: [
      {
        title: 'Match Survey',
        url: Routes.WelcomeSurvey
      },
      {
        title: 'Practice Assessments',
        url: Routes.SkillsAssessments
      },
      {
        title: 'Courses & Paths',
        url: Routes.CoursesPaths
      }
    ]
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Help Center',
        url: Routes.HelpCenter,
        external: true
      },
      {
        title: 'Credentials & Badges',
        url: Routes.Credentials
      },
      {
        title: 'Team Training',
        url: Routes.TeamTraining
      },
      {
        title: 'Consulting',
        url: Routes.Consulting
      },
      {
        title: 'Why BI?',
        url: Routes.BiVideoSeries
      }
    ]
  }
];

export const footerConnectLinks = [
  {
    title: 'Meet The Team',
    url: Routes.Team
  },
  {
    title: 'Contact',
    url: Routes.Contact
  }
];

export const copyLinks = [
  {
    url: Routes.Terms,
    title: 'Terms & Conditions'
  },
  {
    url: Routes.PrivacyPolicy,
    title: 'Privacy'
  },
  {
    url: Routes.Contact,
    title: 'Contact'
  }
];
