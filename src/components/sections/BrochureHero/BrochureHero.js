import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {collapseUp} from '#root/utils/responsive';
import ParallaxBg from '#root/components/parallaxBg';
import {headerHeightDesktop} from '#root/utils/styles';

const Background = styled(ParallaxBg)`
  background-color: ${props => props.theme.nero};
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;

  img {
    object-fit: cover;
  }

  *[class^='react-parallax'] {
    height: 100%;
    width: 100%;
  }
`;

const BackgroundOverlay = styled.div`
  background-color: ${props => props.theme.nero};
  height: 100%;
  opacity: 0.9;
  position: absolute;
  width: 100%;
  z-index: -1;
`;

const BrochureHeroInner = styled.div`
  padding: 5vh 0 10vh;

  ${collapseUp()} {
    padding: ${() => `calc(5vh + ${headerHeightDesktop}px) 0 10vh`};
  }
`;

const BrochureHeroWrap = styled.div`
  color: #fff;
  font-size: 1.4rem;
  position: relative;

  ${collapseUp()} {
    font-size: 1.8rem;
  }

  &.brochure-hero--small {
    ${BrochureHeroInner} {
      padding: 3vh 0;

      ${collapseUp()} {
        padding: ${() => `calc(1vh + ${headerHeightDesktop}px) 0 5vh`};
      }
    }
  }

  &.brochure-hero--medium {
    ${BrochureHeroInner} {
      padding: 5vh 0;

      ${collapseUp()} {
        padding: ${() => `calc(8vh + ${headerHeightDesktop}px) 0 10vh`};
      }
    }
  }

  &.brochure-hero--large {
    ${BrochureHeroInner} {
      padding: 5vh 0 10vh;

      ${collapseUp()} {
        padding: ${() => `calc(10vh + ${headerHeightDesktop}px) 0 20vh`};
      }
    }
  }
`;

const BrochureHero = ({
  backgroundProps,
  backgroundSources,
  backgroundSrc,
  children,
  className,
  columnClasses,
  contentLeft,
  contentRight,
  title,
  ...props
}) => {
  return (
    <BrochureHeroWrap className={className} {...props}>
      <Background {...backgroundProps} sources={backgroundSources} src={backgroundSrc} />
      <BackgroundOverlay />
      <BrochureHeroInner>
        <div className="container container--lg">
          <div className="row">
            <div className={columnClasses[0]}>{contentLeft}</div>
            <div className={columnClasses[1]}>{contentRight}</div>
          </div>
          {children}
        </div>
      </BrochureHeroInner>
    </BrochureHeroWrap>
  );
};

BrochureHero.propTypes = {
  backgroundProps: PropTypes.object,
  backgroundSources: PropTypes.array,
  backgroundSrc: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  columnClasses: PropTypes.arrayOf(PropTypes.string),
  contentLeft: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  contentRight: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string
};

BrochureHero.defaultProps = {
  backgroundProps: {},
  columnClasses: ['col-md-6 col-lg-7', 'col-md-6 col-lg-5']
};

export default BrochureHero;
