import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import GlobalHeader from '../components/globalHeader';
import MobileMenu from '../components/mobileMenu';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';
import {selectors as stateSelectors, actions as stateActions} from '../redux/ducks/state';

class Layout extends Component {
  render() {
    const {children, user, actions, state} = this.props;

    return (
      <Fragment>
        <GlobalHeader state={state} offmenuToggle={actions.offmenuToggle}/>
        <MobileMenu isActive={state.get('mobileMenu')} offmenuToggle={actions.offmenuToggle}/>
        <header>
          <div className="container">
            <Link href="/login"><a>Login</a></Link>
            <Link href="/register"><a>Register</a></Link>
            <Link href="/about"><a>About</a></Link>
            <Link href="/styleguide"><a>Style Guide</a></Link>
            <Link href="/scroll"><a>Scroll POC</a></Link>

            {user && !user.isEmpty() ? (
              <div>
                <p>Logged In as {user.get('email')}</p>
                <button onClick={this.props.actions.logout}>Logout</button>
                <a href={`//${process.env.THINKIFIC_SUBDOMAIN}.thinkific.com`}>Go To Thinkific</a>
              </div>
            ) : null}
          </div>
        </header>
        <main id="main" className="page-wrapper">
          {children}
        </main>
      </Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  state: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state),
  state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

