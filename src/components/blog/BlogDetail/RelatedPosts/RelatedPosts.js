import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {mediaBreakpointUp} from '#root/utils/responsive';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Link from 'next/link';

import BlogFeed from '../../BlogListing/BlogFeed';
import {Routes} from '#root/routes';

const relatedPostsQuery = gql`
  query RelatedPosts($category: String) {
    blogPosts(category: $category, limit: 2) {
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

const Btn = styled.button`
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  margin: -1rem auto 0;
  width: 212px;
`;

const Feed = styled.div``;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 0.3rem;
  text-align: center;

  ${mediaBreakpointUp('md')} {
    font-size: 2.4rem;
    margin: 0 0 3rem;
  }
`;

const Wrapper = styled.div``;

const RelatedPosts = ({category, className}) => {
  if (!category || !category.slug) {
    return null;
  }

  const {data: {blogPosts: {items: relatedPosts}} = {blogPosts: {}}, loading} = useQuery(relatedPostsQuery, {
    variables: {
      category: category && category.slug
    }
  });

  return (
    <Wrapper className={className}>
      <Title>You May Also Like</Title>
      <Feed>
        <BlogFeed blogs={relatedPosts} hasMore={false} loading={loading} showCta={false} showSubscribe={false} />
      </Feed>
      <Link href={Routes.Blog}>
        <Btn className="btn btn--default">View All Articles</Btn>
      </Link>
    </Wrapper>
  );
};

RelatedPosts.propTypes = {
  className: PropTypes.string,
  category: PropTypes.object
};

export default RelatedPosts;
