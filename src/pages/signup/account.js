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
import Checkout from '../../layouts/checkout';
import {stateCheck} from '../../utils/componentHelpers';
import {getCheckoutUrl} from '../../utils/checkoutHelpers';
import CheckoutFooter from '../../components/checkoutFooter';
import AccountForm from '../../components/forms/accountForm';

class SignupAccount extends Component {
  static async getInitialProps(ctx) {
    const {res, store} = ctx;
    const state = store.getState();
    const checkoutPlan = state.getIn(['checkout', 'plan']);

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
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      country: 'US',
      postal_code: '',
      terms: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoToCheckout = this.handleGoToCheckout.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.register({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      country: this.state.country,
      postal_code: this.state.postal_code,
      redirectTo: getCheckoutUrl(this.props.checkout)
    });
  }

  handleChange(state) {
    return state ? this.setState(state) : null;
  }

  handleGoToCheckout() {
    window.location.href = getCheckoutUrl(this.props.checkout);
  }

  canSubmit() {
    const {user} = this.props;

    if (user && user.has('id')) {
      return true;
    }

    return Object.keys(this.state).reduce((valid, key) => {
      if (!this.state[key] || this.state[key] === '') {
        valid = false;
      }

      return valid;
    }, true);
  }

  render() {
    const {email, password, first_name, last_name, country, postal_code, terms} = this.state;
    const {loading, error, user} = this.props;

    const btnDisabled = !this.canSubmit();

    if (user && user.has('id')) {
      return (
        <Checkout activeStep={1} title={`Welcome back ${user.get('first_name')}!`}>
          <CheckoutFooter
            showLogin={false}
            btnText="Checkout Now"
            error={error}
            loading={loading}
            disabled={btnDisabled}
            onClick={this.handleGoToCheckout}
            btnType="button"
            loginRedirect="/signup/account"
          />
        </Checkout>
      );
    }

    return (
      <Checkout activeStep={1} title="Tell us about yourself">
        <form onSubmit={this.handleSubmit}>
          <AccountForm
            email={email}
            first_name={first_name}
            last_name={last_name}
            password={password}
            country={country}
            postal_code={postal_code}
            onChange={this.handleChange}
          />
          <div className="form-group">
            <div className={`checkbox ${terms ? 'checked' : ''}`} style={{marginTop: 30}}>
              <input type="checkbox" id="checkbox" checked={terms} onChange={stateCheck(this.handleChange, 'terms')}/>
              <label htmlFor="checkbox">I have read and agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy-policy" target="_blank">Customer Privacy Policy</a></label>
            </div>
          </div>
          <CheckoutFooter
            error={error}
            loading={loading}
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
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...checkoutActions,
    ...authActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupAccount);
