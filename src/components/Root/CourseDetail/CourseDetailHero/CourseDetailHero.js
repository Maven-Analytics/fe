import {Map} from 'immutable';
import {List} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import BrochureHero from '#root/components/sections/BrochureHero';
import BrochureHeroContent from '#root/components/sections/BrochureHero/BrochureHeroContent';
import BrochureHeroMedia from '#root/components/sections/BrochureHero/BrochureHeroMedia';
import BrochureHeroMeta, {MetaItem} from '#root/components/sections/BrochureHero/BrochureHeroMeta';
import {clickAction} from '#root/utils/componentHelpers';
import contentfulImageSrc from '#root/utils/contentfulImageSrc';
import {mediaBreakpointUp, collapseUp} from '#root/utils/responsive';
import DifficultyMeter from '#root/components/difficultyMeter';
import Image from '#root/components/image';
import spacingUnit from '#root/utils/spacingUnit';

const aThird = 100 / 3;

const CourseHeroMetaItem = styled(MetaItem)`
  display: block;

  &:not(:last-child) {
    border-right: 1px solid ${props => props.theme.shadyLady};
  }

  &:nth-child(3) {
    border-right: none;
  }

  ${collapseUp()} {
    max-height: 190px;
    padding-left: 0;
    padding-right: 0;

    &:nth-child(3) {
      border-right: 1px solid ${props => props.theme.shadyLady};
    }
  }
`;

const CourseHeroMetaItemBadges = styled(CourseHeroMetaItem)`
  > div {
    > span:first-child {
      ${mediaBreakpointUp('lg')} {
        display: block;
        min-width: 5vw;
      }
    }

    > span:nth-child(2) {
      ${mediaBreakpointUp('lg')} {
        display: block;
        position: relative;
        width: 100%;
      }
    }
  }
`;

const CourseHeroMetaWrapper = styled(BrochureHeroMeta)`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: ${() => `repeat(3, ${aThird}%)`};
  grid-template-rows: 1fr;
  margin: ${spacingUnit.default} 0 0;

  ${collapseUp()} {
    grid-column-gap: 2.9rem;
    grid-template-columns: auto auto auto auto auto auto;
    margin: 3.5rem 0 0;
  }
`;

const HeroBadge = styled(Image)`
  display: inline-block;
  height: 50px;
  width: 50px;

  ${mediaBreakpointUp('md')} {
    height: 70px;
    width: 70px;
  }

  ${mediaBreakpointUp('lg')} {
    height: 5vw;
    max-height: 80px;
    max-width: 80px;
    width: 5vw;
  }
`;

const HeroBadges = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.itemCount > 1 ? '1fr 1fr' : '1fr')};
  grid-row-gap: 0.5rem;

  ${mediaBreakpointUp('lg')} {
    grid-row-gap: 1rem;
    left: -12px;
    position: absolute;
    top: -5px;
    width: 100%;
  }
`;

const HeroDifficultyMeter = styled(DifficultyMeter)`
  .graphic {
    white-space: nowrap;

    span {
      width: 8px;

      ${mediaBreakpointUp('md')} {
        width: 10.1px;
      }

      &.active {
        background: ${props => props.theme.brandGradient};
      }
    }
  }
`;

const HeroPill = styled.div`
  border: 1px solid ${props => props.theme.shadyLady};
  border-radius: 21.5px;
  color: #fff;
  display: inline-block;
  font-size: 1.2rem;
  margin-bottom: 0.7rem;
  margin-right: 0.7rem;
  padding: 0.5rem 1rem;

  ${mediaBreakpointUp('md')} {
    font-size: 1.6rem;
    height: 43px;
    padding: 1rem 1.9rem;
    white-space: nowrap;
  }
`;

const HeroPills = styled.div`
  /* display: flex;
  flex-flow: row wrap;

  > div {
    flex: 1;
  } */
`;

const CourseDetailHero = ({course, actions, paths}) => {
  return (
    <BrochureHero
      backgroundSrc="/static/img/grid-bg-dark.jpg"
      columnClasses={['col-md-7', 'col-md-5']}
      contentLeft={<BrochureHeroContent eyelash="Self-Paced Course" description={course.get('descriptionPreview')} title={course.get('title')} />}
      contentRight={
        <BrochureHeroMedia
          image={contentfulImageSrc(course.get('thumbnail') && course.get('thumbnail').toJS())}
          onVideoClick={clickAction(actions.modalOpen, 'video', {video: course.get('video')})}
        />
      }
      showOverlay={false}
    >
      <CourseHeroMetaWrapper>
        <CourseHeroMetaItem label="Course Hours">{course.get('length')} hours</CourseHeroMetaItem>
        <CourseHeroMetaItem label="Skills Learned">
          <HeroPills>
            {course.get('skills').map((skill, index) => (
              <div key={index}>
                <HeroPill>{skill}</HeroPill>
              </div>
            ))}
          </HeroPills>
        </CourseHeroMetaItem>
        <CourseHeroMetaItem label="Tools">
          <HeroPills>
            {course.get('tools').map((tool, index) => (
              <div key={index}>
                <HeroPill>{tool}</HeroPill>
              </div>
            ))}
          </HeroPills>
        </CourseHeroMetaItem>
        <CourseHeroMetaItem label="Difficulty">
          <HeroDifficultyMeter difficulty={course.get('difficulty')} startingHeight={14} diff={6} />
        </CourseHeroMetaItem>
        <CourseHeroMetaItemBadges label="Credentials">
          <HeroBadges itemCount={1}>
            <HeroBadge src={contentfulImageSrc(course.get('badge') && course.get('badge').toJS())} />
          </HeroBadges>
        </CourseHeroMetaItemBadges>
        <CourseHeroMetaItemBadges label="Paths">
          <HeroBadges itemCount={paths && paths.count()}>
            {paths &&
              paths.map((path, index) => {
                return <HeroBadge key={index} src={contentfulImageSrc(path.get('badge') && path.get('badge').toJS())} />;
              })}
          </HeroBadges>
        </CourseHeroMetaItemBadges>
      </CourseHeroMetaWrapper>
    </BrochureHero>
  );
};

CourseDetailHero.propTypes = {
  course: ImmutablePropTypes.map.isRequired,
  paths: ImmutablePropTypes.list.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

CourseDetailHero.defaultProps = {
  course: Map(),
  paths: List()
};

export default CourseDetailHero;
