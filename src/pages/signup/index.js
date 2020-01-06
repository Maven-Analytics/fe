import {List, Map} from 'immutable';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Checkout from '#root/components/layout/checkout';
import {actions as authActions} from '#root/redux/ducks/auth';
import {actions as checkoutActions, selectors as checkoutSelectors} from '#root/redux/ducks/checkout';
import {selectors as errorSelectors} from '#root/redux/ducks/error';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {selectors as planSelectors} from '#root/redux/ducks/plans';
import {selectors as userSelectors} from '#root/redux/ducks/user';

import CheckoutFooter from '../../components/checkoutFooter';
import CheckoutPlans from '../../components/checkoutPlans';
import {Routes} from '../../routes';
import {getCheckoutUrlAsync} from '../../services/apiv2';
import {canUseDOM} from '../../utils/componentHelpers';

class SignupIndex extends Component {
  constructor(props) {
    super(props);

    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentDidMount() {
    const {checkout, plans} = this.props;

    if (!checkout || !checkout.get('plan') || checkout.get('plan').isEmpty()) {
      this.props.actions.checkoutSetPlan(plans.first());
    }
  }

  async handleNextClick() {
    const {user} = this.props;

    if (user && user.get('id')) {
      const redirectTo = await getCheckoutUrlAsync();

      this.props.actions.sso({
        redirectTo
      });
    } else {
      Router.push(Routes.SignupAccount);
    }
  }

  render() {
    const {plans, checkout, actions, error, loading, user} = this.props;
    const btnDisabled = !checkout || !checkout.has('plan');

    const loginRedirect = canUseDOM() ? window.location.origin + Routes.Signup : Routes.Signup;

    return (
      <Checkout
        activeStep={0}
        loginRedirect={loginRedirect}
        title="SELECT A MEMBERSHIP PLAN"
      >
        <CheckoutPlans plans={plans} checkout={checkout} onPlanChange={actions.checkoutSetPlan} />
        <CheckoutFooter
          showLogin={user.isEmpty()}
          error={error}
          loading={loading}
          btnType="button"
          disabled={btnDisabled}
          onClick={this.handleNextClick}
        />
      </Checkout>
    );
  }
}

SignupIndex.propTypes = {
  plans: ImmutablePropTypes.list,
  checkout: ImmutablePropTypes.map,
  actions: PropTypes.objectOf(PropTypes.func),
  user: ImmutablePropTypes.map,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

SignupIndex.defaultProps = {
  plans: List(),
  checkout: Map(),
  user: Map()
};

const mapStateToProps = state => ({
  plans: planSelectors.getPlans(state),
  checkout: checkoutSelectors.getCheckout(state),
  user: userSelectors.getUser(state),
  loading: loadingSelectors.getLoading(['SSO'])(state),
  error: errorSelectors.getError(['SSO'])(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...checkoutActions,
    ...authActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupIndex);
