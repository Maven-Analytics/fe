import React, {Fragment} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MaIcon from './maIcon';
import {click} from '../utils/componentHelpers';
import HeaderUser from './headerUser';
import {selectors as stateSelectors, actions as stateActions} from '../redux/ducks/state';
import {actions as authActions} from '../redux/ducks/auth';
import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';

const HeaderAuth = ({showContact, showRegister, state, actions}) => {
  return (
    <ul>
      {showContact ? (
        <li>
          <Link href="/contact"><a>Contact</a></Link>
        </li>
      ) : null}
      <LoggedIn>
        {user => (
          <Fragment>
            <li>
              <HeaderUser
                user={user}
                logout={actions.logout}
                onClick={click(actions.offmenuToggle, 'headerUser')}
                open={state.get('headerUser')}
              />
            </li>
          </Fragment>
        )}
      </LoggedIn>
      <LoggedOut>
        <li>
          <Link href="/login">
            <a>
              <MaIcon icon="user"/>
              Login
            </a>
          </Link>
        </li>
        {showRegister ? (
          <li>
            <Link href="/signup">
              <a className="btn btn--primary">
                Sign up
              </a>
            </Link>
          </li>
        ) : null}
      </LoggedOut>
    </ul>
  );
};

HeaderAuth.propTypes = {
  showRegister: PropTypes.bool,
  showContact: PropTypes.bool,
  state: ImmutablePropTypes.map,
  actions: PropTypes.objectOf(PropTypes.func)
};

HeaderAuth.defaultProps = {
  showRegister: false,
  showContact: false,
  state: Map()
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions,
    ...authActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuth);

