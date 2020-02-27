import {GradientText} from 'maven-ui';
import PropTypes from 'prop-types';
import React from 'react';

const BlogBanner = () => {
  return <GradientText isRead="true"> blog banner</GradientText>;
};

BlogBanner.propTypes = {
  eyelash: PropTypes.string,
  title: PropTypes.string
};

export default BlogBanner;
