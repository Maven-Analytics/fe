import * as PropTypes from 'prop-types';
import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

import {eventPrevent, noop} from '#root/utils/componentHelpers';

import addCard from './_addCard';

const AddCard = ({
  className,
  elements,
  loading,
  onCancel: handleCancel,
  onComplete: handleComplete,
  setLoading,
  stripe
}) => {
  const handleSubmit = async () => {
    setLoading(true);
    const paymentMethod = await addCard({elements, stripe});

    handleComplete(paymentMethod);
  };

  const classList = ['add-card'];

  if (className) {
    classList.push(className);
  }

  const cardOpts = {
    style: {
      base: {
        fontSize: '14px',
        color: '#252525',
        fontFamily: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
      },
      invalid: {
        color: '#e24d20'
      },
      disabled: {
        color: 'white'
      }
    }
  };

  return (
    <div className={classList.join(' ')}>
      <form onSubmit={eventPrevent(handleSubmit)}>
        <CardElement disabled={loading} {...cardOpts}/>
        <div className="buttons">
          <button
            className="btn btn--sm btn--default"
            onClick={handleCancel}
            role="button"
            type="button"
          >
            Cancel
          </button>
          <button disabled={loading} className="btn btn--sm btn--default" type="submit" role="button">Add Card</button>
        </div>
      </form>
    </div>
  );
};

AddCard.propTypes = {
  className: PropTypes.string,
  elements: PropTypes.object,
  loading: PropTypes.bool,
  onCancel: PropTypes.func,
  onComplete: PropTypes.func,
  setLoading: PropTypes.func,
  stripe: PropTypes.object
};

AddCard.defaultProps = {
  onCancel: noop,
  onComplete: noop
};

export default injectStripe(AddCard);
