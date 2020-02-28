import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import BlogFeed from './BlogFeed';

const Wrapper = styled.div``;

const ListingContent = styled.div``;

const blogsQuery = gql`
  query BlogPosts($category: String, $featured: Boolean, $limit: Float, $order: String, $skip: Float) {
    blogPosts(category: $category, featured: $featured, limit: $limit, order: $order, skip: $skip) {
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

const perPage = 12;

const BlogListing = ({category}) => {
  const {data: {blogPosts: {total, skip, items: posts}} = {blogPosts: {}}, fetchMore, loading} = useQuery(blogsQuery, {
    variables: {
      category: category && category.slug,
      limit: perPage,
      skip: 0
    }
  });

  const hasMore = posts && total > posts.length;

  const onLoadMore = () => {
    fetchMore({
      variables: {
        category,
        limit: perPage,
        skip: (skip || 0) + 1
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          ...fetchMoreResult,
          blogPosts: {
            ...fetchMoreResult.blogPosts,
            items: [...prev.blogPosts.items, ...fetchMoreResult.blogPosts.items]
          }
        };
      }
    });
  };

  return (
    <Wrapper>
      <ListingContent>
        <BlogFeed blogs={posts} loading={loading} />
      </ListingContent>
      {hasMore ? <button onClick={onLoadMore}>Load More</button> : null}
    </Wrapper>
  );
};

BlogListing.propTypes = {
  category: PropTypes.object
};

BlogListing.defaultProps = {
  category: null
};

export default BlogListing;
