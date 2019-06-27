import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Router from 'next/router';

import Checkout from '../../layouts/checkout';
import CheckoutPlans from '../../components/checkoutPlans';
import {selectors as planSelectors} from '../../redux/ducks/plans';
import {selectors as userSelectors} from '../../redux/ducks/user';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {actions as authActions} from '../../redux/ducks/auth';
import {selectors as checkoutSelectors, actions as checkoutActions} from '../../redux/ducks/checkout';
import CheckoutFooter from '../../components/checkoutFooter';
import {Routes} from '../../routes';
import config from '../../config';

class SignupIndex extends Component {
  constructor(props) {
    super(props);

    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentDidMount() {
    const {checkout, plans} = this.props;

    if (!checkout || !checkout.get('plan') || checkout.get('plan').isEmpty()) {
      this.props.actions.setPlan(plans.first());
    }
  }

  handleNextClick() {
    const {user} = this.props;

    if (user && user.get('id')) {
      this.props.actions.sso({
        redirectTo: `${config.HOST_APP}${Routes.SignupAccount}`
      });
    } else {
      Router.push(Routes.SignupAccount);
    }
  }

  render() {
    const {plans, checkout, actions, error, loading, user} = this.props;
    const btnDisabled = !checkout || !checkout.has('plan');

    return (
      <Checkout
        activeStep={0}
        title="SELECT A MEMBERSHIP PLAN"
      >
        <CheckoutPlans plans={plans} checkout={checkout} onPlanChange={actions.setPlan}/>
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
