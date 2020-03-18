import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Subscribe from '#root/components/subscribe';
import {gridBreakpoints, mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const ContentWrap = styled.div``;

const Form = styled(Subscribe)`
  padding: 20px 0;
  position: relative;
  width: 100%;

  .form-group {
    display: block;
    overflow: visible;

    ${mediaBreakpointUp('lg')} {
      display: flex;
      flex-wrap: wrap;
      height: 45px;
    }
  }

  label {
    display: none;
  }

  input {
    background-color: #fff;
    border: none;
    color: ${props => props.theme.charcoal};
    border-radius: 25px;
    flex: 1 0 75%;
    max-width: 265px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${spacingUnit.default};

    &::placeholder {
      color: ${props => props.theme.charcoal};
      opacity: 0.4;
    }

    ${mediaBreakpointUp('sm')} {
      max-width: 400px;
    }

    ${mediaBreakpointUp('md')} {
      margin-bottom: 1rem;
      margin-right: ${spacingUnit.default};
      max-width: none;
    }
  }

  button {
    align-items: center;
    color: ${props => props.theme.nero};
    border: 1px solid ${props => props.theme.nero};
    display: inline-flex;
    font-size: 1.1rem;
    justify-content: center;
    min-width: 0;
    padding: 0;

    &::before,
    &::after {
      content: none;
    }

    &:hover {
      border: 1px solid ${props => props.theme.nero};
    }

    ${mediaBreakpointUp('md')} {
      margin-bottom: 1rem;
    }
  }

  .form-text {
    bottom: -5px;
    height: 20px;
    left: 0;
    position: absolute;
    width: 100%;
  }
`;

const FormWrap = styled.div`
  ${mediaBreakpointUp('md')} {
    align-items: center;
    display: flex;
    width: 100%;
  }
`;

const Text = styled.p`
  margin: ${spacingUnit.ss} 0;

  ${mediaBreakpointUp('md')} {
    margin: 0;
  }
`;

const Title = styled.h5`
  color: ${props => props.theme.nero};
  font-size: 1.875em;
  font-weight: 900;
  letter-spacing: -0.8px;
  line-height: 1.17;
  margin: 0 0 ${spacingUnit.ss};

  ${mediaBreakpointUp('md')} {
    margin: 0;
  }

  ${mediaBreakpointUp('lg')} {
    font-size: 2.81em;
  }
`;

const Wrapper = styled.div`
  background-color: rgba(216, 216, 216, 0.26);
  color: ${props => props.theme.charcoal};
  font-size: 1.6rem;
  margin-left: auto;
  margin-right: auto;
  max-width: ${gridBreakpoints.xl}px;
  padding: ${spacingUnit.lmm} 2.7rem;
  text-align: center;

  ${mediaBreakpointUp('md')} {
    display: grid;
    grid-column-gap: 3.7rem;
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }

  ${mediaBreakpointUp('lg')} {
    padding: ${spacingUnit.lmm} 6.3rem ${spacingUnit.xlx};
  }
`;

const BlogSubscribe = ({className}) => {
  return (
    <Wrapper className={className}>
      <ContentWrap>
        <Title>Subscribe</Title>
        <Text>To get analytics tips & tricks delivered directy to your inbox.</Text>
      </ContentWrap>
      <FormWrap>
        <Form placeholder="email address" />
      </FormWrap>
    </Wrapper>
  );
};

BlogSubscribe.propTypes = {
  className: PropTypes.string
};

export default BlogSubscribe;
