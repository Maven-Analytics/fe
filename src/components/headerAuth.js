import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MaIcon from './maIcon';
import {selectors as userSelectors} from '../redux/ducks/user';
import {click} from '../utils/componentHelpers';
import HeaderUser from './headerUser';
import {selectors as stateSelectors, actions as stateActions} from '../redux/ducks/state';

const HeaderAuth = ({showContact, showRegister, user, state, actions}) => {
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
            onClick={click(actions.offmenuToggle, 'headerUser')}
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
  state: ImmutablePropTypes.map,
  actions: PropTypes.objectOf(PropTypes.func)
};

HeaderAuth.defaultProps = {
  user: Map(),
  showRegister: false,
  showContact: false,
  state: Map()
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state),
  state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuth);

