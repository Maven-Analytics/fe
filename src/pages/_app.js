import React from 'react';
import {Provider} from 'react-redux';
import App, {Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import {fromJS} from 'immutable';
import {TransitionGroup, Transition} from 'react-transition-group';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faTimes, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';

library.add(faUser, faTimes, faChevronRight);

import initStore from '../redux/store';
import {actions as authActions} from '../redux/ducks/auth';
import {getCookie} from '../utils/cookies';
import {enter, exit} from '../utils/animations';

import '../styles/index.scss';

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

    const {pathname} = this.props.router;

    return (
      <Container>
        <Provider store={store}>
          <TransitionGroup component={null}>
            <Transition
              key={pathname}
              onEnter={(node, appears) => enter(Component.animationTimeline, node, appears)}
              onExit={exit}
              timeout={{enter: 100, exit: 150}}
            >
              <Component {...pageProps} />
            </Transition>
          </TransitionGroup>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state)
})(withReduxSaga((MavenApp)));
