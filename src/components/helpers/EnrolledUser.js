import ImmutablePropTypes from 'react-immutable-proptypes';

import {userEnrolled} from '../../utils/userHelpers';
import withUser from '../withUser';

const EnrolledUser = ({user, children}) => {
  if (userEnrolled(user)) {
    return children;
  }

  return null;
};

EnrolledUser.propTypes = {
  user: ImmutablePropTypes.map
};

export default withUser(EnrolledUser);
