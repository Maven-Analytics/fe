import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MaIcon from './maIcon';
import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {clickPrevent} from '../utils/componentHelpers';

const HeaderAuthMobile = ({user, actions}) => {
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
          <a href="#" onClick={clickPrevent(actions.logout)}>Logout</a>
        </li>
      ) : null }
      {loggedIn === false ? (
        <li>not logged in</li>
      ) : null}
    </ul>
  );
};

HeaderAuthMobile.propTypes = {
  user: ImmutablePropTypes.map,
  actions: PropTypes.objectOf(PropTypes.func)
};

HeaderAuthMobile.defaultProps = {
  user: Map()
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuthMobile);

