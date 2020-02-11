import * as PropTypes from 'prop-types';
import React from 'react';
import {injectStripe} from 'react-stripe-elements';

import {eventPrevent, noop} from '#root/utils/componentHelpers';

import addCard from './_addCard';

const AddCardForm = ({children, elements, foreverFree, onComplete: handleComplete, stripe, setError, setLoading}) => {
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (foreverFree) {
      return handleComplete();
    }

    try {
      const paymentMethod = await addCard({elements, stripe});

      if (!paymentMethod) {
        setLoading(false);
        return setError('Credit card is invalid.');
      }

      handleComplete(paymentMethod);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={eventPrevent(handleSubmit)}>
      {children}
    </form>
  );
};

AddCardForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func, PropTypes.node]),
  className: PropTypes.string,
  elements: PropTypes.object,
  foreverFree: PropTypes.bool,
  onComplete: PropTypes.func,
  setError: PropTypes.func,
  setLoading: PropTypes.func,
  stripe: PropTypes.object
};

AddCardForm.defaultProps = {
  children: null,
  onComplete: noop,
  setError: noop,
  setLoading: noop
};

export default injectStripe(AddCardForm);
