import {Map} from 'immutable';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import {Routes} from '../routes';
import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import MaIcon from './maIcon';

const HeaderAuthMobile = ({loginRedirect}) => {
  return (
    <ul>
      <li>
        <Link href={Routes.Contact}>
          <a>Contact</a>
        </Link>
      </li>
      <LoggedOut>
        <li>
          <Link href={{pathname: Routes.Login, query: {redirectTo: loginRedirect}}}>
            <a>
              <MaIcon icon="user" />
              Login
            </a>
          </Link>
        </li>
        <li>
          <Link href={Routes.Signup}>
            <a className="btn btn--primary">Sign up</a>
          </Link>
        </li>
      </LoggedOut>
      <LoggedIn>
        <li>
          <Link href={Routes.Dashboard}>
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href={Routes.Account}>
            <a>My Account</a>
          </Link>
        </li>
        <li>
          <Link href={Routes.Logout}>
            <a>Logout</a>
          </Link>
        </li>
      </LoggedIn>
    </ul>
  );
};

HeaderAuthMobile.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  loginRedirect: PropTypes.string
};

HeaderAuthMobile.defaultProps = {
  user: Map()
};

export default HeaderAuthMobile;
