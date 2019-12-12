import ImmutablePropTypes from 'react-immutable-proptypes';

import {userEnrolled} from '../../utils/userHelpers';
import withUser from '../withUser';

const UnenrolledUser = ({user, children}) => {
  if (userEnrolled(user)) {
    return null;
  }

  return children;
};

UnenrolledUser.propTypes = {
  user: ImmutablePropTypes.map
};

export default withUser(UnenrolledUser);
