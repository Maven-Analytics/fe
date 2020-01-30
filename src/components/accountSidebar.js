import {fromJS} from 'immutable';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, {memo} from 'react';

import {Routes} from '#root/routes';

const SidebarLinks = fromJS([
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
    url: 'https://mavenanalytics.thinkific.com/account/billing',
    external: true
  },
  {
    title: 'Invoice History',
    url: Routes.AccountInvoices
  }
]);

const DashboardHeader = ({activeLink}) => {
  return (
    <div className="account-sidebar">
      <ul>
        {SidebarLinks.map((link, index) => (
          <li key={link.get('url')}>
            {link.get('external') ? (
              <a href={link.get('url')} className={index === activeLink ? 'active' : ''}>{link.get('title')}</a>
            ) : (
              <Link href={link.get('url')} shallow={link.get('external')}>
                <a className={index === activeLink ? 'active' : ''}>{link.get('title')}</a>
              </Link>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

DashboardHeader.propTypes = {
  activeLink: PropTypes.number.isRequired
};

export default memo(DashboardHeader);
