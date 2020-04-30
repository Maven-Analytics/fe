import {useMutation} from '@apollo/react-hooks';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';

import registerMutation from '#root/api/mutations/register';
import CheckoutFooter from '#root/components/checkout/CheckoutFooter';
import ThinkificDownRedirect from '#root/components/health/ThinkificDownRedirect';
import Select from '#root/components/inputs/Select';
import TextBox from '#root/components/inputs/TextBox';
import Checkout from '#root/components/layout/checkout';
import LoggedOut from '#root/components/loggedOut';
import GraphQlError from '#root/components/shared/GraphQlError';
import {actions as authActions} from '#root/redux/ducks/auth';
import {actions as stateActions} from '#root/redux/ducks/state';
import {Routes} from '#root/routes';
import {canUseDOM} from '#root/utils/componentHelpers';
import {getCookie} from '#root/utils/cookies';
import countries from '#root/utils/countries';
import getSession from '#root/utils/getSession';
import redirect from '#root/utils/redirect';
import Sentry from '#root/utils/sentry';

const SignupAccount = () => {
  const loginRedirect = canUseDOM() ? window.location.origin + Routes.SignupAccount : Routes.SignupAccount;

  const [registerUser, {error: registerError, client: clientRegister}] = useMutation(registerMutation);
  const {
    formState: {isSubmitting, isSubmitted},
    handleSubmit,
    register,
    clearError,
    errors: formErrors,
    watch
  } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = handleSubmit(async ({email, password, first_name, last_name, postal_code, country}) => {
    clearError();

    const createUserStartTime = new Date().getTime();
    Sentry.addBreadcrumb({message: `Starting create user ${createUserStartTime}`});
    Sentry.addBreadcrumb({message: `User input data ${email}, ${first_name}, ${last_name}, ${postal_code}, ${country}`});

    try {
      const redirectTo = Routes.SignupCheckout;
      const {
        data: {register: loginData}
      } = await registerUser({
        variables: {email, password, first_name, last_name, postal_code, country}
      });

      Sentry.addBreadcrumb({message: `Creating user took ${new Date().getTime() - createUserStartTime} milliseconds`});

      const startResetTime = new Date().getTime();
      Sentry.addBreadcrumb({message: `Starting store reset ${startResetTime}`});
      await clientRegister.resetStore();
      await clientRegister.cache.reset();
      Sentry.addBreadcrumb({message: `Store reset took ${new Date().getTime() - startResetTime}`});

      Sentry.captureMessage('Successfully created user');

      dispatch(authActions.login({...loginData, redirectTo}));
      router.push(redirectTo);
    } catch (error) {
      Sentry.addBreadcrumb({message: 'Error registering user'});
      Sentry.captureException(error);
    }
  });

  useEffect(() => {
    if (registerError) {
      Sentry.captureException(registerError);
    }
  }, [registerError]);

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
                label="Country"
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
            <span style={{fontSize: '1.4rem', marginTop: 30}}>
              {/* eslint-disable-next-line quotes */}
              By continuing I agree to Maven {"Analytics's"} &nbsp;
              <a
                href="#"
                style={{color: '#cecece', textDecoration: 'underline'}}
                onClick={() => dispatch(stateActions.modalOpen('pageModal', 'terms'))}
              >
                Terms of Service
              </a>{' '}
              and&nbsp;
              <a
                href="#"
                style={{color: '#cecece', textDecoration: 'underline'}}
                onClick={() => dispatch(stateActions.modalOpen('pageModal', 'privacy'))}
              >
                Customer Privacy Policy
              </a>
            </span>
          </div>
          <CheckoutFooter
            showLogin
            btnText="PROCEED TO CHECKOUT"
            btnType="submit"
            disabled={isSubmitting}
            error={registerError ? <GraphQlError error={registerError} /> : null}
            loading={isSubmitting}
            loginRedirect={loginRedirect}
            onClick={onSubmit}
          />
        </form>
      </ThinkificDownRedirect>
    </Checkout>
  );
};

SignupAccount.getInitialProps = async ctx => {
  const session = getSession(ctx);
  const checkout = getCookie('checkout', ctx);

  // If the checkout plan is not set, go to step 1
  if (!checkout || !checkout.plan || !checkout.plan.planId) {
    redirect(ctx, Routes.Signup);
    return {};
  }

  // If logged in, go right to step 3
  if (session) {
    redirect(ctx, Routes.SignupCheckout);
    return {};
  }

  return {};
};

export default SignupAccount;
