import {Component} from 'react';
import Router from 'next/router';

import {actions as authActions} from '../redux/ducks/auth';

class Logout extends Component {
  static async getInitialProps(ctx) {
    const {res, store} = ctx;

    store.dispatch(authActions.logout({ctx}));

    if (res) {
      res.writeHead(302, {
        Location: '/'
      });
      res.end();
    } else {
      Router.push('/');
    }
  }

  render() {
    return null;
  }
}

export default Logout;
