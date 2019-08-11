import {fromJS} from 'immutable';

export const plans = fromJS([
  {
    id: 1,
    eyelash: 'Monthly',
    title: '10 Day FREE Trial',
    price: 'then <sup>$</sup>39/mo',
    description: 'You’ll have a free 10 day all course access to Maven  Analytics. You will be subscribed monthly after the trial ends for $39 per month.  No obligation cancel anytime. 100% satisfaction guarantee.',
    checkoutUrl: '//mavenanalytics.thinkific.com/enroll/471038'
  },
  {
    id: 2,
    eyelash: 'ANNUAL - SAVE $69 PER YEAR',
    title: '10 Day FREE Trial',
    price: 'then <sup>$</sup>399/yr',
    description: 'You’ll have a Free 10 day all course access to Maven  Analytics. You will be subscribed annually at $399 per year after the trial ends. No obligation cancel anytime. 100% satisfaction guarantee. ',
    checkoutUrl: '//mavenanalytics.thinkific.com/cart/add_product/471038?price_id=516246'
  }
]);
