import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {MaIcon} from 'maven-ui';
import {mediaBreakpointUp} from '#root/utils/responsive';

const Icon = styled(MaIcon)`
  display: flex;
  font-size: 2rem;

  ${mediaBreakpointUp('md')} {
    font-size: 3.8rem;
  }
`;

const IconWrap = styled.div`
  ${Icon} {
    display: block;
    flex: 1 1 auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 50px;

  ${mediaBreakpointUp('md')} {
    max-width: none;
  }

  ${IconWrap} {
    display: block;
    justify-content: center;
    padding: 0.8rem 0.4rem;
    text-align: center;
    width: 50%;

    ${mediaBreakpointUp('md')} {
      padding: 0.8rem;
    }

    &:nth-child(odd):last-child {
      flex: ${props => (props.itemCount % 2 === 0 ? 'inherit' : '0 0 100%')};
    }
  }
`;

const MetaItemIcons = ({icons, ...props}) => {
  const iconCount = Array.isArray(icons) ? icons.length : 1;

  return (
    <Wrapper {...props} iconCount={iconCount} icons={icons}>
      {icons &&
        icons.map((icon, index) => (
          <IconWrap key={index}>
            <Icon icon={icon} />
          </IconWrap>
        ))}
    </Wrapper>
  );
};

MetaItemIcons.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string)
};

export default MetaItemIcons;
