import {fromJS, isImmutable} from 'immutable';

import {subscriptionStatuses} from '#root/constants';

export const subscriptionEnrolled = subscription => {
  subscription = isImmutable(subscription) ? subscription : fromJS(subscription);
  return subscription &&
  subscription.get('subscription_status') &&
    (
      subscription.get('subscription_status') === subscriptionStatuses.paid ||
      subscription.get('subscription_status') === subscriptionStatuses.trial
    );
};

export const canTrial = subscription => {
  subscription = isImmutable(subscription) ? subscription : fromJS(subscription);

  return !subscription ||
    !subscription.get('subscriptions') ||
    !subscription.get('subscriptions').count() ||
    subscription.get('subscriptions').count() === 0;
};

export const findSubscription = (planId, subscription) => {
  subscription = isImmutable(subscription) ? subscription : fromJS(subscription);

  const found = subscription &&
  subscription.get('subscriptions') &&
  subscription.get('subscriptions').find(s => s.get('plan_id') === planId);

  return found && (found.get('status') === 'paid' || found.get('status') === 'trial');
};

