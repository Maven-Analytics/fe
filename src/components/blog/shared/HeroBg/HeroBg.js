import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {mediaBreakpointUp} from '#root/utils/responsive';

const BackgroundEl = styled.div`
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Background = styled.div`
  background-color: ${props => props.theme.nero};
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const BackgroundLight = styled(BackgroundEl)`
  background-color: #fff;
  height: 100%;
`;

const BackgroundDark = styled(BackgroundEl)`
  background-color: ${props => props.theme.nero};
  height: 100%;

  ${mediaBreakpointUp('lg')} {
    height: calc(100% - 60px);
  }
`;

const BackgroundImage = styled.div`
  background-image: url('/static/img/hexagon-grid-dark.png');
  background-size: cover;
  height: 100%;
  opacity: 0.1;
`;

const HeroBg = ({className}) => {
  return (
    <Background className={className}>
      <BackgroundLight />
      <BackgroundDark>
        <BackgroundImage />
      </BackgroundDark>
    </Background>
  );
};

HeroBg.propTypes = {
  className: PropTypes.string
};

export default HeroBg;
