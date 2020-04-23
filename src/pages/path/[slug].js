import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import gql from 'graphql-tag';
import NotFoundPage from '../404';
import {fromJS} from 'immutable';
import Head from '#root/components/head';
import BrochureHero from '#root/components/sections/BrochureHero';
import BrochureHeroContent from '#root/components/sections/BrochureHero/BrochureHeroContent';
import BrochureHeroMedia from '#root/components/sections/BrochureHero/BrochureHeroMedia';
import BrochureHeroMeta, {MetaItem, MetaItemIcons} from '#root/components/sections/BrochureHero/BrochureHeroMeta';
import CtaSurvey from '#root/components/sections/CtaSurvey';
import {mediaBreakpointUp} from '#root/utils/responsive';

const PLACEHOLDER_ILLUSTRATION = '/static/img/path-image-placeholder.png';

const PathPageWrap = styled.div``;

const pathQuery = gql`
  query PathBySlug($slug: String!) {
    path(slug: $slug) {
      id
      cardDescription
      courses {
        id
      }
      hours
      meta {
        id
        description
        image {
          id
          file {
            url
          }
        }
        keywords
        title
      }
      title
      tools
    }
  }
`;

const ToolsMetaIcons = styled(MetaItemIcons)`
  ${mediaBreakpointUp('md')} {
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const PathPageToolMetaItem = styled(MetaItem)`
  ${mediaBreakpointUp('md')} {
    position: relative;
  }

  > div {
    > span:first-child {
      ${mediaBreakpointUp('md')} {
        display: block;
        min-width: 125px;
      }
    }

    > span:nth-child(2) {
      ${mediaBreakpointUp('md')} {
        display: block;
        position: relative;
        width: 100%;
      }
    }
  }
`;

const PathHeroContent = styled(BrochureHeroContent)`
  ${mediaBreakpointUp('lg')} {
    max-width: 540px;
  }
`;

const PathPage = ({errorCode, path: {cardDescription, courses, hours, meta, title, tools}}) => {
  if (errorCode === 404) {
    return <NotFoundPage statusCode={errorCode} />;
  }

  tools = [...tools.filter((t, i) => i < tools.length - 1)];

  return (
    <PathPageWrap>
      <Head meta={fromJS(meta)} />

      <BrochureHero
        backgroundSrc="/static/img/hexagon-grid-dark.png"
        columnClasses={['col-lg-7', 'col-lg-5']}
        contentLeft={
          <PathHeroContent eyelash="Learning Paths" description={cardDescription} title={title}>
            <BrochureHeroMeta>
              <MetaItem label="Courses">{courses.length}</MetaItem>
              <MetaItem label="Hours">{hours} hours</MetaItem>
              <PathPageToolMetaItem label="Tools">
                <ToolsMetaIcons icons={tools.map(t => t.toLowerCase().replace(' ', '-'))} />
              </PathPageToolMetaItem>
            </BrochureHeroMeta>
          </PathHeroContent>
        }
        contentRight={<BrochureHeroMedia image={PLACEHOLDER_ILLUSTRATION} imageProps={{wrapStyle: {paddingBottom: '100%'}}} />}
      />
      <CtaSurvey />
    </PathPageWrap>
  );
};

PathPage.propTypes = {
  errorCode: PropTypes.number,
  path: PropTypes.object
};

PathPage.getInitialProps = async ({apolloClient, query: {slug}}) => {
  try {
    const {
      data: {path}
    } = await apolloClient.query({
      query: pathQuery,
      variables: {slug}
    });

    return {path};
  } catch {
    return {
      errorCode: 404
    };
  }
};

export default PathPage;
