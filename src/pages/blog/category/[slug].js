import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';

import BlogListing from '#root/components/blog/BlogListing';
import MainLayout from '#root/components/layout/main';
import CtaSection from '#root/components/sections/ctaSection';

const categoryQuery = gql`
  query BlogCategory($slug: String!) {
    blogCategory(slug: $slug) {
      id
      slug
      title
    }
  }
`;

const BlogArchivePage = ({category}) => {
  return (
    <MainLayout>
      <BlogListing category={category} />
      <CtaSection />
    </MainLayout>
  );
};

BlogArchivePage.propTypes = {
  category: PropTypes.object
};

BlogArchivePage.getInitialProps = async ({apolloClient, query}) => {
  const {slug} = query;

  const {data: {blogCategory: category} = {}} = await apolloClient.query({
    query: categoryQuery,
    variables: {slug},
    fetchPolicy: 'no-cache'
  });

  return {
    category
  };
};

export default BlogArchivePage;
