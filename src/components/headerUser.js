import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Link from 'next/link';

import MaIcon from './maIcon';
import {clickPrevent} from '../utils/componentHelpers';
import {Routes} from '../routes';

const HeaderUser = ({user, onClick, open, logout}) => {
  const classList = ['header-user'];

  if (open) {
    classList.push('open');
  }

  return (
    <div className={classList.join(' ')}>
      <button onClick={onClick} className="header-user__toggle" aria-expanded={open} aria-controls="header-user-dropdown">
        {user.get('first_name')} {user.get('last_name').charAt(0)}
        <div className="user-icon">
          <MaIcon icon="user"/>
        </div>
        <div className="chevron-icon">
          <MaIcon icon="chevron-down"/>
        </div>
      </button>
      <ul id="header-user-dropdown" className="header-user__dropdown">
        <li><Link href={Routes.Dashboard}><a>Dashboard</a></Link></li>
        <li><Link href={Routes.DashboardAccount}><a>My Account</a></Link></li>
        <li><a href="#" onClick={clickPrevent(logout)}>Sign Out</a></li>
      </ul>
    </div>
  );
};

HeaderUser.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  open: PropTypes.bool,
  onClick: PropTypes.func,
  logout: PropTypes.func.isRequired
};

export default HeaderUser;
