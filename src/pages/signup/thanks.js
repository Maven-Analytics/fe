import {useQuery} from '@apollo/react-hooks';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import subscriptionStatusQuery from '#root/api/query/subscriptionStatus';
import CheckoutThanks from '#root/components/checkoutThanks';
import Checkout from '#root/components/layout/checkout';
import Loader from '#root/components/loader';
import {actions as subscriptionActions} from '#root/redux/ducks/subscription';
import {selectors as userSelectors} from '#root/redux/ducks/user';
import {subscriptionEnrolled} from '#root/utils/subscriptionHelpers';

const SignupThanks = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  // Const subscription = useSelector(subscriptionSelectors.getSubscription);
  const {data: {subscriptionStatus} = {}, loading, stopPolling} = useQuery(subscriptionStatusQuery, {pollInterval: 1000});

  const enrolled = subscriptionEnrolled(subscriptionStatus);

  if (subscriptionStatus && enrolled) {
    stopPolling();
    dispatch(subscriptionActions.subscriptionSet(subscriptionStatus));
  }

  return (
    <Checkout full>
      <div className="thanks-page">
        {!user || user.isEmpty() || (loading === false && enrolled) ? (
          <CheckoutThanks />
        ) : (
          <div className="checkout-thanks thanks-page__content ">
            <Loader center loading={loading || !enrolled} width={100} height={100} />
            <p>{'Hang Tight, Creating your Account...'}</p>
          </div>
        )}
      </div>
    </Checkout>
  );
};

export default SignupThanks;

// SignupThanks.getInitialProps = () => {
//   return {
//     loading: true
//   };
// };

// SignupThanks.propTypes = {
//   subscription: ImmutablePropTypes.map.isRequired,
//   token: PropTypes.string,
//   actions: PropTypes.objectOf(PropTypes.func),
//   loading: PropTypes.bool,
//   user: ImmutablePropTypes.map
// };

// const mapStateToProps = state => ({
//   loading: loadingSelectors.getLoading(['ENSURE_ENROLLED'])(state),
//   token: userSelectors.getToken(state),
//   user: userSelectors.getUser(state),
//   subscription: subscriptionSelectors.getSubscription(state)
// });

// const mapDispatchToProps = function (dispatch) {
//   return {
//     actions: bindActionCreators(
//       {
//         ...authActions
//       },
//       dispatch
//     )
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SignupThanks);
