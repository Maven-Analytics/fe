import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Map} from 'immutable';
import {connect} from 'react-redux';

import MaIcon from './maIcon';
import {selectors as userSelectors} from '../redux/ducks/user';
import {selectors as stateSelectors} from '../redux/ducks/state';
import {noop} from '../utils/componentHelpers';
import HeaderUser from './headerUser';

const HeaderAuth = ({showContact, showRegister, user, onUserClick, state}) => {
  const loggedIn = user && user.has('id');

  return (
    <ul>
      {showContact ? (
        <li>
          <Link href="/contact"><a>Contact</a></Link>
        </li>
      ) : null}
      {loggedIn ? (
        <li>
          <HeaderUser
            user={user}
            onClick={onUserClick}
            open={state.get('headerUser')}
          />
        </li>
      ) : null}
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
  showContact: PropTypes.bool,
  onUserClick: PropTypes.func,
  state: ImmutablePropTypes.map
};

HeaderAuth.defaultProps = {
  user: Map(),
  showRegister: false,
  showContact: false,
  onUserClick: noop
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state),
  state: stateSelectors.getState(state)
});

export default connect(mapStateToProps)(HeaderAuth);

