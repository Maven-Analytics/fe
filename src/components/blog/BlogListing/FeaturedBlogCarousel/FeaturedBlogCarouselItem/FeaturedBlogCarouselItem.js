import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import AuthorThumbnail from '#root/components/blog/shared/AuthorThumbnail';
import BlogMeta from '#root/components/blog/shared/BlogMeta';
import FeaturedGrid from '#root/components/blog/shared/FeaturedGrid';
import ReadTime from '#root/components/shared/ReadTime/ReadTime';
import btnFixed from '#root/utils/btnFixed';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 265px;

  ${mediaBreakpointUp('sm')} {
    max-width: 400px;
  }

  ${mediaBreakpointUp('md')} {
    max-width: none;
  }
`;

const Author = styled(AuthorThumbnail)`
  color: #fff;
  margin-bottom: ${spacingUnit.md};

  ${mediaBreakpointUp('md')} {
    margin-bottom: ${spacingUnit.l};
  }
`;

const Btn = styled.button`
  color: #fff;
  max-width: none;
`;

const FeaturedBlogCarouselItem = ({authorImage, authorName, body, className, eyelash, image, link, title}) => {
  return (
    <Wrapper className={className}>
      <FeaturedGrid image={image}>
        <div>
          <BlogMeta eyelash={eyelash} title={title} />
          <Author
            row
            extra={
              <>
                <span>/</span>
                <span>
                  <ReadTime isMarkdown content={body || ''} />
                  read
                </span>
              </>
            }
            image={authorImage}
            name={`By ${authorName}`}
          />
          <Link href={link}>
            <Btn className="btn btn--primary">Read Article</Btn>
          </Link>
        </div>
      </FeaturedGrid>
    </Wrapper>
  );
};

FeaturedBlogCarouselItem.propTypes = {
  authorImage: PropTypes.object,
  authorName: PropTypes.string,
  className: PropTypes.string,
  body: PropTypes.string,
  eyelash: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string.isRequired,
  readLength: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
  title: PropTypes.string
};

export default FeaturedBlogCarouselItem;
