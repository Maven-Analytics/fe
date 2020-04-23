import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {MaIcon} from 'maven-ui';

import spacingUnit from '#root/utils/spacingUnit';
import Image from '#root/components/image';
import {collapseUp} from '#root/utils/responsive';
import {hexToRgb} from '#root/utils/colorHelpers';

const Img = styled(Image)`
  padding-bottom: 56.29%;
`;

const LaunchVideoBtn = styled.button`
  align-items: center;
  background-color: ${props => `rgba(${hexToRgb(props.theme.nero)}, 0.43)`};
  border: none;
  border-radius: 50%;
  color: #fff;
  display: flex;
  height: 60px;
  justify-content: center;
  font-size: 2rem;
  left: calc(50% - 30px);
  position: absolute;
  top: calc(50% - 30px);
  transition: background-color 0.2s ease-in-out;
  width: 60px;

  &:focus,
  &:hover {
    background-color: ${props => `rgba(${hexToRgb(props.theme.nero)}, 0.7)`};
    outline: none;
  }

  ${collapseUp()} {
    height: 80px;
    font-size: 3rem;
    left: calc(50% - 40px);
    top: calc(50% - 40px);
    width: 80px;
  }

  i {
    margin-left: 6px;
  }
`;

const Wrapper = styled.div`
  margin: ${spacingUnit.md} 0;
  position: relative;
`;

const WrapperOverflow = styled(Wrapper)`
  ${collapseUp()} {
    margin-left: 2vw;
    margin-top: -3.5rem;

    ${Img} {
      img {
        max-width: 135%;
      }
    }
  }
`;

const BrochureHeroMedia = ({children, image, imageProps, onVideoClick: handleVideoClick, overflow, ...props}) => {
  let El = Wrapper;

  if (overflow) {
    El = WrapperOverflow;
  }

  return (
    <El {...props}>
      {image ? <Img {...imageProps} src={image} /> : null}
      {handleVideoClick ? (
        <LaunchVideoBtn onClick={handleVideoClick} aria-label="Play Video">
          <MaIcon icon="play-triangle" />
        </LaunchVideoBtn>
      ) : null}
      {children}
    </El>
  );
};

BrochureHeroMedia.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  imageProps: PropTypes.object,
  onVideoClick: PropTypes.func,
  overflow: PropTypes.bool
};

BrochureHeroMedia.defaultProps = {
  imageProps: {}
};

export default BrochureHeroMedia;
