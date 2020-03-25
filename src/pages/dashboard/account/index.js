import React, {useState} from 'react';
import {Avatar, ImageUpload, ProfileForm} from 'maven-ui';
import {useMutation} from '@apollo/react-hooks';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import AccountLayout from '#root/components/layout/account';
import withAuthSync from '#root/components/withAuthSync';
import {actions as userActions, selectors as userSelectors} from '#root/redux/ducks/user';
import updateUserMutation from '#root/api/mutations/updateUser';
import GatewayService from '#root/services/GatewayService';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const AvatarPreview = styled(Avatar)`
  height: 110px;
  margin: 0 0 ${spacingUnit.default};
  width: 110px;

  ${mediaBreakpointUp('sm')} {
    margin: 0 ${spacingUnit.mdl} 0 0;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 ${spacingUnit.default};

  ${mediaBreakpointUp('sm')} {
    flex-flow: row nowrap;
  }
`;

const AvatarUpload = styled.div`
  flex: 0 0 100%;

  ${mediaBreakpointUp('sm')} {
    flex: auto;
  }
`;

const AccountProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  const [avatarLoading, setAvatarLoading] = useState(false);
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

  const uploadAvatar = async blob => {
    setAvatarLoading(true);
    const data = await GatewayService.uploadAvatar(blob);
    setAvatarLoading(false);
    dispatch(userActions.userSet(data));
  };

  return (
    <AccountLayout title="Your Profile" activeLink={0}>
      <AvatarSection>
        <AvatarPreview image={user.get('avatar_url')} />
        <AvatarUpload>
          <ImageUpload
            note="Note: Photos must be JPG or PNG file format and no larger than 2MB"
            loading={avatarLoading}
            onUpload={async ({blob}) => {
              await uploadAvatar(blob);
            }}
            title="Profile Photo"
          />
        </AvatarUpload>
      </AvatarSection>

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
