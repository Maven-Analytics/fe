import React from 'react';
import PropTypes from 'prop-types';

import MaIcon from './maIcon';
import {innerHtml} from '../utils/componentHelpers';

const CheckoutPlan = ({selected, eyelash, title, description, onClick, id, price}) => {
  const classList = ['checkout-plan'];

  if (selected) {
    classList.push('selected');
  }

  return (
    <button id={`checkout-plan-${id}`} className={classList.join(' ')} onClick={onClick}>
      <div className="checkout-plan__inner">
        <div className="checkout-plan__check">
          <MaIcon icon="check"/>
        </div>
        <div className="checkout-plan__content">
          <span>{eyelash}</span>
          <h4>{title}<span dangerouslySetInnerHTML={innerHtml(price)}/></h4>
          <p>{description}</p>
        </div>
      </div>
    </button>
  );
};

CheckoutPlan.propTypes = {
  selected: PropTypes.bool,
  eyelash: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  price: PropTypes.string
};

export default CheckoutPlan;
