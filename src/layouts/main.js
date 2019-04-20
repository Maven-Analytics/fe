import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';

import '../styles/index.scss';

class Layout extends Component {
  render() {
    const {children, user} = this.props;

    return (
      <div>
        <header>
          <div className="container">
            <Link href="/"><a>Login</a></Link>
            <Link href="/register"><a>Register</a></Link>
            <Link href="/about"><a>About</a></Link>

            {user && !user.isEmpty() ? (
              <div>
                <p>Logged In as {user.get('email')}</p>
                <button onClick={this.props.actions.logout}>Logout</button>
              </div>
            ) : null}
          </div>
        </header>
        <div className="container">
          {children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  user: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

