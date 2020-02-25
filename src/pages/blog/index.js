import React from 'react';

import BlogListing from '#root/components/blog/BlogListing';
import MainLayout from '#root/components/layout/main';

const BlogListingPage = () => {
  return (
    <MainLayout>
      <BlogListing />
    </MainLayout>
  );
};

export default BlogListingPage;
