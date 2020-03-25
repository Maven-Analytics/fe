import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Blog = ({children}) => {
  return <Wrapper>{children}</Wrapper>;
};

Blog.propTypes = {
  children: PropTypes.node
};

export default Blog;
