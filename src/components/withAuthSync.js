import {Map} from 'immutable';
import Router from 'next/router';
import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import {getCookie} from '#root/utils/cookies';

import {selectors as userSelectors} from '../redux/ducks/user';
import {reauthenticateSync} from '../services/apiv2';

const withAuthSync = WrappedComponent => {
  class WithAuthSync extends Component {
    static async getInitialProps(ctx) {
      const token = await auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {
        ...componentProps,
        token
      };
    }

    componentDidMount() {
      // Window.addEventListener('logout', this.syncLogout);
      this.syncLogout();
    }

    componentDidUpdate() {
      this.syncLogout();
    }

    componentWillUnmount() {
      // Window.removeEventListener('logout', this.syncLogout);
      // window.localStorage.removeItem('logout');
    }

    syncLogout() {
      if (this.props.user.get('id')) {
        return;
      }

      // If logging out from another tab
      // e.preventDefault();
      Router.push('/login');
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: userSelectors.getUser(state)
  });

  WithAuthSync.propTypes = {
    user: ImmutablePropTypes.map.isRequired
  };

  WithAuthSync.defaultProps = {
    user: Map()
  };

  return connect(mapStateToProps)(WithAuthSync);
};

export const auth = async ctx => {
  const token = getCookie('token', ctx);

  try {
    await reauthenticateSync(token);
  } catch (error) {
    if (ctx.req) {
      ctx.res.writeHead(302, {Location: '/login'});
      ctx.res.end();
      return;
    }
  }
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */

  if (ctx.req && ctx.res && (!token)) {
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
