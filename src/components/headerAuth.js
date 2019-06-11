import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Map} from 'immutable';
import {connect} from 'react-redux';

import MaIcon from './maIcon';
import {selectors as userSelectors} from '../redux/ducks/user';

const HeaderAuth = ({showContact, showRegister, user}) => {
  const loggedIn = user && user.get('id');

  return (
    <ul>
      {showContact ? (
        <li>
          <Link href="/contact"><a>Contact</a></Link>
        </li>
      ) : null}
      {loggedIn ? (
        <li>
          <Link href="/">
            <a>
              {user.get('first_name')} {user.get('last_name')}
            </a>
          </Link>
        </li>
      ) : null}
      {loggedIn === false ? (
        <li>
          <Link href="/login">
            <MaIcon icon="user"/>
            Login
          </Link>
        </li>
      ) : null}
      {loggedIn === false && showRegister ? (
        <li>
          <Link href="/signup">
            <a className="btn btn--primary">
              Sign up
            </a>
          </Link>
        </li>
      ) : null}
    </ul>
  );
};

HeaderAuth.propTypes = {
  user: ImmutablePropTypes.map,
  showRegister: PropTypes.bool,
  showContact: PropTypes.bool
};

HeaderAuth.defaultProps = {
  user: Map(),
  showRegister: false,
  showContact: false
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

export default connect(mapStateToProps)(HeaderAuth);

