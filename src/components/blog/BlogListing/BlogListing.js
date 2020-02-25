import React from 'react';
import styled from 'styled-components';

import FeaturedBlogCarousel from './FeaturedBlogCarousel';

const Wrapper = styled.div``;

const ListingContent = styled.div``;

const BlogListing = () => {
  return (
    <Wrapper>
      <FeaturedBlogCarousel />
      <div className="container">
        <ListingContent>Blog Listing</ListingContent>
      </div>
    </Wrapper>
  );
};

export default BlogListing;
