import React from 'react';

import BlogListing from '#root/components/blog/BlogListing';
import MainLayout from '#root/components/layout/main';
import CtaSection from '#root/components/sections/ctaSection';

const BlogListingPage = () => {
  return (
    <MainLayout>
      <BlogListing />
      <CtaSection />
    </MainLayout>
  );
};

export default BlogListingPage;
