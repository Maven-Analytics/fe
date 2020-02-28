import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ImageContentful from '#root/components/imageContentful';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const Name = styled.span`
  text-transform: uppercase;

  span {
    font-weight: 400;
    margin-left: 0.2rem;
    padding-left: 0.2rem;
    text-transform: none;
  }

  ${props => {
    if (!props.row) {
      return `
        display: block;
        margin-top: 1rem;
        width: 100%;
      `;
    }
  }}
`;

const ImageWrap = styled.span`
  border-radius: 50%;
  background: ${props => props.theme.brandGradient};
  flex: 0 0 ${props => props.imageSize}px;
  height: ${props => props.imageSize}px;
  margin-right: ${spacingUnit.md};
  overflow: hidden;
  width: ${props => props.imageSize}px;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;

  ${mediaBreakpointUp('md')} {
    font-size: 1.2rem;
  }

  ${props => {
    if (props.row) {
      return `
        align-items: center;
        display: flex;
      `;
    }

    return `
      align-items: flex-start;
      display: flex;
      flex-direction: column;
    `;
  }}
`;

const AuthorThumbnail = ({className, extra, image, imageSize, name, row}) => {
  return (
    <Wrapper className={className} row={row}>
      <ImageWrap imageSize={imageSize}>
        <ImageContentful image={image} wrapStyle={{height: 0, paddingTop: '100%'}} style={{height: imageSize, width: imageSize}} />
      </ImageWrap>
      {name ? (
        <Name row={row}>
          {name} {extra ? extra : null}
        </Name>
      ) : null}
    </Wrapper>
  );
};

AuthorThumbnail.propTypes = {
  className: PropTypes.string,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  image: PropTypes.object,
  imageSize: PropTypes.number,
  row: PropTypes.bool
};

AuthorThumbnail.defaultProps = {
  image: {},
  imageSize: 40
};

export default AuthorThumbnail;
