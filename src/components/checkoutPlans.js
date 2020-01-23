import {List, Map} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {click} from '#root/utils/componentHelpers';

import CheckoutPlan from './checkoutPlan';

const CheckoutPlans = ({plans, checkout, onPlanChange}) => {
  return (
    <div className="checkout-plans">
      <ul>
        {plans.map(plan => (
          <li key={plan.get('id')}>
            <CheckoutPlan
              description={plan.get('description')}
              eyelash={plan.get('eyelash')}
              id={plan.get('id')}
              onClick={click(onPlanChange, plan)}
              price={plan.get('price')}
              selected={plan.get('id') === checkout.getIn(['plan', 'id'])}
              title={plan.get('title')}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

CheckoutPlans.propTypes = {
  plans: ImmutablePropTypes.list,
  checkout: ImmutablePropTypes.map,
  onPlanChange: PropTypes.func.isRequired
};

CheckoutPlans.defaultProps = {
  plans: List(),
  checkout: Map()
};

export default CheckoutPlans;
