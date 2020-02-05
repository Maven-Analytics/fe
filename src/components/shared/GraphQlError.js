import * as PropTypes from 'prop-types';
import React from 'react';

const GraphQlError = ({error, showAll}) => {
  if (!error) {
    return null;
  }

  if (!error.graphQLErrors && typeof error === 'string') {
    return error;
  }

  if (!error.graphQLErrors && typeof error.message === 'string') {
    return error.message;
  }

  if (error.graphQLErrors && showAll) {
    return (
      <span>
        {error.graphQLErrors.map((error, index) => (
          <span key={index}>{error.message}</span>
        ))}
      </span>
    );
  }

  if (!error.graphQLErrors || !error.graphQLErrors[0]) {
    return null;
  }

  return error.graphQLErrors[0].message;
};

GraphQlError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  showAll: PropTypes.bool
};

export default GraphQlError;

