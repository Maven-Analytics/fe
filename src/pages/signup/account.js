import {Map} from 'immutable';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AccountForm from '#root/components/forms//accountForm';
import Checkout from '#root/components/layout/checkout';
import {actions as authActions} from '#root/redux/ducks/auth';
import {actions as checkoutActions, selectors as checkoutSelectors} from '#root/redux/ducks/checkout';
import {selectors as errorSelectors} from '#root/redux/ducks/error';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {actions as profileActions} from '#root/redux/ducks/profile';
import {actions as stateActions} from '#root/redux/ducks/state';
import {selectors as userSelectors} from '#root/redux/ducks/user';

import CheckoutFooter from '../../components/checkoutFooter';
import Checkbox from '../../components/inputs/checkbox';
import {Routes} from '../../routes';
import {getCheckoutUrlAsync} from '../../services/apiv2';
import {canUseDOM, clickAction, stateCheck} from '../../utils/componentHelpers';
import {getCookie} from '../../utils/cookies';

class SignupAccount extends Component {
  static async getInitialProps(ctx) {
    const {res, store} = ctx;
    const state = store.getState();
    const checkout = state.get('checkout');
    const checkoutPlan = checkout.get('plan');
    const token = getCookie('token', ctx);

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

    if (token) {
      const checkoutUrl = await getCheckoutUrlAsync(ctx);
      if (res) {
        res.writeHead(302, {
          Location: checkoutUrl
        });
        res.end();
      } else {
        Router.push(checkoutUrl);
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
  }

  async handleSubmit(e) {
    e.preventDefault();

    const isUser = this.props.user.has('id');
    const action = isUser ? this.props.actions.profileUpdate : this.props.actions.register;

    const redirectTo = await getCheckoutUrlAsync();

    const data = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      country: this.state.country,
      postal_code: this.state.postal_code,
      redirectTo
    };

    if (!isUser) {
      data.password = this.state.password;
    }

    action(data);
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
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
    const {loading, error, user, profileError, profileLoading, actions} = this.props;

    const btnDisabled = !this.canSubmit();

    const loginRedirect = canUseDOM() ? window.location.origin + Routes.SignupAccount : Routes.SignupAccount;

    return (
      <Checkout activeStep={1} title="Tell us about yourself" loginRedirect={loginRedirect}>
        <ThinkificDownRedirect>
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
              I have read and agree to the&nbsp;
                <a href="#" onClick={clickAction(actions.modalOpen, 'pageModal', 'terms')}>Terms of Service</a> and&nbsp;
                <a href="#" onClick={clickAction(actions.modalOpen, 'pageModal', 'privacy-policy')}>Customer Privacy Policy</a>
              </Checkbox>
            </div>
            <CheckoutFooter
              showLogin={user.isEmpty()}
              error={error || profileError}
              loading={loading || profileLoading}
              disabled={btnDisabled}
              btnType="submit"
              loginRedirect={loginRedirect}
            />
          </form>
        </ThinkificDownRedirect>
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
    ...profileActions,
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupAccount);
