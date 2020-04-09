import {useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';
import * as PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import ApplyCoupon from '#root/components/checkout/ApplyCoupon';
import CheckoutFooter from '#root/components/checkout/CheckoutFooter';
import CheckoutSummary from '#root/components/checkout/CheckoutSummary';
import Image from '#root/components/image';
import Checkout from '#root/components/layout/checkout';
import AddCard from '#root/components/shared/AddCard';
import AddCardForm from '#root/components/shared/AddCardForm';
import GraphQlError from '#root/components/shared/GraphQlError';
import {plans, subscriptionStatuses} from '#root/constants';
import {actions as subscriptionActions, selectors as subscriptionSelectors} from '#root/redux/ducks/subscription';
import {selectors as userSelectors} from '#root/redux/ducks/user';
import {Routes} from '#root/routes';
import {canUseDOM, eventPrevent} from '#root/utils/componentHelpers';
import redirect from '#root/utils/redirect';
import {canTrial, findSubscription} from '#root/utils/subscriptionHelpers';
import ThinkificDownRedirect from '#root/components/health/ThinkificDownRedirect';
import subscriptionStatusQuery from '#root/api/query/subscriptionStatus';
import {List} from 'immutable';
import getSession from '#root/utils/getSession';

const checkoutMutation = gql`
  mutation CheckoutV2($canTrial: Boolean!, $coupon: String, $paymentMethod: String, $planId: String!) {
    checkoutV2(canTrial: $canTrial, coupon: $coupon, paymentMethod: $paymentMethod, planId: $planId) {
      id
      plan_id
    }
  }
`;

const myPaymentMethodsQuery = gql`
  query MyPaymentMethods {
    myPaymentMethods {
      brand
      default
      id
      exp_month
      exp_year
      last4
    }
  }
`;

const SignupCheckout = ({planId}) => {
  const user = useSelector(userSelectors.getUser);
  const subscription = useSelector(subscriptionSelectors.getSubscription);

  const plan = plans.find(p => p.get('planId') === planId);
  const canUserTrial = plan.get('hasTrial') && canTrial(subscription);

  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [foreverFree, setForeverFree] = useState(false);

  const [paymentMethodError, setPaymentMethodError] = useState();
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState();

  const [runCheckout, {error: checkoutError}] = useMutation(checkoutMutation);
  const {data: {myPaymentMethods = []} = {}} = useQuery(myPaymentMethodsQuery);
  const myDefault = myPaymentMethods.find(p => p.default);

  const loginRedirect = canUseDOM() ? window.location.origin + Routes.SignupCheckout : Routes.SignupCheckout;

  const handleCouponApply = coupon => {
    setView(0);
    setCoupon(coupon);

    if (coupon.duration === 'forever' && coupon.percent_off === 100) {
      setForeverFree(true);
    } else {
      setForeverFree(false);
    }
  };

  const handleComplete = async paymentMethod => {
    setPaymentMethodError(null);

    try {
      await runCheckout({
        variables: {
          canTrial: canUserTrial,
          coupon: coupon ? coupon.id : null,
          planId,
          paymentMethod: paymentMethod ? paymentMethod.id : null
        }
      });

      if (plan.get('thanksRedirect')) {
        window.location.href = plan.get('thanksRedirect');
      } else {
        Router.push({
          pathname: Routes.EnterpriseSignupThanks(planId),
          query: {
            user_id: user.get('email'),
            product_name: plan.get('planName'),
            bundle_id: plan.get('planId'),
            pricing_plan: plan.get('amountCents') / 100
          }
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Checkout activeStep={2} title="Payment Information" loginRedirect={loginRedirect}>
      <ThinkificDownRedirect>
        <div className="signup-checkout">
          {/* <Loader
          height={70}
          loading={subscriptionLoading}
          position="top-center"
          width={70}
        /> */}
          <CheckoutSummary
            amountToday={canUserTrial ? 0 : plan.get('amountCents')}
            coupon={coupon}
            hasTrial={canUserTrial}
            interval={plan.get('interval')}
            planName={plan.get('planName')}
            planPrice={plan.get('amountCents') / 100}
          />
          {view === 0 ? (
            <AddCardForm
              foreverFree={foreverFree || Boolean(defaultPaymentMethod)}
              onComplete={handleComplete}
              setError={setPaymentMethodError}
              setLoading={setLoading}
            >
              {foreverFree || defaultPaymentMethod ? null : (
                <>
                  {myDefault ? (
                    <button className="btn btn--primary-solid" onClick={() => setDefaultPaymentMethod(myDefault)}>
                      Use Saved Card Ending In {myDefault.last4}
                    </button>
                  ) : null}
                  <AddCard loading={loading} showButtons={false} skin="dark" />
                </>
              )}
              <a href="#" className="signup-checkout__link" onClick={eventPrevent(() => setView(1))}>
                Have a coupon?
              </a>
              <CheckoutFooter
                showLogin={user.isEmpty()}
                error={loading || (!checkoutError && !paymentMethodError) ? null : <GraphQlError error={checkoutError || paymentMethodError} />}
                loading={loading}
                disabled={loading}
                btnType="submit"
                btnText="Complete Sign Up"
                loginRedirect={loginRedirect}
              />
              <Image src="/static/img/powered_by_stripe.png" />
            </AddCardForm>
          ) : (
            <ApplyCoupon onCancel={() => setView(0)} onComplete={handleCouponApply} />
          )}
        </div>
      </ThinkificDownRedirect>
    </Checkout>
  );
};

SignupCheckout.propTypes = {
  planId: PropTypes.any.isRequired
};

SignupCheckout.getInitialProps = async ctx => {
  const {
    apolloClient,
    store,
    query: {planId}
  } = ctx;

  if (!planId) {
    redirect(ctx, '/');
  }

  const session = getSession(ctx);
  if (!session) {
    redirect(ctx, Routes.EnterpriseSignup(planId));
    return {};
  }

  const {
    data: {subscriptionStatus}
  } = await apolloClient.query({query: subscriptionStatusQuery, fetchPolicy: 'no-cache'});

  store.dispatch(subscriptionActions.subscriptionSet(subscriptionStatus));
  if (findSubscription(planId, subscriptionStatus, List([subscriptionStatuses.paid, subscriptionStatuses.trial]))) {
    redirect(ctx, `${Routes.Dashboard}?notice=existing_subscription`);
    return {};
  }

  if (findSubscription(planId, subscriptionStatus, List([subscriptionStatuses.past_due]))) {
    redirect(ctx, Routes.Dashboard);
    return {};
  }

  return {
    planId
  };
};

export default SignupCheckout;
