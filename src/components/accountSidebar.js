import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import Link from 'next/link';

const SidebarLinks = fromJS([
  {
    title: 'Profile',
    url: '/dashboard/account'
  },
  {
    title: 'Password',
    url: '/dashboard/account/password'
  },
  {
    title: 'Billing',
    url: '//mavenanalytics.thinkific.com/account/billing',
    external: true
  },
  {
    title: 'Order History',
    url: '//mavenanalytics.thinkific.com/account/orders',
    external: true
  }
]);

const DashboardHeader = ({activeLink}) => {
  return (
    <div className="account-sidebar">
      <ul>
        {SidebarLinks.map((link, index) => (
          <li key={link.get('url')}>
            <Link href={link.get('url')} shallow={link.get('external')}>
              <a className={index === activeLink ? 'active' : ''}>{link.get('title')}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

DashboardHeader.propTypes = {
  activeLink: PropTypes.number.isRequired
};

export default DashboardHeader;
