import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';

import AccountLayout from '#root/components/layout/account';
import PasswordForm from '#root/components/forms/password';
import withAuthSync from '../../../components/withAuthSync';

const AccountProfile = () => {
  return (
    <AccountLayout title="Change Your Password" activeLink={1}>
      <PasswordForm/>
    </AccountLayout>
  );
};

AccountProfile.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

AccountProfile.defaultProps = {
  user: Map(),
  recommendedPaths: List(),
  recommendedCourses: List()
};

export default withAuthSync(AccountProfile);
