import PropTypes from 'prop-types';
import React from 'react';

const ProductMetaItem = ({label, children}) => {
  return (
    <li className="product-meta__item">
      <span className="label">{label}</span>
      {children ? <span className="value">{children}</span> : null}
    </li>
  );
};

ProductMetaItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default ProductMetaItem;
