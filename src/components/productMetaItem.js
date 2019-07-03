import React from 'react';
import PropTypes from 'prop-types';

const ProductMetaItem = ({label, children}) => {
  return (
    <li className="product-meta__item">
      <span className="label">{label}</span>
      <span className="value">{children}</span>
    </li>
  );
};

ProductMetaItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default ProductMetaItem;
