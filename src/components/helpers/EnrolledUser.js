import ImmutablePropTypes from 'react-immutable-proptypes';

import {subscriptionEnrolled} from '../../utils/subscriptionHelpers';
import withSubscription from '../withSubscription';

const EnrolledUser = ({subscription, children}) => {
  if (subscriptionEnrolled(subscription)) {
    return children;
  }

  return null;
};

EnrolledUser.propTypes = {
  subscription: ImmutablePropTypes.map
};

export default withSubscription(EnrolledUser);
