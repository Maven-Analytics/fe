import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const BlogCta = ({className}) => {
  return <Wrapper className={className}>blog cta</Wrapper>;
};

BlogCta.propTypes = {
  className: PropTypes.string
};

export default BlogCta;
