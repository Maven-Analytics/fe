import {useMutation} from '@apollo/react-hooks';
import {Map} from 'immutable';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, {Component, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect, useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';

import registerMutation from '#root/api/mutations/register';
import updateUserMutation from '#root/api/mutations/updateUser';
import AccountForm from '#root/components/forms//accountForm';
import ThinkificDownRedirect from '#root/components/health/ThinkificDownRedirect';
import Select from '#root/components/inputs/Select';
import TextBox from '#root/components/inputs/TextBox';
import Checkout from '#root/components/layout/checkout';
import LoggedOut from '#root/components/loggedOut';
import GraphQlError from '#root/components/shared/GraphQlError';
import {actions as authActions} from '#root/redux/ducks/auth';
import {actions as checkoutActions, selectors as checkoutSelectors} from '#root/redux/ducks/checkout';
import {selectors as errorSelectors} from '#root/redux/ducks/error';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {actions as profileActions} from '#root/redux/ducks/profile';
import {actions as stateActions} from '#root/redux/ducks/state';
import {actions as userActions, selectors as userSelectors} from '#root/redux/ducks/user';
import countries from '#root/utils/countries';

import CheckoutFooter from '../../components/checkoutFooter';
import Checkbox from '../../components/inputs/checkbox';
import {Routes} from '../../routes';
import {getCheckoutUrlAsync} from '../../services/apiv2';
import {canUseDOM, clickAction, stateCheck} from '../../utils/componentHelpers';
import {getCookie} from '../../utils/cookies';

/*
Class SignupAccount extends Component {
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
*/

const SignupAccount = () => {
  const user = useSelector(userSelectors.getUser);
  const loginRedirect = canUseDOM() ? window.location.origin + Routes.SignupAccount : Routes.SignupAccount;

  const [updateUser, {error: updateUserError, client: clientUpdate}] = useMutation(updateUserMutation);
  const [registerUser, {error: registerError, client: clientRegister}] = useMutation(registerMutation);
  const [response, setResponse] = useState(null);
  const {formState: {isSubmitting, isSubmitted}, handleSubmit, register, clearError, errors: formErrors, watch} = useForm({
    defaultValues: {
      country: user.get('country'),
      email: user.get('email'),
      first_name: user.get('first_name'),
      last_name: user.get('last_name'),
      postal_code: user.get('postal_code')
    }
  });

  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async ({email, password, first_name, last_name, postal_code, country}) => {
    clearError();
    setResponse(null);

    const isLoggedIn = user.has('id');
    const redirectTo = await getCheckoutUrlAsync();

    // If logged in, perform a profile update action
    if (isLoggedIn) {
      const {data: {updateUser: user}} = await updateUser({
        variables: {email, first_name, last_name, postal_code, country}
      });

      await clientUpdate.resetStore();
      await clientUpdate.cache.reset();

      dispatch(userActions.userSet(user));
      window.location.href = redirectTo;

      return;
    }

    // Else, register the user
    const {data: {register: loginData}} = await registerUser({
      variables: {email, password, first_name, last_name, postal_code, country}
    });

    await clientRegister.resetStore();
    await clientRegister.cache.reset();

    dispatch(authActions.login({...loginData, redirectTo}));
  });

  return (
    <Checkout activeStep={1} title="Tell us about yourself" loginRedirect={loginRedirect}>
      <ThinkificDownRedirect>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-sm-12">
              <TextBox
                required
                error={isSubmitted ? formErrors.email : null}
                id="email"
                label="Email Address"
                name="email"
                placeholder="jason@email.com"
                register={register({required: true})}
                type="email"
              />
            </div>
          </div>
          <LoggedOut>
            <div className="row">
              <div className="col-sm-12">
                <TextBox
                  required
                  error={isSubmitted ? formErrors.password : null}
                  id="password"
                  label="Password"
                  name="password"
                  register={register({required: true})}
                  type="password"
                />
              </div>
            </div>
          </LoggedOut>
          <div className="row">
            <div className="col-sm-6">
              <TextBox
                required
                error={isSubmitted ? formErrors.first_name : null}
                id="first_name"
                label="First Name"
                name="first_name"
                register={register({required: true})}
              />
            </div>
            <div className="col-sm-6">
              <TextBox
                required
                error={isSubmitted ? formErrors.last_name : null}
                id="last_name"
                label="Last Name"
                name="last_name"
                register={register({required: true})}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Select
                required
                error={isSubmitted ? formErrors.country : null}
                id="country"
                label="Counrtry"
                options={countries}
                name="country"
                register={register({required: true})}
              />
            </div>
            <div className="col-sm-6">
              <TextBox
                required
                error={isSubmitted ? formErrors.postal_code : null}
                id="postal_code"
                label="Postal Code"
                name="postal_code"
                register={register({required: true})}
              />
            </div>
          </div>
          <div className="form-group">
            <Checkbox
              id="terms"
              name="terms"
              style={{marginTop: 30}}
              register={register({required: true})}
              checked={watch('terms')}
              error={isSubmitted ? formErrors.terms : null}
              label="Terms"
            >
            I have read and agree to the&nbsp;
              <a href="#" onClick={() => dispatch(stateActions.modalOpen('pageModal', 'terms'))}>Terms of Service</a> and&nbsp;
              <a href="#" onClick={() => dispatch(stateActions.modalOpen('pageModal', 'privacy'))}>Customer Privacy Policy</a>
            </Checkbox>
          </div>
          <CheckoutFooter
            showLogin={user.isEmpty()}
            error={<GraphQlError error={updateUserError || registerError}/>}
            loading={isSubmitting}
            disabled={isSubmitting}
            btnType="submit"
            loginRedirect={loginRedirect}
            onClick={onSubmit}
          />
        </form>
      </ThinkificDownRedirect>
    </Checkout>
  );
};

SignupAccount.getInitialProps = async ctx => {
  const {res, store} = ctx;
  const state = store.getState();
  const checkout = state.get('checkout');
  const checkoutPlan = checkout.get('plan');
  const token = getCookie('token', ctx);

  // If (!checkoutPlan || checkoutPlan.isEmpty()) {
  //   if (res) {
  //     res.writeHead(302, {
  //       Location: '/signup'
  //     });
  //     res.end();
  //   } else {
  //     Router.push('/signup');
  //   }
  // }

  // if (token) {
  //   const checkoutUrl = await getCheckoutUrlAsync(ctx);
  //   if (!checkoutUrl) {
  //     return {};
  //   }

  //   if (res) {
  //     res.writeHead(302, {
  //       Location: checkoutUrl
  //     });
  //     res.end();
  //   } else {
  //     Router.push(checkoutUrl);
  //   }
  // }

  return {};
};

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
