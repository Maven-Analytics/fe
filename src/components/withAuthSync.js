import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Router from 'next/router';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {selectors as userSelectors} from '../redux/ducks/user';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {getCookie} from '../utils/cookies';

const withAuthSync = WrappedComponent => {
  class WithAuthSync extends Component {
    static async getInitialProps(ctx) {
      const token = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {
        ...componentProps,
        token
      };
    }

    componentDidMount() {
      window.addEventListener('logout', this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener('logout', this.syncLogout);
      window.localStorage.removeItem('logout');
    }

    syncLogout(e) {
      // If logging out from another tab
      e.preventDefault();
      Router.push('/login');
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: userSelectors.getUser(state),
    loading: loadingSelectors.getLoading(['REAUTHENTICATE'])(state)
  });

  WithAuthSync.propTypes = {
    user: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool
  };

  WithAuthSync.defaultProps = {
    user: Map(),
    loading: true
  };

  return connect(mapStateToProps)(WithAuthSync);
};

export const auth = ctx => {
  const token = getCookie('token', ctx);

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, {Location: '/login'});
    ctx.res.end();
    return;
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/login');
  }

  return token;
};

export default withAuthSync;
