import '../styles/index.scss';

import {ApolloProvider} from '@apollo/react-hooks';
import {fromJS} from 'immutable';
import {ComponentProvider, ThemeProvider} from 'maven-ui';
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import {connect, Provider} from 'react-redux';
import {ParallaxProvider} from 'react-scroll-parallax';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {bindActionCreators} from 'redux';

import client from '#root/api/graphQlClient';
import meQuery from '#root/api/query/me';
import {withApollo} from '#root/api/withApollo';
import {isLg} from '#root/components/mediaQuery';
import Root from '#root/components/Root';
import FontLoaderScript from '#root/scripts/FontLoaderScript';
import GtagScript from '#root/scripts/GtagScript';
import IntercomScript from '#root/scripts/IntercomScript';
import SentryScript from '#root/scripts/SentryScript';
import theme from '#root/theme';
import SessionStack from '#root/scripts/SessionStack';
import accessConfig from '#root/utils/accessConfig';

import {actions as checkoutActions} from '../redux/ducks/checkout';
import {actions as enrollmentActions} from '../redux/ducks/enrollments';
import {actions as recommendedActions} from '../redux/ducks/recommended';
import {actions as stateActions} from '../redux/ducks/state';
import {actions as subscriptionActions} from '../redux/ducks/subscription';
import {actions as userActions} from '../redux/ducks/user';
import initStore from '../redux/store';
import {getCookie, removeCookie} from '../utils/cookies';

const STRIPE_PUBLIC_KEY = accessConfig('STRIPE_PUBLIC_KEY');

class MavenApp extends App {
  static async getInitialProps({Component, ctx: {apolloClient, ...ctx}}) {
    const {store, isServer} = ctx;

    const token = getCookie('token', ctx);
    const thinkificToken = getCookie('thinkificToken', ctx);
    const checkoutCookie = getCookie('checkout', ctx);
    const recommendedPaths = getCookie('recommendedPaths', ctx);
    const recommendedCourses = getCookie('recommendedCourses', ctx);

    if (!ctx.pathname.includes('logout')) {
      try {
        const {
          data: {me}
        } = await apolloClient.query({query: meQuery, fetchPolicy: 'no-cache'});

        store.dispatch(userActions.userSet(me));
      } catch (error) {
        console.log('Not logged in');
      }
    }

    if (token && token !== '') {
      store.dispatch(enrollmentActions.enrollmentsGet({token}));
      // Store.dispatch(subscriptionActions.subscriptionGet({token}));
      store.dispatch(userActions.tokenSet(token));
    }

    if (thinkificToken) {
      store.dispatch(userActions.thinkificTokenSet(thinkificToken));
    }

    if (checkoutCookie && checkoutCookie !== '') {
      store.dispatch(checkoutActions.checkoutSetPlan(fromJS(checkoutCookie.plan)));
    }

    if (recommendedPaths && Array.isArray(recommendedPaths) && recommendedCourses && Array.isArray(recommendedCourses)) {
      store.dispatch(
        recommendedActions.recommendedInit({
          paths: recommendedPaths,
          courses: recommendedCourses
        })
      );

      if (token) {
        store.dispatch(
          recommendedActions.recommendedSet({
            paths: recommendedPaths,
            courses: recommendedCourses,
            token
          })
        );
        removeCookie('recommendedPaths', ctx);
        removeCookie('recommendedCourses', ctx);
      }
    }

    return {
      isServer,
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, apolloClient}) : {})
      }
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      stripe: null
    };

    this.handleDomContentLoad = this.handleDomContentLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleDomContentLoad);

    if (window.Stripe) {
      this.setState({stripe: window.Stripe(STRIPE_PUBLIC_KEY)});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe(STRIPE_PUBLIC_KEY)});
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleDomContentLoad);
  }

  handleDomContentLoad() {
    window.removeEventListener('load', this.handleDomContentLoad);

    const delay = isLg() ? 0 : 10000;

    // Render intercom 10 seconds after page load
    setTimeout(() => {
      this.props.actions.renderIntercom(true);
    }, delay);
  }

  render() {
    const {Component, pageProps, store} = this.props;

    return (
      <ApolloProvider client={client({})}>
        <Provider store={store}>
          <ComponentProvider linkComponent={Link} linkKey="href" linkWrap={true}>
            <ThemeProvider theme={theme}>
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <ParallaxProvider>
                    <Root>
                      <Component {...pageProps} />
                      <SentryScript />
                      <FontLoaderScript />
                      <GtagScript />
                      <IntercomScript />
                      {/* <SessionStack /> */}
                    </Root>
                  </ParallaxProvider>
                </Elements>
              </StripeProvider>
            </ThemeProvider>
          </ComponentProvider>
        </Provider>
      </ApolloProvider>
    );
  }
}

MavenApp.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  store: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...stateActions
    },
    dispatch
  )
});

export default withRedux(initStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state)
})(withReduxSaga(withApollo(connect(mapStateToProps, mapDispatchToProps)(MavenApp))));
