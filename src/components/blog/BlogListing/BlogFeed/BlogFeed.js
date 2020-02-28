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

const Subscribe = styled(BlogSubscribe)`
  margin: ${spacingUnit.xlx} auto ${spacingUnit.xl};

  ${mediaBreakpointUp('md')} {
    margin: ${spacingUnit.xxml} auto ${spacingUnit.xxml};
  }
`;

const BlogFeed = ({blogs, loading}) => {
  const first6 = blogs.slice(0, 6);
  const other = blogs.slice(6);

  return (
    <Wrapper>
      {loading ? <Loader align="top-center" loading={loading} position="relative" /> : null}
      <div className="container container--lg">
        <Grid blogs={first6} />
      </div>
      <Cta />
      {other && other.length ? (
        <div className="container container--lg">
          <Grid blogs={other} />
        </div>
      ) : null}
      <Subscribe />
    </Wrapper>
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
