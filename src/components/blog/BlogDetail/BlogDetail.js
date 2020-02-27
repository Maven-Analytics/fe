import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const blogPostsQuery = gql`
  query BlogPosts($category: String, $featured: Boolean, $limit: Float, $order: String, $skip: Float) {
    blogPosts(category: $category, featured: $featured, limit: $limit, order: $order, skip: $skip) {
      total
      limit
      skip
      items {
        id
        title
      }
    }
  }
`;

const BlogDetail = () => {
  return (
    <Wrapper>
      <div className="container">
        <h1>Blog Detail</h1>
      </div>
    </Wrapper>
  );
};

export default BlogDetail;
