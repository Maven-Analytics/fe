import {GradientText} from 'maven-ui';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Image from '#root/components/image';
import {Routes} from '#root/routes';
import btnFixed from '#root/utils/btnFixed';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const Background = styled.div`
  background: ${props => props.theme.brandGradient};
  height: 80%;
  left: 0;
  position: absolute;
  top: 10%;
  width: 150%;
  z-index: -1;

  ${mediaBreakpointUp('md')} {
    height: 50%;
    top: 25%;
    width: 100%;
  }
`;

const Box = styled.div`
  background-color: ${props => props.theme.nero};
  color: ${props => props.theme.veryLightGray};
  font-size: 1.4rem;
  order: 1;
  padding: ${spacingUnit.lmm} ${spacingUnit.l};
  margin: 0 0 ${spacingUnit.default};
  min-height: 376px;

  ${mediaBreakpointUp('md')} {
    font-size: 1.6rem;
  }

  ${mediaBreakpointUp('lg')} {
    height: 501px;
    font-size: 1.8rem;
    padding: 7rem 7.8rem 7rem 8.8rem;
    width: 470px;
  }
`;

const Btn = styled.button`
  ${btnFixed(155, 47, 19.5)};
  font-size: 0.7em;
  max-width: none;

  ${mediaBreakpointUp('md')} {
    ${btnFixed(170, 50, 19.5)};
  }

  &:hover,
  &:focus {
    color: #fff;
  }
`;

const Eyelash = styled(GradientText)`
  font-size: 0.7em;
  font-weight: 700;
  margin: 0 0 0.9rem;
  text-transform: uppercase;

  ${mediaBreakpointUp('md')} {
    margin: 0 0 1.2rem;
  }
`;

const Title = styled.h4`
  color: #fff;
  font-size: 2em;
  line-height: 1.07;
  margin: 0.9rem 0 ${spacingUnit.default};

  ${mediaBreakpointUp('md')} {
    margin: 1.2rem 0 1.3rem;
  }
`;

const Text = styled.p`
  margin: ${spacingUnit.default} 0 ${spacingUnit.md};

  ${mediaBreakpointUp('md')} {
    margin: 1.3rem 0 3.4rem;
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  max-width: 270px;

  ${mediaBreakpointUp('sm')} {
    max-width: 400px;
  }

  ${mediaBreakpointUp('md')} {
    display: grid;
    grid-column-gap: ${spacingUnit.default};
    grid-template-columns: 1fr 1fr;
    max-width: 90%;
  }
`;

const Img = styled(Image)`
  height: 0;
  order: 0;
  padding-top: 63.03%;

  ${mediaBreakpointUp('md')} {
    top: 50%;
    transform: translateY(-50%);
  }
`;

const ImgMobile = styled(Img)`
  display: block;

  ${mediaBreakpointUp('lg')} {
    display: none;
  }
`;

const ImgDesktop = styled(Img)`
  display: none;

  ${mediaBreakpointUp('lg')} {
    display: block;
  }
`;

const BlogCta = ({className}) => {
  return (
    <Wrapper className={className}>
      <Background />
      <Inner>
        <Box>
          <Eyelash>Personalized Survey</Eyelash>
          <Title>Looking To Find Your Perfect Learning Path?</Title>
          <Text>Take our 2-minute personalized match survey to find the right courses and path for your business intelligence goals!</Text>
          <Link href={Routes.WelcomeSurvey}>
            <Btn className="btn btn--primary">Find My Path</Btn>
          </Link>
        </Box>
        <ImgMobile src="/static/img/step1-mobile.png" />
        <ImgDesktop src="/static/img/step1.png" />
      </Inner>
    </Wrapper>
  );
};

BlogCta.propTypes = {
  className: PropTypes.string
};

export default BlogCta;
