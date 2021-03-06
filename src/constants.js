import {fromJS} from 'immutable';

export const plans = fromJS([
  {
    hasTrial: true,
    showOnSignup: true,
    amountCents: 2900,
    id: 1,
    interval: 'month',
    eyelash: 'Monthly',
    title: '7 Day FREE Trial',
    planId: 'individual-monthly',
    planName: 'Maven Individual Plan (Monthly)',
    price: 'then <sup>$</sup>29/mo',
    description:
      'Monthly subscription includes a free 7-day, all-access trial. You will be subscribed monthly after the trial period for $29 per month. No obligation, cancel anytime. 100% satisfaction guarantee'
  },
  {
    hasTrial: true,
    showOnSignup: true,
    amountCents: 29900,
    id: 2,
    interval: 'year',
    eyelash: 'ANNUAL - SAVE $49 PER YEAR',
    title: '7 Day FREE Trial',
    planId: 'individual-annual',
    planName: 'Maven Individual Plan (Annual)',
    price: 'then <sup>$</sup>299/yr',
    description:
      'Annual subscription includes a free 7-day, all-access trial. You will be subscribed annual after the trial period for $299 per year. No obligation, cancel anytime. 100% satisfaction guarantee'
  },
  {
    hasTrial: false,
    showOnSignup: false,
    amountCents: 65000,
    id: 3,
    interval: 'month',
    eyelash: 'Monthly',
    title: 'Custom Enterprise Plan',
    planId: 'adamsaii',
    planName: 'Custom Enterprise Plan',
    thanksRedirect: 'https://adamsoacts.mavenanalytics.io'
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

export const subscriptionStatuses = {
  prospect: 'prospect',
  trial: 'trial',
  paid: 'paid',
  canceled: 'canceled',
  past_due: 'past_due'
};

export const planIds = {
  '4c462f2f-66ba-40f7-8928-b5868290b736': 'Individual (Annual)', // With trial
  '7ad0d38b-39ce-4e1d-bd63-448d6a54720d': 'Individual (Monthly)', // With trial
  '0275297e-9ae1-46a2-b446-3ecd7ea6da73': 'Individual (Annual)', // No trial version
  '736932a5-b28f-49c6-bad1-16cd02b8dcfc': 'Individual (Monthly)', // No trial version
  plan_GcoSiaMBDuMQzQ: 'Individual (Annual)',
  plan_GcoRd518QBffwP: 'Individual (Monthly)',
  'individual-annual': 'Individual (Annual)',
  'individual-monthly': 'Individual (Monthly)',
  adamsaii: 'Custom Enterprise (Monthly)'
};

// 7 days in milliseconds
export const trialLength = 604800000;

export const defaultAuthImages = ['/static/img/auth-bg-1440.jpg 1440w', '/static/img/auth-bg-2880.jpg 2880w'];
