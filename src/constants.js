import {fromJS} from 'immutable';

export const menuLinksMain = fromJS([
  {
    title: 'Pricing',
    url: '/'
  },
  {
    title: 'Courses & Paths',
    url: '/'
  },
  {
    title: 'Skills Assessments',
    url: '/'
  },
  {
    title: 'Team Training',
    url: '/'
  }
]);

export const menuLinksRegister = fromJS([
  {
    title: 'Contact',
    url: '/'
  },
  {
    title: 'Login',
    url: '/login',
    icon: 'user'
  },
  {
    title: 'Sign Up',
    url: '/register',
    btn: true
  }
]);

export const footerLinks = fromJS([
  {
    title: 'Learn',
    links: [
      {
        text: 'Get Started',
        url: '/'
      },
      {
        text: 'Skills Assessments',
        url: '/'
      },
      {
        text: 'Courses',
        url: '/'
      },
      {
        text: 'Learning Paths',
        url: '/'
      },
      {
        text: 'Team Training',
        url: '/'
      }
    ]
  },
  {
    title: 'Resources',
    links: [
      {
        text: 'Success Stories',
        url: '/'
      },
      {
        text: 'Certified Credentials',
        url: '/'
      },
      {
        text: 'FAQ',
        url: '/'
      }
    ]
  }
]);
