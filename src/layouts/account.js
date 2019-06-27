import React from 'react';
import PropTypes from 'prop-types';

import DashboardLayout from './dashboard';
import DashboardCard from '../components/dashboardCard';
import AccountSidebar from '../components/accountSidebar';

const AccountLayout = ({children, title, cardTitle, activeLink}) => {
  return (
    <DashboardLayout title={title} activeLink={-1}>
      <DashboardCard size="lg">
        <div className="layout-account">
          <aside className="layout-account__sidebar">
            <AccountSidebar activeLink={activeLink}/>
          </aside>
          <div className="layout-account__content">
            <h4>{cardTitle}</h4>
            {children}
          </div>
        </div>
      </DashboardCard>
    </DashboardLayout>
  );
};

AccountLayout.getInitialProps = DashboardLayout.getInitialProps;

AccountLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  cardTitle: PropTypes.string,
  activeLink: PropTypes.number.isRequired
};

export default AccountLayout;
