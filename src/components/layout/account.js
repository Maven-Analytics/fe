import React from 'react';
import PropTypes from 'prop-types';
import {AccountPage, AccountPageBody, AccountPageSidebar} from 'maven-ui';

import DashboardLayout from './dashboard';
import {Routes} from '#root/routes';

const sidebarLinks = [
  {
    title: 'Profile',
    url: Routes.Account
  },
  {
    title: 'Password',
    url: Routes.AccountPassword
  },
  {
    title: 'Billing',
    url: Routes.AccountBilling
  },
  {
    title: 'Invoice History',
    url: Routes.AccountInvoices
  }
];

const AccountLayout = ({children, title, activeLink}) => {
  return (
    <DashboardLayout title="My Account" activeLink={-1}>
      <AccountPage>
        <AccountPageSidebar activeLink={activeLink} links={sidebarLinks} />
        <AccountPageBody title={title}>{children}</AccountPageBody>
      </AccountPage>
    </DashboardLayout>
  );
};

AccountLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  activeLink: PropTypes.number.isRequired
};

export default AccountLayout;
