import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Checkout from '#root/components/layout/checkout';
import {actions as authActions} from '#root/redux/ducks/auth';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {selectors as subscriptionSelectors} from '#root/redux/ducks/subscription';
import {selectors as userSelectors} from '#root/redux/ducks/user';

import CheckoutThanks from '../../components/checkoutThanks';
import Loader from '../../components/loader';
import {subscriptionEnrolled} from '../../utils/subscriptionHelpers';

class SignupThanks extends Component {
  componentDidMount() {
    const {subscription, user} = this.props;
    if (user && !user.isEmpty() && subscription && !subscriptionEnrolled(subscription)) {
      this.props.actions.ensureEnrolled(this.props.token);
    }
  }

  render() {
    const {loading, subscription, user} = this.props;
    return (
      <Checkout full>
        <div className="thanks-page">
          {!user || user.isEmpty() || (loading === false && subscriptionEnrolled(subscription)) ? (
            <CheckoutThanks />
          ) : (
            <div className="checkout-thanks thanks-page__content ">
              <Loader center loading={loading} width={100} height={100} />
              <p>{'Hang Tight, Creating your Account...'}</p>
            </div>
          )}
        </div>
      </Checkout>
    );
  }
}

SignupThanks.getInitialProps = () => {
  return {
    loading: true
  };
};

SignupThanks.propTypes = {
  subscription: ImmutablePropTypes.map.isRequired,
  token: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  loading: PropTypes.bool,
  user: ImmutablePropTypes.map
};

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['ENSURE_ENROLLED'])(state),
  token: userSelectors.getToken(state),
  user: userSelectors.getUser(state),
  subscription: subscriptionSelectors.getSubscription(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...authActions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupThanks);
