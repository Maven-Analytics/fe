import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';

import BlogDetail from '#root/components/blog/BlogDetail';
import MainLayout from '#root/components/layout/main';
import CtaSection from '#root/components/sections/ctaSection';

const postQuery = gql`
  query BlogPost($slug: String!) {
    blogPost(slug: $slug) {
      id
      title
    }
  }
`;

const BlogDetailPage = ({post}) => {
  return (
    <MainLayout>
      <BlogDetail />
      <CtaSection />
    </MainLayout>
  );
};

BlogDetailPage.propTypes = {
  post: PropTypes.object
};

BlogDetailPage.getInitialProps = async ({apolloClient, query}) => {
  const {slug} = query;

  const {
    data: {blogPost: post}
  } = await apolloClient.query({query: postQuery, variables: {slug}, fetchPolicy: 'no-cache'});

  return {
    post
  };
};

export default BlogDetailPage;
