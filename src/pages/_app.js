import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import App, {Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import {fromJS} from 'immutable';
import {TransitionGroup, Transition} from 'react-transition-group';
import * as FontFaceObserver from 'fontfaceobserver';
import Router from 'next/router';

import initStore from '../redux/store';
import {actions as authActions} from '../redux/ducks/auth';
import {actions as checkoutActions} from '../redux/ducks/checkout';
import {actions as userActions} from '../redux/ducks/user';
import {actions as stateActions} from '../redux/ducks/state';
import {getCookie, removeCookie} from '../utils/cookies';
import {enter, exit} from '../utils/animations';

import '../styles/index.scss';

class MavenApp extends App {
  static async getInitialProps({Component, ctx}) {
    const {store, isServer} = ctx;

    const token = getCookie('token', ctx);
    const checkoutCookie = getCookie('checkout', ctx);
    const recommendedPaths = getCookie('recommendedPaths', ctx);
    const recommendedCourses = getCookie('recommendedCourses', ctx);

    const state = store.getState();
    const user = state.getIn(['user', 'user']);

    if (token && token !== '' && (!user || user.isEmpty())) {
      store.dispatch(authActions.reauthenticate({token, ctx, isServer}));
    }

    if (checkoutCookie && checkoutCookie !== '') {
      store.dispatch(checkoutActions.setPlan(fromJS(checkoutCookie.plan)));
    }

    // If there is a recommendedPaths & recommendedCourses cookie, but it has not been saved to the user. save it
    if (recommendedPaths && recommendedCourses && user && user.get('id') && (!user.get('recommended_paths') || user.get('recommended_paths').isEmpty() || !user.get('recommended_courses') || user.get('recommended_courses').isEmpty())) {
      store.dispatch(userActions.userRecommendedSet({
        paths: recommendedPaths,
        courses: recommendedCourses
      }));

      removeCookie('recommendedPaths', ctx);
      removeCookie('recommendedCourses', ctx);
    }

    return {
      isServer,
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      }
    };
  }

  constructor(props) {
    super(props);

    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  componentDidMount() {
    // const fonts = [
    //   new FontFaceObserver('Lato'),
    //   new FontFaceObserver('D-DIN')
    // ];
    const icons = [
      new FontFaceObserver('maicon')
    ];

    // const fontPromises = fonts.map(font => font.load());

    const iconPromises = icons.map(icon => icon.load());

    // Promise.all(fontPromises)
    //   .then(() => {
    //     document.body.classList.add('fonts-loaded');
    //   });

    Promise.all(iconPromises)
      .then(() => {
        document.body.classList.add('icons-loaded');
      });

    Router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  handleRouteChange() {
    this.props.store.dispatch(stateActions.stateReset());
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

MavenApp.propTypes = {
  store: PropTypes.object.isRequired
};

export default withRedux(initStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state)
})(withReduxSaga((MavenApp)));
