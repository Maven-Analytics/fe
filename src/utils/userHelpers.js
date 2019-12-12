import {subscriptionStatuses} from '../constants';

export const userEnrolled = user => {
  return user &&
    user.get('subscription_status') &&
    (
      user.get('subscription_status') === subscriptionStatuses.paid ||
      user.get('subscription_status') === subscriptionStatuses.trial
    );
};
