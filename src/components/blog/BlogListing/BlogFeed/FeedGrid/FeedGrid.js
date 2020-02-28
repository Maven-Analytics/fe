import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import BlogCard from '#root/components/blog/shared/BlogCard';
import {Routes} from '#root/routes';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const Grid = styled.div`
  display: grid;
  grid-row-gap: ${spacingUnit.l};
  grid-template-columns: 1fr;

  ${mediaBreakpointUp('md')} {
    grid-column-gap: ${spacingUnit.lmm};
    grid-row-gap: ${spacingUnit.xlx};
    grid-template-columns: 1fr 1fr;
  }
`;

const GridItem = styled.div``;

const FeedGrid = ({blogs, className}) => {
  if (!blogs || !blogs.length) {
    return null;
  }

  return (
    <Grid className={className}>
      {blogs.map((blog, index) => {
        return (
          <GridItem key={index}>
            <BlogCard
              authorImage={blog.author && blog.author.thumbnail}
              authorName={blog.author && `By ${blog.author.name}`}
              category={blog.category && blog.category.title}
              image={blog.featuredImage}
              link={`${Routes.Blog}/${blog.slug}`}
              title={blog.title}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

FeedGrid.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string
};

export default FeedGrid;
