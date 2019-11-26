import {fromJS} from 'immutable';

export const plans = fromJS([
  {
    id: 1,
    eyelash: 'Monthly',
    title: '10 Day FREE Trial',
    price: 'then <sup>$</sup>29/mo',
    description:
      'Monthly subscription includes a free 10-day, all-access trial. You will be subscribed monthly after the trial period for $29 per month. No obligation, cancel anytime. 100% satisfaction guarantee'
  },
  {
    id: 2,
    eyelash: 'ANNUAL - SAVE $49 PER YEAR',
    title: '10 Day FREE Trial',
    price: 'then <sup>$</sup>299/yr',
    description:
      'Annual subscription includes a free 10-day, all-access trial. You will be subscribed annual after the trial period for $299 per year. No obligation, cancel anytime. 100% satisfaction guarantee'
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
