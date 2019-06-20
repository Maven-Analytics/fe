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
    url: '/skills-assessment'
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

export const copyLinks = fromJS([
  {
    url: '/',
    text: 'Terms & Conditions'
  },
  {
    url: '/',
    text: 'Privacy'
  },
  {
    url: '/',
    text: 'Contact'
  }
]);

export const plans = fromJS([
  {
    id: 1,
    eyelash: 'Monthly',
    title: '10 Day FREE Trial',
    description: 'You’ll have a free 10 day all course access to Maven  Analytics. You will be subscribed monthly after the trial ends for $39 per month.  No obligation cancel anytime. 100% satisfaction guarantee.',
    checkoutUrl: '//mavenanalytics.thinkific.com/enroll/471038'
  },
  {
    id: 2,
    eyelash: 'ANNUAL - SAVE $69 PER YEAR',
    title: '10 Day FREE Trial',
    description: 'You’ll have a Free 10 day all course access to Maven  Analytics. You will be subscribed annually at $399 per year after the trial ends. No obligation cancel anytime. 100% satisfaction guarantee. ',
    checkoutUrl: '//mavenanalytics.thinkific.com/cart/add_product/471038?price_id=516246'
  }
]);
