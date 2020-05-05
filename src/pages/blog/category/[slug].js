import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {MaIcon} from 'maven-ui';

import BlogListing from '#root/components/blog/BlogListing';
import MainLayout from '#root/components/layout/main';
import CtaSection from '#root/components/sections/ctaSection';
import BrochureHero from '#root/components/sections/BrochureHero';
import BrochureHeroContent from '#root/components/sections/BrochureHero/BrochureHeroContent';
import {Routes} from '#root/routes';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const categoryQuery = gql`
  query BlogCategory($slug: String!) {
    blogCategory(slug: $slug) {
      id
      slug
      title
    }
  }
`;

const Btn = styled.button`
  align-items: center;
  border: 1px solid #fff;
  color: #fff;
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  height: 30px;
  justify-content: center;
  margin-left: auto;
  padding: 0.5rem;
  text-transform: none;
  width: 134px;

  &:hover,
  &:focus {
    border: 1px solid #fff;
    color: #fff;
  }

  i {
    margin-right: 10px;
  }

  ${mediaBreakpointUp('lg')} {
    height: 40px;
    font-size: 1.1rem;
    width: 165px;
  }
`;

const ContentRight = styled.div`
  margin-top: ${spacingUnit.default};

  ${mediaBreakpointUp('md')} {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    height: 100%;
    margin-top: 0;
  }
`;

const BlogArchivePage = ({category}) => {
  return (
    <MainLayout>
      <BrochureHero
        className="brochure-hero--blog-category"
        contentLeft={<BrochureHeroContent eyelash="Blog / Category" title={category.title} />}
        contentRight={
          <ContentRight>
            <Link href={Routes.Blog}>
              <Btn className="btn">
                <MaIcon icon="long-arrow-alt-left" />
                View All Articles
              </Btn>
            </Link>
          </ContentRight>
        }
        colClasses={['col-md-12']}
        backgroundSrc="/static/img/hexagon-grid-dark.png"
      />

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
