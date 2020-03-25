import {GradientText} from 'maven-ui';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const Wrapper = styled.div``;

const Eyelash = styled(GradientText)`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1.2;
  margin: 0 0 0.6rem;
  text-transform: uppercase;

  ${mediaBreakpointUp('lg')} {
    font-size: 1.2rem;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.08;
  margin: 0 0 ${spacingUnit.md};

  ${mediaBreakpointUp('lg')} {
    font-size: 5.5rem;
    margin: 0 0 ${spacingUnit.mdl};
  }

  &::after {
    background: ${props => props.theme.brandGradient};
    content: ' ';
    display: block;
    height: 2px;
    margin-top: 9px;
    width: 54px;

    ${mediaBreakpointUp('lg')} {
      margin-top: 19px;
      width: 145px;
    }
  }
`;

const BlogMeta = ({className, eyelash, title}) => {
  return (
    <Wrapper className={className}>
      <Eyelash as="span">{eyelash}</Eyelash>
      <Title>{title}</Title>
    </Wrapper>
  );
};

BlogMeta.propTypes = {
  className: PropTypes.string,
  eyelash: PropTypes.string,
  title: PropTypes.string
};

export default BlogMeta;
