import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Router from 'next/router';

import {selectors as checkoutSelectors, actions as checkoutActions} from '../../redux/ducks/checkout';
import Checkout from '../../layouts/checkout';
import {getCookie} from '../../utils/cookies';

class SignupAccount extends Component {
  static async getInitialProps(ctx) {
    const {res} = ctx;
    const checkoutToken = getCookie('checkout', ctx);

    if (!checkoutToken) {
      if (res) {
        res.writeHead(302, {
          Location: '/signup'
        });
        res.end();
      } else {
        Router.push('/signup');
      }
    }

    return {};
  }

  componentDidMount() {
    getCookie('checkout');
  }

  render() {
    const {checkout} = this.props;

    return (
      <Checkout activeStep={1} title="Tell us about yourself" nextStep={checkout.getIn(['plan', 'checkoutUrl'])} nextDisabled={false}>
        this is the signup route
      </Checkout>
    );
  }
}

SignupAccount.propTypes = {
  checkout: ImmutablePropTypes.map
};

SignupAccount.defaultProps = {
  checkout: Map()
};

const mapStateToProps = state => ({
  checkout: checkoutSelectors.getCheckout(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...checkoutActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupAccount);
