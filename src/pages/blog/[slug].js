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
      author {
        name
        thumbnail {
          file {
            url
            details {
              image {
                height
                width
              }
            }
          }
        }
      }
      body
      category {
        slug
        title
      }
      date
      featuredImage {
        id
        file {
          url
          details {
            image {
              height
              width
            }
          }
        }
      }
      slug
      title
    }
  }
`;

const BlogDetailPage = ({blog}) => {
  return (
    <MainLayout>
      <BlogDetail blog={blog} />
      <CtaSection />
    </MainLayout>
  );
};

BlogDetailPage.propTypes = {
  blog: PropTypes.object
};

BlogDetailPage.getInitialProps = async ({apolloClient, query}) => {
  const {slug} = query;

  const {data: {blogPost: blog} = {}} = await apolloClient.query({query: postQuery, variables: {slug}, fetchPolicy: 'no-cache'});

  return {
    blog
  };
};

export default BlogDetailPage;
