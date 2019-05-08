import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {selectors as userSelectors} from '../redux/ducks/user';
import {actions as authActions} from '../redux/ducks/auth';

class Layout extends Component {
  render() {
    const {children, user} = this.props;

    return (
      <div>
        <header>
          <div className="container">
            <Link href="/login"><a>Login</a></Link>
            <Link href="/register"><a>Register</a></Link>
            <Link href="/about"><a>About</a></Link>
            <Link href="/styleguide"><a>Style Guide</a></Link>

            {user && !user.isEmpty() ? (
              <div>
                <p>Logged In as {user.get('email')}</p>
                <button onClick={this.props.actions.logout}>Logout</button>
                <a href={`//${process.env.THINKIFIC_SUBDOMAIN}.thinkific.com`}>Go To Thinkific</a>
              </div>
            ) : null}
          </div>
        </header>
        <div className="page-wrapper">
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

