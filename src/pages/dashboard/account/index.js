import React from 'react';

import AccountLayout from '../../../layouts/account';
import ProfileForm from '../../../forms/profile';
import withAuthSync from '../../../components/withAuthSync';

const AccountProfile = () => {
  return (
    <AccountLayout title="Your Profile" activeLink={0}>
      <ProfileForm/>
    </AccountLayout>
  );
};

export default withAuthSync(AccountProfile);
