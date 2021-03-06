import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {Routes} from '../routes';
import ClickOutside from './clickOutside';
import MaIcon from './maIcon';

const HeaderUser = ({user, onClick, open}) => {
  const classList = ['header-user'];

  if (open) {
    classList.push('open');
  }

  return (
    <ClickOutside onClickOutside={onClick} disabled={!open} className={classList.join(' ')}>
      <button onClick={onClick} className="header-user__toggle" aria-expanded={open} aria-controls="header-user-dropdown">
        {user.get('first_name')} {user.get('last_name').charAt(0)}
        {/* <div className="user-icon">
          <MaIcon icon="user"/>
        </div> */}
        <div className="chevron-icon">
          <MaIcon icon="chevron-down"/>
        </div>
      </button>
      <ul id="header-user-dropdown" className="header-user__dropdown">
        <li><Link href={Routes.Dashboard}><a>Dashboard</a></Link></li>
        <li><Link href={Routes.Account}><a>My Account</a></Link></li>
        <li><Link href={Routes.Logout}><a>Sign Out</a></Link></li>
      </ul>
    </ClickOutside>
  );
};

HeaderUser.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  open: PropTypes.bool,
  onClick: PropTypes.func
};

export default HeaderUser;
