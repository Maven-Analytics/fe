import PropTypes from 'prop-types';
import React from 'react';

const FeaturedBlog = ({title}) => {
  return <div>{title}</div>;
};

FeaturedBlog.propTypes = {
  excerpt: PropTypes.string,
  image: PropTypes.object,
  title: PropTypes.string
};

export default FeaturedBlog;
