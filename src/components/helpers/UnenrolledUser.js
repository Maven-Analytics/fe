import ImmutablePropTypes from 'react-immutable-proptypes';

import {subscriptionEnrolled} from '../../utils/subscriptionHelpers';
import withSubscription from '../withSubscription';

const UnenrolledUser = ({subscription, children}) => {
  if (subscriptionEnrolled(subscription)) {
    return null;
  }

  return children;
};

UnenrolledUser.propTypes = {
  subscription: ImmutablePropTypes.map
};

export default withSubscription(UnenrolledUser);
