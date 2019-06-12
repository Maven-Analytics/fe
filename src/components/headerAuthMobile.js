import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';
import {Map} from 'immutable';
import {connect} from 'react-redux';

import MaIcon from './maIcon';
import {selectors as userSelectors} from '../redux/ducks/user';

const HeaderAuthMobile = ({user}) => {
  const loggedIn = user && user.has('id');

  return (
    <ul>
      <li>
        <Link href="/contact"><a>Contact</a></Link>
      </li>
      {loggedIn === false ? (
        <li>
          <Link href="/login">
            <a>
              <MaIcon icon="user"/>
              Login
            </a>
          </Link>
        </li>
      ) : null}
      {loggedIn === false ? (
        <li>
          <Link href="/signup">
            <a className="btn btn--primary">
              Sign up
            </a>
          </Link>
        </li>
      ) : null}
      {loggedIn ? (
        <li>
          <Link href="/account"><a>Account</a></Link>
        </li>
      ) : null}
      {loggedIn ? (
        <li>
          <Link href="/logout"><a>Logout</a></Link>
        </li>
      ) : null }
      {loggedIn === false ? (
        <li>not logged in</li>
      ) : null}
    </ul>
  );
};

HeaderAuthMobile.propTypes = {
  user: ImmutablePropTypes.map
};

HeaderAuthMobile.defaultProps = {
  user: Map()
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

export default connect(mapStateToProps)(HeaderAuthMobile);

