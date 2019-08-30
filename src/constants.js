import {fromJS} from 'immutable';

export const plans = fromJS([
  {
    id: 1,
    eyelash: 'Monthly',
    title: '10 Day FREE Trial',
    price: 'then <sup>$</sup>39/mo',
    description: 'Monthly subscription includes a free 10-day, all-access trial. You will be subscribed monthly after the trial period for $39 per month. No obligation, cancel anytime. 100% satisfaction guarantee',
    checkoutUrl: 'https://courses.mavenanalytics.io/enroll/471038'
  },
  {
    id: 2,
    eyelash: 'ANNUAL - SAVE $69 PER YEAR',
    title: '10 Day FREE Trial',
    price: 'then <sup>$</sup>399/yr',
    description: 'Annual subscription includes a free 10-day, all-access trial. You will be subscribed annual after the trial period for $399 per year. No obligation, cancel anytime. 100% satisfaction guarantee',
    checkoutUrl: 'https://courses.mavenanalytics.io/cart/add_product/471038?price_id=516246'
  }
]);

export const courseHeroBgSrc = '/static/img/course-listing-bg-720.jpg';

export const courseHeroBgSources = [
  {
    srcSet: '/static/img/course-listing-bg-1440.webp 1440w',
    type: 'image/webp'
  },
  {
    srcSet: '/static/img/course-listing-bg-1440.jpg 1440w',
    type: 'image/jpeg'
  },
  {
    srcSet: '/static/img/course-listing-bg-720.webp 720w',
    type: 'image/webp'
  },
  {
    srcSet: '/static/img/course-listing-bg-720.jpg 720w',
    type: 'image/jpeg'
  }
];
