import React, {useState} from 'react';
import {ImageUpload, ProfileForm} from 'maven-ui';
import {useMutation} from '@apollo/react-hooks';
import {useSelector, useDispatch} from 'react-redux';
import gql from 'graphql-tag';

import AccountLayout from '#root/components/layout/account';
import withAuthSync from '#root/components/withAuthSync';
import {actions as userActions, selectors as userSelectors} from '#root/redux/ducks/user';
import updateUserMutation from '#root/api/mutations/updateUser';
import userFragment from '#root/api/fragments/user';

const avatarUploadMutation = gql`
  mutation AvatarUpload($file: Upload!) {
    avatarUpload(file: $file) {
      id
    }
  }
`;

const AccountProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  const [uploadAvatar, {}] = useMutation(avatarUploadMutation);
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
      <input
        type="file"
        onChange={e => {
          console.log(e.target.files[0]);

          uploadAvatar({
            variables: {
              file: e.target.files[0]
            }
          }).then(res => {
            console.log(res);
          });
        }}
      />
      <ImageUpload
        note="Note: Photos must be JPG or PNG file format and no larger than 2MB"
        onUpload={async ({url, blob}) => {
          return new Promise(resolve => {
            const fd = new window.FormData();
            fd.set('file', blob);

            console.log(fd.get('file'));

            uploadAvatar({
              variables: {
                file: fd.get('file')
              }
            }).then(res => {
              console.log(res);

              resolve();
            });
          });
        }}
        title="Profile Photo"
      />
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
