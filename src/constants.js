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
