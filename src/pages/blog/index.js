import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';

import BlogListing from '#root/components/blog/BlogListing';
import FeaturedBlogCarousel from '#root/components/blog/BlogListing/FeaturedBlogCarousel';
import MainLayout from '#root/components/layout/main';
import CtaSection from '#root/components/sections/ctaSection';

const featuredBlogsQuery = gql`
  query FeaturedBlogsQuery {
    featuredBlogs: blogPosts(featured: true, limit: 10, order: "-fields.date", skip: 0) {
      total
      limit
      skip
      items {
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
  }
`;

const BlogListingPage = ({featuredBlogs}) => {
  return (
    <MainLayout>
      <FeaturedBlogCarousel blogs={featuredBlogs || []} />
      <BlogListing />
      <CtaSection />
    </MainLayout>
  );
};

BlogListingPage.propTypes = {
  featuredBlogs: PropTypes.arrayOf(PropTypes.object)
};

BlogListingPage.getInitialProps = async ({apolloClient}) => {
  const {data: {featuredBlogs} = {}} = await apolloClient.query({query: featuredBlogsQuery, fetchPolicy: 'no-cache'});

  return {
    featuredBlogs: featuredBlogs && featuredBlogs.items
  };
};

export default BlogListingPage;
