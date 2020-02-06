import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';
import * as PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import subscriptionStatusQuery from '#root/api/query/subscriptionStatus';
import ApplyCoupon from '#root/components/checkout/ApplyCoupon';
import CheckoutFooter from '#root/components/checkout/CheckoutFooter';
import CheckoutSummary from '#root/components/checkout/CheckoutSummary';
import Checkout from '#root/components/layout/checkout';
import AddCard from '#root/components/shared/AddCard';
import AddCardForm from '#root/components/shared/AddCardForm';
import GraphQlError from '#root/components/shared/GraphQlError';
import {plans} from '#root/constants';
import {actions as subscriptionActions, selectors as subscriptionSelectors} from '#root/redux/ducks/subscription';
import {selectors as userSelectors} from '#root/redux/ducks/user';
import {Routes} from '#root/routes';
import {canUseDOM, eventPrevent} from '#root/utils/componentHelpers';
import {getCookie} from '#root/utils/cookies';
import getSession from '#root/utils/getSession';
import redirect from '#root/utils/redirect';
import {canTrial, findSubscription} from '#root/utils/subscriptionHelpers';

const checkoutMutation = gql`
mutation Checkout($paymentMethod: String, $planId: String!) {
  checkout(paymentMethod: $paymentMethod, planId: $planId) {
    id
    plan_id
  }
}
`;

const SignupCheckout = ({planId}) => {
  const user = useSelector(userSelectors.getUser);
  const subscription = useSelector(subscriptionSelectors.getSubscription);

  const plan = plans.find(p => p.get('planId') === planId);
  const hasTrial = canTrial(subscription);

  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [foreverFree, setForeverFree] = useState(false);

  const [paymentMethodError, setPaymentMethodError] = useState();

  const [runCheckout, {error: checkoutError}] = useMutation(checkoutMutation);

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
          coupon: coupon ? coupon.id : null,
          planId,
          paymentMethod: paymentMethod ? paymentMethod.id : null
        }
      });

      Router.push({
        pathname: Routes.SignupThanks,
        query: {
          user_id: user.get('email'),
          product_name: plan.get('planName'),
          bundle_id: plan.get('planId'),
          pricing_plan: plan.get('amountCents') / 100
        }
      });
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <Checkout activeStep={2} title="Payment Information" loginRedirect={loginRedirect}>
      <div className="signup-checkout">
        {/* <Loader
          height={70}
          loading={subscriptionLoading}
          position="top-center"
          width={70}
        /> */}
        <CheckoutSummary
          amountToday={hasTrial ? 0 : plan.get('amountCents')}
          coupon={coupon}
          hasTrial={hasTrial}
          interval={plan.get('interval')}
          planName={plan.get('planName')}
          planPrice={plan.get('amountCents') / 100}
        />
        {view === 0 ? (
          <AddCardForm
            foreverFree={foreverFree}
            onComplete={handleComplete}
            setError={setPaymentMethodError}
            setLoading={setLoading}
          >
            {foreverFree ? null : (
              <AddCard
                loading={loading}
                showButtons={false}
                skin="dark"
              />
            )}
            <a
              href="#"
              className="signup-checkout__link"
              onClick={eventPrevent(() => setView(1))}
            >
              Have a coupon?
            </a>
            <CheckoutFooter
              showLogin={user.isEmpty()}
              error={loading || (!checkoutError && !paymentMethodError) ? null : <GraphQlError error={checkoutError || paymentMethodError}/>}
              loading={loading}
              disabled={loading}
              btnType="submit"
              btnText="Complete Sign Up"
              loginRedirect={loginRedirect}
            />
          </AddCardForm>
        ) : (
          <ApplyCoupon
            onCancel={() => setView(0)}
            onComplete={handleCouponApply}
          />
        )}
      </div>
    </Checkout>
  );
};

SignupCheckout.propTypes = {
  planId: PropTypes.any.isRequired
};

SignupCheckout.getInitialProps = async ctx => {
  const {apolloClient, store} = ctx;

  const session = getSession(ctx);
  const checkout = getCookie('checkout', ctx);

  if (!session || !checkout || !checkout.plan || !checkout.plan.planId) {
    redirect(ctx, Routes.Signup);
    return {};
  }

  const {data: {subscriptionStatus}} = await apolloClient.query({query: subscriptionStatusQuery, fetchPolicy: 'no-cache'});

  store.dispatch(subscriptionActions.subscriptionSet(subscriptionStatus));

  const planId = checkout.plan.planId;

  if (findSubscription(planId, subscriptionStatus)) {
    redirect(ctx, Routes.Dashboard);
    return {};
  }

  return {
    planId
  };
};

export default SignupCheckout;

