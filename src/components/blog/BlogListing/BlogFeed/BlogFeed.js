import {Loader} from 'maven-ui';
import PropTypes from 'prop-types';
import React from 'react';

import {Routes} from '#root/routes';

import BlogCard from '../../shared/BlogCard';

const BlogFeed = ({blogs, loading}) => {
  return (
    <div>
      {loading ? <Loader align="top-center" loading={loading} position="relative" /> : null}
      {blogs.map((blog, index) => {
        return (
          <div key={index}>
            <BlogCard
              authorImage={blog.author && blog.author.thumbnail}
              authorName={blog.author && `By ${blog.author.name}`}
              category={blog.category && blog.category.title}
              image={blog.featuredImage}
              link={`${Routes.Blog}/${blog.slug}`}
              title={blog.title}
            />
          </div>
        );
      })}
    </div>
  );
};

BlogFeed.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
};

BlogFeed.defaultProps = {
  blogs: []
};

export default BlogFeed;
