import React from 'react';
import * as PropTypes from 'prop-types';

const GraphQlError = ({error, showAll}) => {
  if (!error) {
    return null;
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

  if (!error.graphQLErrors[0]) {
    return null;
  }

  return error.graphQLErrors[0].message;
};

GraphQlError.propTypes = {
  error: PropTypes.string,
  showAll: PropTypes.bool
};

export default GraphQlError;

