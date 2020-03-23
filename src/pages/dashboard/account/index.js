import React, {useState} from 'react';
import {ProfileForm} from 'maven-ui';
import {useMutation} from '@apollo/react-hooks';

import AccountLayout from '#root/components/layout/account';

import withAuthSync from '#root/components/withAuthSync';
import {useSelector, useDispatch} from 'react-redux';
import {actions as userActions, selectors as userSelectors} from '#root/redux/ducks/user';
import updateUserMutation from '#root/api/mutations/updateUser';

const AccountProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  const [updateUser, {error}] = useMutation(updateUserMutation);
  const [response, setResponse] = useState();

  const handleFormSubmit = async ({email, first_name, last_name, postal_code, country}) => {
    setResponse(null);
    const {
      data: {updateUser: updatedUser}
    } = await updateUser({
      variables: {email, first_name, last_name, postal_code, country}
    });

    setResponse('Your profile has been updated!');
    dispatch(userActions.userSet(updatedUser));
  };

  return (
    <AccountLayout title="Your Profile" activeLink={0}>
      <ProfileForm
        error={error}
        defaultValues={{
          country: user.get('country'),
          email: user.get('email'),
          first_name: user.get('first_name'),
          last_name: user.get('last_name'),
          postal_code: user.get('postal_code')
        }}
        onFormSubmit={handleFormSubmit}
        response={response}
      />
    </AccountLayout>
  );
};

export default withAuthSync(AccountProfile);
