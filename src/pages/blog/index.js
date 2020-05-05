import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import styled from 'styled-components';
import {Dropdown, MaIcon} from 'maven-ui';

import BlogListing from '#root/components/blog/BlogListing';
import FeaturedBlogCarousel from '#root/components/blog/BlogListing/FeaturedBlogCarousel';
import MainLayout from '#root/components/layout/main';
import CtaSection from '#root/components/sections/ctaSection';
import {mediaBreakpointUp} from '#root/utils/responsive';
import useDebounce from '#root/components/hooks/useDebounce';

const BlogListingQuery = gql`
  query BlogListingQuery {
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
    categories: blogCategories(order: "fields.title") {
      id
      slug
      title
    }
  }
`;

const CategoryDropdown = styled(Dropdown)`
  font-size: 1.2rem;
  max-width: 328px;

  ${mediaBreakpointUp('md')} {
    flex: 0 0 328px;
    font-size: 1.6rem;
  }

  > button {
    padding: 0.3rem 2.7rem;
  }

  > div {
    padding: 0.3rem 2.7rem;
  }
`;

const Header = styled.div`
  margin: 2.2rem auto;
  max-width: 328px;

  ${mediaBreakpointUp('md')} {
    display: flex;
    justify-content: space-between;
    max-width: none;
  }

  ${mediaBreakpointUp('lg')} {
    margin: 5rem auto 2.2rem;
  }
`;

const SearchInput = styled.input`
  border: none;
  color: ${props => props.theme.charcoal};
  margin-left: 2.1rem;

  &:focus {
    outline: none;
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    opacity: 0.4;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    opacity: 0.4;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    opacity: 0.4;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    opacity: 0.4;
  }
`;

const SearchWrap = styled.div`
  align-items: center;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.shadyLady};
  font-size: 1.2rem;
  margin-top: 2.2rem;
  max-width: 328px;
  padding: 0.3rem 1.2rem;

  ${mediaBreakpointUp('md')} {
    flex: 0 0 328px;
    font-size: 1.6rem;
    margin-top: 0;
  }
`;

const defaultCategories = [
  {
    id: 'default',
    slug: null,
    title: 'All Categories'
  }
];

const BlogListingPage = ({categories, featuredBlogs}) => {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState('');

  const selectedCategory = category ? categories.find(c => c.id === category) : null;

  const debouncedSearch = useDebounce(search, 500);

  let dropdownItems = defaultCategories;

  if (categories) {
    dropdownItems = dropdownItems.concat(categories);
  }

  return (
    <MainLayout>
      <FeaturedBlogCarousel blogs={featuredBlogs || []} />
      <div className="container container--lg">
        <Header>
          <CategoryDropdown
            items={dropdownItems.map(c => ({label: c.title, value: c.id}))}
            label="Choose a category"
            onChange={setCategory}
            value={selectedCategory && selectedCategory.title}
          />
          <SearchWrap>
            <MaIcon icon="search" />
            <SearchInput placeholder="Type to search…." onChange={e => setSearch(e.target.value)} value={search} />
          </SearchWrap>
        </Header>
      </div>
      <BlogListing category={selectedCategory} search={debouncedSearch} />
      <CtaSection />
    </MainLayout>
  );
};

BlogListingPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  featuredBlogs: PropTypes.arrayOf(PropTypes.object)
};

BlogListingPage.defaultProps = {
  categories: []
};

BlogListingPage.getInitialProps = async ({apolloClient}) => {
  const {data: {categories, featuredBlogs} = {}} = await apolloClient.query({query: BlogListingQuery, fetchPolicy: 'no-cache'});

  return {
    categories,
    featuredBlogs: featuredBlogs && featuredBlogs.items
  };
};

export default BlogListingPage;
