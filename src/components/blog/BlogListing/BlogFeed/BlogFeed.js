import {Loader} from 'maven-ui';
import PropTypes from 'prop-types';
import React from 'react';

import BlogCard from '../../shared/BlogCard';

const BlogFeed = ({blogs, loading}) => {
  return (
    <div>
      {loading ? <Loader align="top-center" loading={loading} position="relative" /> : null}
      {blogs.map((blog, index) => {
        return (
          <div key={index}>
            <BlogCard title={blog.title} />
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
