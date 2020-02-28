import {Loader} from 'maven-ui';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

import BlogCta from '../../shared/BlogCta';
import BlogSubscribe from '../../shared/BlogSubscribe';
import FeedGrid from './FeedGrid';

const Wrapper = styled.div``;

const Cta = styled(BlogCta)`
  margin: ${spacingUnit.xll} 0;

  ${mediaBreakpointUp('md')} {
    margin: ${spacingUnit.xxml} 0;
  }
`;

const Grid = styled(FeedGrid)`
  margin: ${spacingUnit.md} 0 ${spacingUnit.xlx};

  ${mediaBreakpointUp('md')} {
    margin: ${spacingUnit.l} 0 ${spacingUnit.xlx};
  }
`;

const LoadMore = styled.div`
  text-align: center;

  button {
    font-size: 1.1rem;
    font-weight: 700;
    height: 40px;
    position: relative;
  }
`;

const Subscribe = styled(BlogSubscribe)`
  margin: ${spacingUnit.xlx} auto ${spacingUnit.xl};

  ${mediaBreakpointUp('md')} {
    margin: ${spacingUnit.xxml} auto ${spacingUnit.xxml};
  }
`;

const BlogFeed = ({blogs, hasMore, loading, onLoadMore}) => {
  const first6 = blogs.slice(0, 6);
  const other = blogs.slice(6);

  const btn = (
    <LoadMore>
      <button className="btn btn--default" disabled={loading} onClick={onLoadMore}>
        {loading ? <Loader id="blogLoadMoreBtn" colors={['#252525', '#000']} height={30} loading={loading} width={30} /> : 'Load more articles'}
      </button>
    </LoadMore>
  );

  return (
    <Wrapper>
      {loading ? <Loader align="top-center" loading={loading} position="relative" /> : null}
      <div className="container container--lg">
        <Grid blogs={first6} />
        {hasMore && (!other || !other.length) ? btn : null}
      </div>
      <Cta />
      {other && other.length ? (
        <div className="container container--lg">
          <Grid blogs={other} />
          {hasMore ? btn : null}
        </div>
      ) : null}
      <Subscribe />
    </Wrapper>
  );
};

BlogFeed.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object),
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  onLoadMore: PropTypes.func
};

BlogFeed.defaultProps = {
  blogs: [],
  onLoadMore: () => {}
};

export default BlogFeed;
