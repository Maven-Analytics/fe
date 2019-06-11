import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Checkout from '../../layouts/checkout';
import CheckoutPlans from '../../components/checkoutPlans';
import {selectors as planSelectors} from '../../redux/ducks/plans';
import {selectors as checkoutSelectors, actions as checkoutActions} from '../../redux/ducks/checkout';

const SignupIndex = ({plans, checkout, actions}) => {
  return (
    <Checkout
      activeStep={0}
      title="SELECT A MEMBERSHIP PLAN"
      nextStep="/signup/account"
      nextDisabled={!checkout || !checkout.has('plan')}
    >
      <CheckoutPlans plans={plans} checkout={checkout} onPlanChange={actions.setPlan}/>
    </Checkout>
  );
};

SignupIndex.propTypes = {
  plans: ImmutablePropTypes.list,
  checkout: ImmutablePropTypes.map,
  actions: PropTypes.objectOf(PropTypes.func)
};

SignupIndex.defaultProps = {
  plans: List(),
  checkout: Map()
};

const mapStateToProps = state => ({
  plans: planSelectors.getPlans(state),
  checkout: checkoutSelectors.getCheckout(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...checkoutActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupIndex);
