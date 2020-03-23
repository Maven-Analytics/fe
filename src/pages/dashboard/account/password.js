import {List, Map} from 'immutable';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {PasswordForm} from 'maven-ui';
import {useMutation} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

import AccountLayout from '#root/components/layout/account';
import updateUserMutation from '#root/api/mutations/updateUser';
import {selectors as userSelectors} from '#root/redux/ducks/user';
import withAuthSync from '#root/components/withAuthSync';

const AccountProfile = () => {
  const user = useSelector(userSelectors.getUser);

  const [updateUser, {error}] = useMutation(updateUserMutation);
  const [response, setResponse] = useState();

  const handleFormSubmit = async ({currentPassword, newPassword, confirmPassword}) => {
    setResponse(null);
    await updateUser({
      variables: {
        email: user.get('email'),
        first_name: user.get('first_name'),
        last_name: user.get('last_name'),
        postal_code: user.get('postal_code'),
        country: user.get('country'),
        currentPassword,
        newPassword,
        confirmPassword
      }
    });

    setResponse('Your password has been reset!');
  };

  return (
    <AccountLayout title="Change Your Password" activeLink={1}>
      <PasswordForm error={error} onFormSubmit={handleFormSubmit} response={response} />
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
