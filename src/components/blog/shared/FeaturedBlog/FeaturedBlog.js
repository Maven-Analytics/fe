import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {headerHeightMobile} from '#root/utils/styles';

const Wrapper = styled.div``;

const Background = styled.div``;

const FeaturedBlog = ({title}) => {
  return <Wrapper>{title}</Wrapper>;
};

FeaturedBlog.propTypes = {
  authorImage: PropTypes.object,
  authorName: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string.isRequired,
  readLength: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
  title: PropTypes.string
};

export default FeaturedBlog;
