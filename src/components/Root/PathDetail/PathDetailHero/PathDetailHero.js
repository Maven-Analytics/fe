import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BrochureHero from '#root/components/sections/BrochureHero';
import BrochureHeroContent from '#root/components/sections/BrochureHero/BrochureHeroContent';
import BrochureHeroMedia from '#root/components/sections/BrochureHero/BrochureHeroMedia';
import BrochureHeroMeta, {MetaItem, MetaItemIcons} from '#root/components/sections/BrochureHero/BrochureHeroMeta';
import {mediaBreakpointUp} from '#root/utils/responsive';

const ToolsMetaIcons = styled(MetaItemIcons)`
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

const PathHeroContent = styled(BrochureHeroContent)`
  ${mediaBreakpointUp('md')} {
    max-width: 600px;
  }
  ${mediaBreakpointUp('lg')} {
    margin-top: 1rem;
  }
  ${mediaBreakpointUp('xl')} {
    margin-top: 4rem;
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

const PathDetailHero = ({description, courseCount, hours, image, title, tools}) => {
  return (
    <BrochureHero
      backgroundProps={{strength: 0}}
      backgroundSrc="/static/img/hexagon-grid-dark.png"
      className="brochure-hero--small"
      columnClasses={['col-md-7', 'col-md-5']}
      contentLeft={
        <PathHeroContent eyelash="Learning Paths" description={description} title={title}>
          <PathHeroMeta>
            <MetaItem label="Courses">{courseCount}</MetaItem>
            <MetaItem label="Hours">{hours} hours</MetaItem>
            <PathPageToolMetaItem label="Tools">
              <ToolsMetaIcons icons={tools.map(t => t.toLowerCase().replace(' ', '-'))} />
            </PathPageToolMetaItem>
          </PathHeroMeta>
        </PathHeroContent>
      }
      contentRight={<PathHeroMedia image={image} />}
    />
  );
};

PathDetailHero.propTypes = {
  description: PropTypes.string,
  courseCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.string,
  title: PropTypes.string,
  tools: PropTypes.arrayOf(PropTypes.string)
};

export default PathDetailHero;
