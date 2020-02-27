import PropTypes from 'prop-types';
import React from 'react';

const BlogCard = ({title}) => {
  return <div>Blog Card: {title}</div>;
};

BlogCard.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string
};

export default BlogCard;
