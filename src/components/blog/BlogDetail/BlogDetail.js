import React from 'react';
import styled from 'styled-components';

import FeaturedBlog from '../shared/FeaturedBlog/FeaturedBlog';

const Wrapper = styled.div``;

const BlogDetail = () => {
  return (
    <Wrapper>
      <FeaturedBlog />
      <div className="container">
        <h1>Blog Detail</h1>
      </div>
    </Wrapper>
  );
};

export default BlogDetail;
