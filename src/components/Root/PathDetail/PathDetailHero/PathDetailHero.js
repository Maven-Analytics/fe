import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BrochureHero from '#root/components/sections/BrochureHero';
import BrochureHeroContent from '#root/components/sections/BrochureHero/BrochureHeroContent';
import BrochureHeroMedia from '#root/components/sections/BrochureHero/BrochureHeroMedia';
import BrochureHeroMeta, {MetaItem, MetaItemIcons} from '#root/components/sections/BrochureHero/BrochureHeroMeta';
import {mediaBreakpointUp} from '#root/utils/responsive';

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
  ${mediaBreakpointUp('md')} {
    max-width: 600px;
  }
  ${mediaBreakpointUp('lg')} {
    margin-top: 6rem;
  }
`;

const PathHeroMedia = styled(BrochureHeroMedia)`
  > div {
    padding-bottom: 86%;

    ${mediaBreakpointUp('md')} {
      padding-bottom: 110%;
    }
  }
  img {
    margin: 0 auto;
    max-width: 320px;

    ${mediaBreakpointUp('md')} {
      max-width: 100%;
      width: 470px;
    }
  }
`;

const PathDetailHero = ({description, courseCount, hours, image, title, tools}) => {
  tools = [...tools.filter((t, i) => i < tools.length - 1)];

  return (
    <BrochureHero
      backgroundSrc="/static/img/hexagon-grid-dark.png"
      className="brochure-hero--small"
      columnClasses={['col-md-7', 'col-md-5']}
      contentLeft={
        <PathHeroContent eyelash="Learning Paths" description={description} title={title}>
          <BrochureHeroMeta>
            <MetaItem label="Courses">{courseCount}</MetaItem>
            <MetaItem label="Hours">{hours} hours</MetaItem>
            <PathPageToolMetaItem label="Tools">
              <ToolsMetaIcons icons={tools.map(t => t.toLowerCase().replace(' ', '-'))} />
            </PathPageToolMetaItem>
          </BrochureHeroMeta>
        </PathHeroContent>
      }
      contentRight={<PathHeroMedia image={image} imageProps={{style: {width: 470}}} />}
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
