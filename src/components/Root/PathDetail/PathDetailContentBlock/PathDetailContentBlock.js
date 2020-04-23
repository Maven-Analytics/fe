import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Markdown from '#root/components/markdown';
import PathDetailContainer from '../PathDetailContainer';

const Wrapper = styled(PathDetailContainer)``;

const PathDetailContentBlock = ({children, title, ...props}) => {
  return (
    <Wrapper {...props}>
      {title ? <h4>{title}</h4> : null}
      {typeof children === 'string' ? <Markdown content={children} /> : children}
    </Wrapper>
  );
};

PathDetailContentBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  title: PropTypes.string
};

export default PathDetailContentBlock;
