import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BrochureHero from '#root/components/sections/BrochureHero';
import BrochureHeroContent from '#root/components/sections/BrochureHero/BrochureHeroContent';
import BrochureHeroMedia from '#root/components/sections/BrochureHero/BrochureHeroMedia';
import BrochureHeroMeta, {MetaItem, MetaItemIcons} from '#root/components/sections/BrochureHero/BrochureHeroMeta';
import {mediaBreakpointUp} from '#root/utils/responsive';
import Image from '#root/components/image';

const badgeSizeMobile = 6;
const badgeSizeTablet = 6;
const badgeSizeDesktop = 11;

const PathHeroBadge = styled(Image)`
  height: ${badgeSizeMobile}rem;
  left: 0;
  position: absolute;
  margin: 0 auto;
  right: 0;
  top: 0;
  width: ${badgeSizeMobile}rem;

  ${mediaBreakpointUp('md')} {
    height: ${badgeSizeTablet}rem;
    left: -1.2rem;
    margin: 0;
    width: ${badgeSizeTablet}rem;
  }

  ${mediaBreakpointUp('lg')} {
    height: ${badgeSizeDesktop}rem;
    left: -1.2rem;
    margin: 0;
    width: ${badgeSizeDesktop}rem;
  }
`;

const PathHeroContent = styled(BrochureHeroContent)`
  margin-top: 0.8rem;
  padding-top: ${badgeSizeMobile}rem;
  position: relative;
  text-align: center;

  ${mediaBreakpointUp('md')} {
    padding-left: ${badgeSizeTablet}rem;
    padding-top: 0;
    max-width: 600px;
    text-align: initial;
  }
  ${mediaBreakpointUp('lg')} {
    padding-left: ${badgeSizeDesktop}rem;
    margin-top: 1rem;
  }
  ${mediaBreakpointUp('xl')} {
    margin-top: 4rem;
  }

  > h1 {
    margin-bottom: 0.8rem;
    padding-bottom: 0;

    ${mediaBreakpointUp('md')} {
      margin-bottom: 0.3em;
      line-height: 1;
      padding-bottom: 0.3em;
    }

    &::after {
      content: none;

      ${mediaBreakpointUp('md')} {
        content: ' ';
      }
    }
  }
`;

const PathHeroMedia = styled(BrochureHeroMedia)`
  > div {
    height: auto;
    padding-bottom: 0;
    text-align: center;

    ${mediaBreakpointUp('md')} {
      text-align: left;
    }
  }
  img {
    margin: 0 auto;
    position: relative;
    max-width: 100%;
    width: 320px;

    ${mediaBreakpointUp('md')} {
      width: auto;
    }
  }
`;

const PathHeroMeta = styled(BrochureHeroMeta)`
  margin-top: 1.7rem;

  ${mediaBreakpointUp('lg')} {
    margin-top: 4.5rem;
  }
`;

const PathPageToolMetaItem = styled(MetaItem)`
  ${mediaBreakpointUp('md')} {
    position: relative;
  }

  > div {
    > span:first-child {
      display: block;
      min-width: 125px;
    }

    > span:nth-child(2) {
      display: block;
      position: relative;
      width: 100%;
    }
  }
`;

const ToolIcons = styled(MetaItemIcons)`
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  ${mediaBreakpointUp('md')} {
    margin: 0;
  }
`;

const PathDetailHero = ({badge, description, courseCount, hours, image, title, tools}) => {
  return (
    <BrochureHero
      backgroundProps={{strength: 0}}
      backgroundSrc="/static/img/grid-bg-dark.jpg"
      className="brochure-hero--path"
      columnClasses={['col-md-8 col-lg-7', 'col-md-4 col-lg-5']}
      contentLeft={
        <PathHeroContent eyelash="Learning Path" description={description} title={title}>
          <PathHeroBadge src={badge} />
          <PathHeroMeta>
            <MetaItem label="Courses">{courseCount}</MetaItem>
            <MetaItem label="Hours">{hours} hours</MetaItem>
            <PathPageToolMetaItem label="Tools">
              <ToolIcons icons={tools.map(t => t.toLowerCase().replace(' ', '-'))} />
            </PathPageToolMetaItem>
          </PathHeroMeta>
        </PathHeroContent>
      }
      contentRight={<PathHeroMedia image={image} />}
      showOverlay={false}
    />
  );
};

PathDetailHero.propTypes = {
  badge: PropTypes.string,
  description: PropTypes.string,
  courseCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.string,
  title: PropTypes.string,
  tools: PropTypes.arrayOf(PropTypes.string)
};

export default PathDetailHero;
