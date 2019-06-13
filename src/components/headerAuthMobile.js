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

const HeaderAuthMobile = ({actions}) => {
  return (
    <ul>
      <li>
        <Link href="/contact"><a>Contact</a></Link>
      </li>
      <LoggedOut>
        <li>
          <Link href="/login">
            <a>
              <MaIcon icon="user"/>
              Login
            </a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a className="btn btn--primary">
              Sign up
            </a>
          </Link>
        </li>
      </LoggedOut>
      <LoggedIn>
        <li>
          <Link href="/account"><a>Account</a></Link>
        </li>
        <li>
          <a href="#" onClick={clickPrevent(actions.logout)}>Logout</a>
        </li>
      </LoggedIn>
    </ul>
  );
};

HeaderAuthMobile.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func)
};

HeaderAuthMobile.defaultProps = {
  user: Map()
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuthMobile);

