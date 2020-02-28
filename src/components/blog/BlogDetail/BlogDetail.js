import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import BlogHero from './BlogHero';

const Wrapper = styled.div``;

const BlogDetail = ({blog}) => {
  return (
    <Wrapper>
      <BlogHero
        authorImage={blog.author && blog.author.thumbnail}
        authorName={blog.author && blog.author.name}
        body={blog.body}
        eyelash={blog.category && blog.category.title}
        id={blog.id}
        image={blog.featuredImage}
        title={blog.title}
      />
      <div className="container">
        <h1>Blog Detail</h1>
      </div>
    </Wrapper>
  );
};

BlogDetail.propTypes = {
  blog: PropTypes.object
};

BlogDetail.defaultProps = {
  blog: {}
};

export default BlogDetail;
