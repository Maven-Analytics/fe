import {fromJS, isImmutable, List} from 'immutable';

import {subscriptionStatuses} from '#root/constants';

export const subscriptionEnrolled = subscription => {
  subscription = isImmutable(subscription) ? subscription : fromJS(subscription);
  return (
    subscription &&
    subscription.get('subscription_status') &&
    (subscription.get('subscription_status') === subscriptionStatuses.paid || subscription.get('subscription_status') === subscriptionStatuses.trial)
  );
};

export const canTrial = subscription => {
  subscription = isImmutable(subscription) ? subscription : fromJS(subscription);

  return (
    !subscription ||
    !subscription.get('subscriptions') ||
    !subscription.get('subscriptions').count() ||
    subscription.get('subscriptions').count() === 0
  );
};

export const findSubscription = (planId, subscription, status = List()) => {
  subscription = isImmutable(subscription) ? subscription : fromJS(subscription);

  const found = subscription && subscription.get('subscriptions') && subscription.get('subscriptions').find(s => s.get('plan_id') === planId);

  if (!status || status.isEmpty()) {
    return found;
  }

  return found && status.includes(found.get('status'));
};
