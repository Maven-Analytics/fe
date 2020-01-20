import {Map} from 'immutable';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {click} from '#root/utils/componentHelpers';

import {actions as authActions} from '../redux/ducks/auth';
import {actions as stateActions, selectors as stateSelectors} from '../redux/ducks/state';
import {Routes} from '../routes';
import HeaderUser from './headerUser';
import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import MaIcon from './maIcon';

const HeaderAuth = ({showContact, showRegister, state, actions, loginRedirect}) => {
  return (
    <ul>
      {showContact ? (
        <LoggedOut>
          <li>
            <Link href={Routes.Contact}><a>Contact</a></Link>
          </li>
        </LoggedOut>
      ) : null}
      <LoggedIn>
        {user => (
          <Fragment>
            <li>
              <HeaderUser
                user={user}
                onClick={click(actions.offmenuToggle, 'headerUser')}
                open={state.get('headerUser')}
              />
            </li>
            <li className="dashboard-btn">
              <Link href={Routes.Dashboard}>
                <a className="btn btn--primary">
                  Dashboard
                </a>
              </Link>
            </li>
          </Fragment>
        )}
      </LoggedIn>
      <LoggedOut>
        <li>
          <Link href={{pathname: Routes.Login, query: {redirectTo: loginRedirect}}} >
            <a>
              <MaIcon icon="user" />
              Login
            </a>
          </Link>
        </li>
        {showRegister ? (
          <li>
            <Link href={Routes.Signup}>
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
  actions: PropTypes.objectOf(PropTypes.func),
  loginRedirect: PropTypes.string
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

