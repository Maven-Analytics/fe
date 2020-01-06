import PropTypes from 'prop-types';
import React from 'react';

const ProductMeta = ({className, children}) => {
  const classList = ['product-meta'];

  if (className) {
    classList.push(className);
  }

  return (
    <ul className={classList.join(' ')}>
      {children}
    </ul>
  );
};

ProductMeta.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ProductMeta;
