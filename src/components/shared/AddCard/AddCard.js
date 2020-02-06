import * as PropTypes from 'prop-types';
import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

import {noop} from '#root/utils/componentHelpers';

import GraphQlError from '../GraphQlError';

const AddCard = ({
  className,
  error,
  loading,
  onCancel: handleCancel,
  showButtons,
  skin
}) => {
  const classList = ['add-card'];

  if (className) {
    classList.push(className);
  }

  if (skin) {
    classList.push(skin);
  }

  const cardOpts = {
    style: {
      base: {
        fontSize: '14px',
        color: skin === 'light' ? '#252525' : '#FFFFFF',
        fontFamily: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        '::placeholder': {
          color: skin === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'
        }
      },
      invalid: {
        color: '#e24d20'
      }
    }
  };

  return (
    <div className={classList.join(' ')}>
      <CardElement
        disabled={loading}
        hidePostalCode
        {...cardOpts}
      />
      {error && error.message ? <small className="form-text error"><GraphQlError error={error.message}/></small> : null}
      {showButtons ? (
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
      ) : null}
    </div>
  );
};

AddCard.propTypes = {
  className: PropTypes.string,
  error: PropTypes.object,
  loading: PropTypes.bool,
  onCancel: PropTypes.func,
  showButtons: PropTypes.bool,
  skin: PropTypes.oneOf(['light', 'dark'])
};

AddCard.defaultProps = {
  onCancel: noop,
  showButtons: true,
  skin: 'light'
};

export default injectStripe(AddCard);
