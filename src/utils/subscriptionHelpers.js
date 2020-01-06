import {subscriptionStatuses} from '#root/constants';

export const subscriptionEnrolled = subscription => {
  return subscription &&
  subscription.get('subscription_status') &&
    (
      subscription.get('subscription_status') === subscriptionStatuses.paid ||
      subscription.get('subscription_status') === subscriptionStatuses.trial
    );
};
