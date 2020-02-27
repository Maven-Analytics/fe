import PropTypes from 'prop-types';
import React from 'react';

import FeaturedBlog from '../../shared/FeaturedBlog';

const FeaturedBlogCarousel = ({blogs}) => {
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => {
          return (
            <div key={index}>
              <FeaturedBlog excerpt={blog.excerpt} id={blog.id} image={blog.featuredImage} title={blog.title} />
            </div>
          );
        })}
    </div>
  );
};

FeaturedBlogCarousel.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object)
};

export default FeaturedBlogCarousel;
