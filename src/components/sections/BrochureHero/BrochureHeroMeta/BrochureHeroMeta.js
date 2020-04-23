import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {collapseUp} from '#root/utils/responsive';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(auto-fill, ${100 / props.itemCount}%)`};

  ${collapseUp()} {
    grid-template-columns: ${props => `repeat(auto-fill, minmax(min-content, ${props.minItemWidth}))`};
  }
`;

const BrochureHeroMeta = ({children, minItemWidth, ...props}) => {
  const itemCount = Array.isArray(children) && children.length ? children.length : 1;

  return (
    <Wrapper {...props} itemCount={itemCount} minItemWidth={minItemWidth}>
      {children}
    </Wrapper>
  );
};

BrochureHeroMeta.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  minItemWidth: PropTypes.string
};

BrochureHeroMeta.defaultProps = {
  minItemWidth: '106px'
};

export default BrochureHeroMeta;
