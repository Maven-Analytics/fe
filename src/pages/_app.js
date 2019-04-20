import React from 'react';
import {Provider} from 'react-redux';
import App, {Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import {fromJS} from 'immutable';
import initStore from '../redux/store';
import {actions as authActions} from '../redux/ducks/auth';
import {getCookie} from '../utils/cookies';

class MavenApp extends App {
  static async getInitialProps({Component, ctx}) {
    const {store, isServer} = ctx;

    const token = getCookie('token', ctx);
    const user = store.getState().getIn(['user', 'user']);

    if (token && token !== '' && (!user || user.isEmpty())) {
      store.dispatch(authActions.reauthenticate({token, ctx}));
    }

    return {
      isServer,
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      }
    };
  }

  render() {
    const {Component, pageProps, store} = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state)
})(withReduxSaga((MavenApp)));
