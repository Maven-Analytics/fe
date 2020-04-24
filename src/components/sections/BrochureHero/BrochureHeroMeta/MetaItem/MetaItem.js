import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {collapseUp, mediaBreakpointUp} from '#root/utils/responsive';

const Label = styled.span`
  color: #bebebe;
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  white-space: nowrap;

  ${mediaBreakpointUp('lg')} {
    font-size: 1.3rem;
  }
`;

const Value = styled.span`
  display: inline-block;
  font-size: 1.8rem;
  font-weight: 900;

  ${mediaBreakpointUp('lg')} {
    font-size: 2.4rem;
    white-space: nowrap;
  }

  ${collapseUp()} {
    font-size: 2.4rem;
  }

  i {
    /* font-size: 1.5em; */
    /* padding-right: 1.5vw;
    padding-top: 5px; */
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 1.1rem 0.5rem 2.1rem;

  ${mediaBreakpointUp('sm')} {
    padding: 1.1rem 1.3rem 2.1rem;
  }

  ${mediaBreakpointUp('md')} {
    text-align: left;
  }

  ${mediaBreakpointUp('lg')} {
    padding: 2rem 3.9rem 3rem;
  }

  ${collapseUp()} {
    padding: 2rem 3.9rem 5rem;
  }

  &:not(:last-child) {
    border-right: 1px solid ${props => props.theme.shadyLady};
  }

  &:first-child {
    padding-left: 0;

    ${collapseUp()} {
      justify-content: flex-start;
    }
  }

  &:last-child {
    padding-right: 0;
  }
`;

const MetaItem = ({children, label, ...props}) => {
  return (
    <Wrapper {...props}>
      <div>
        <Label>{label}</Label>
        <Value>{children}</Value>
      </div>
    </Wrapper>
  );
};

MetaItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  label: PropTypes.string
};

export default MetaItem;
