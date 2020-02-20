import React from 'react';
import PropTypes from 'prop-types';

import DashboardLayout from './dashboard';
import DashboardCard from '#root/components/dashboardCard';
import AccountSidebar from '#root/components/accountSidebar';

const AccountLayout = ({children, title, activeLink}) => {
  return (
    <DashboardLayout title="My Account" activeLink={-1}>
      <DashboardCard size="lg">
        <div className="layout-account">
          <aside className="layout-account__sidebar">
            <AccountSidebar activeLink={activeLink}/>
          </aside>
          <div className="layout-account__content">
            <h4>{title}</h4>
            {children}
          </div>
        </div>
      </DashboardCard>
    </DashboardLayout>
  );
};

AccountLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  activeLink: PropTypes.number.isRequired
};

export default AccountLayout;