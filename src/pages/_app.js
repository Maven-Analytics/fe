import '../styles/index.scss';

import {fromJS} from 'immutable';
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import PropTypes from 'prop-types';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {Provider} from 'react-redux';
import {ParallaxProvider} from 'react-scroll-parallax';

import client from '#root/api/graphQlClient';
import meQuery from '#root/api/query/me';
import {withApollo} from '#root/api/withApollo';
import LoggedIn from '#root/components/loggedIn';
import Root from '#root/components/Root';
import FontLoaderScript from '#root/scripts/FontLoaderScript';
import GtagScript from '#root/scripts/GtagScript';
import IntercomScript from '#root/scripts/IntercomScript';
import SentryScript from '#root/scripts/SentryScript';
import UserSettingsGet from '#root/scripts/UserSettingsGet';

import {actions as checkoutActions} from '../redux/ducks/checkout';
import {actions as enrollmentActions} from '../redux/ducks/enrollments';
import {actions as recommendedActions} from '../redux/ducks/recommended';
import {actions as subscriptionActions} from '../redux/ducks/subscription';
import {actions as userActions} from '../redux/ducks/user';
import initStore from '../redux/store';
import {getCookie, removeCookie} from '../utils/cookies';

class MavenApp extends App {
  static async getInitialProps({Component, ctx: {apolloClient, ...ctx}}) {
    const {store, isServer} = ctx;

    const token = getCookie('token', ctx);
    const thinkificToken = getCookie('thinkificToken', ctx);
    const checkoutCookie = getCookie('checkout', ctx);
    const recommendedPaths = getCookie('recommendedPaths', ctx);
    const recommendedCourses = getCookie('recommendedCourses', ctx);

    if (!ctx.pathname.includes('logout')) {
      const {data: {me}} = await apolloClient.query({query: meQuery});

      store.dispatch(userActions.userSet(me));
    }

    if (token && token !== '') {
      store.dispatch(enrollmentActions.enrollmentsGet({token}));
      store.dispatch(subscriptionActions.subscriptionGet({token}));
      store.dispatch(userActions.tokenSet(token));
    }

    if (thinkificToken) {
      store.dispatch(userActions.thinkificTokenSet(thinkificToken));
    }

    if (checkoutCookie && checkoutCookie !== '') {
      store.dispatch(checkoutActions.checkoutSetPlan(fromJS(checkoutCookie.plan)));
    }

    if (recommendedPaths && Array.isArray(recommendedPaths) && recommendedCourses && Array.isArray(recommendedCourses)) {
      store.dispatch(recommendedActions.recommendedInit({
        paths: recommendedPaths,
        courses: recommendedCourses
      }));

      if (token) {
        store.dispatch(recommendedActions.recommendedSet({
          paths: recommendedPaths,
          courses: recommendedCourses,
          token
        }));
        removeCookie('recommendedPaths', ctx);
        removeCookie('recommendedCourses', ctx);
      }
    }

    return {
      isServer,
      pageProps: {
        ...(Component.getInitialProps ?
          await Component.getInitialProps({...ctx, apolloClient}) :
          {})
      }
    };
  }

  render() {
    const {Component, pageProps, store} = this.props;

    return (
      <ApolloProvider client={client({})}>
        <Provider store={store}>
          <ParallaxProvider>
            <Root>
              <Component {...pageProps} />
              <LoggedIn>
                <UserSettingsGet />
              </LoggedIn>
              <SentryScript/>
              <FontLoaderScript/>
              <GtagScript/>
              <IntercomScript />
            </Root>
          </ParallaxProvider>
        </Provider>
      </ApolloProvider>
    );
  }
}

MavenApp.propTypes = {
  store: PropTypes.object.isRequired
};

export default withRedux(initStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state)
})(withReduxSaga(withApollo(MavenApp)));
