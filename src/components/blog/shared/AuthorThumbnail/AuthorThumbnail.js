import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ImageContentful from '#root/components/imageContentful';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

const Name = styled.span`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;

  ${mediaBreakpointUp('md')} {
    font-size: 1.2rem;
  }

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
        margin-top: 1.2rem;
        width: 100%;
      `;
    }
  }}
`;

const ImageWrap = styled.span`
  border-radius: 50%;
  background: ${props => props.theme.brandGradient};
  height: ${props => props.imageSize}px;
  margin-right: ${spacingUnit.md};
  overflow: hidden;
  width: ${props => props.imageSize}px;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;

  ${props => {
    if (props.row) {
      return `
        align-itemc: center;
        display: flex;
      `;
    }

    return `
      display: flex;
      flex-direction: column;
    `;
  }}
`;

const AuthorThumbnail = ({className, extra, image, imageSize, name, row}) => {
  return (
    <Wrapper className={className} row={row}>
      <ImageWrap imageSize={imageSize}>
        <ImageContentful image={image} wrapStyle={{height: 0, paddingTop: '100%'}} style={{height: 40, width: 40}} />
      </ImageWrap>
      {name ? (
        <Name row={row}>
          {name}{' '}
          {extra ? (
            <span>
              /<span>{extra}</span>
            </span>
          ) : null}
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
