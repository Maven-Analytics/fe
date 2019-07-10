import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Router from 'next/router';

import {selectors as checkoutSelectors, actions as checkoutActions} from '../../redux/ducks/checkout';
import {actions as authActions} from '../../redux/ducks/auth';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as userSelectors} from '../../redux/ducks/user';
import {actions as profileActions} from '../../redux/ducks/profile';
import Checkout from '../../layouts/checkout';
import {stateCheck} from '../../utils/componentHelpers';
import {getCheckoutUrl} from '../../utils/checkoutHelpers';
import CheckoutFooter from '../../components/checkoutFooter';
import AccountForm from '../../forms/accountForm';
import {Routes} from '../../routes';
import Checkbox from '../../components/inputs/checkbox';

class SignupAccount extends Component {
  static async getInitialProps(ctx) {
    const {res, store} = ctx;
    const state = store.getState();
    const checkout = state.get('checkout');
    const checkoutPlan = checkout.get('plan');

    if (!checkoutPlan || checkoutPlan.isEmpty()) {
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

  constructor(props) {
    super(props);

    this.state = {
      email: props.user.get('email') || '',
      password: '',
      first_name: props.user.get('first_name') || '',
      last_name: props.user.get('last_name') || '',
      country: props.user.get('country') || '',
      postal_code: props.user.get('postal_code') || '',
      terms: false
    };

    if (!props.user.isEmpty()) {
      delete this.state.password;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoToCheckout = this.handleGoToCheckout.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const isUser = this.props.user.has('id');
    const action = isUser ? this.props.actions.profileUpdate : this.props.actions.register;

    const data = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      country: this.state.country,
      postal_code: this.state.postal_code,
      redirectTo: getCheckoutUrl(this.props.checkout)
    };

    if (!isUser) {
      data.password = this.state.password;
    }

    action(data);
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleGoToCheckout() {
    window.location.href = getCheckoutUrl(this.props.checkout);
  }

  canSubmit() {
    return Object.keys(this.state).reduce((valid, key) => {
      if (!this.state[key] || this.state[key] === '') {
        valid = false;
      }

      return valid;
    }, true);
  }

  render() {
    const {email, password, first_name, last_name, country, postal_code, terms} = this.state;
    const {loading, error, user, profileError, profileLoading} = this.props;

    const btnDisabled = !this.canSubmit();

    return (
      <Checkout activeStep={1} title="Tell us about yourself">
        <form onSubmit={this.handleSubmit}>
          <AccountForm
            showPassword={user.isEmpty()}
            email={email}
            first_name={first_name}
            last_name={last_name}
            password={password}
            country={country}
            postal_code={postal_code}
            onChange={this.handleChange}
          />
          <div className="form-group">
            <Checkbox
              id="terms"
              name="terms"
              style={{marginTop: 30}}
              checked={terms}
              onChange={stateCheck(this.handleChange, 'terms')}
            >
              I have read and agree to the <a href={Routes.Terms} target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href={Routes.PrivacyPolicy} target="_blank">Customer Privacy Policy</a>
            </Checkbox>
          </div>
          <CheckoutFooter
            showLogin={user.isEmpty()}
            error={error || profileError}
            loading={loading || profileLoading}
            disabled={btnDisabled}
            btnType="submit"
            loginRedirect="/signup/account"
          />
        </form>
      </Checkout>
    );
  }
}

SignupAccount.propTypes = {
  checkout: ImmutablePropTypes.map,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  profileLoading: PropTypes.bool.isRequired,
  profileError: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: ImmutablePropTypes.map
};

SignupAccount.defaultProps = {
  checkout: Map(),
  user: Map()
};

const mapStateToProps = state => ({
  checkout: checkoutSelectors.getCheckout(state),
  loading: loadingSelectors.getLoading(['REGISTER'])(state),
  error: errorSelectors.getError(['REGISTER'])(state),
  profileLoading: loadingSelectors.getLoading(['PROFILEUPDATE'])(state),
  profileError: errorSelectors.getError(['PROFILEUPDATE'])(state),
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...checkoutActions,
    ...authActions,
    ...profileActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupAccount);
