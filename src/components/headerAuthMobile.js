import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MaIcon from './maIcon';
import {actions as authActions} from '../redux/ducks/auth';
import {clickPrevent} from '../utils/componentHelpers';
import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import {Routes} from '../routes';

const HeaderAuthMobile = ({actions, loginRedirect}) => {
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
          <a href="#" onClick={clickPrevent(actions.logout)}>
            Logout
          </a>
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

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...authActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuthMobile);
