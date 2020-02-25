import React from 'react';

import ProfileForm from '#root/components/forms/profile';
import AccountLayout from '#root/components/layout/account';

import withAuthSync from '../../../components/withAuthSync';

const AccountProfile = () => {
  return (
    <AccountLayout title="Your Profile" activeLink={0}>
      <ProfileForm />
    </AccountLayout>
  );
};

export default withAuthSync(AccountProfile);
