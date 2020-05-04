import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ImageContentful from '#root/components/imageContentful';
import {mediaBreakpointUp} from '#root/utils/responsive';

const Image = styled(ImageContentful)`
  height: 0;
  padding-top: 100%;

  ${mediaBreakpointUp('lg')} {
    box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrap = styled.div`

    margin: 0 auto;
    max-width: 90%;
  }
`;

const Wrapper = styled.div``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 21px;

  ${mediaBreakpointUp('md')} {
    grid-column-gap: 67px;
    grid-template-columns: 1fr 1fr;
  }
`;

const Col = styled.div``;

const Left = styled(Col)``;

const Right = styled(Col)``;

const FeaturedGrid = ({children, className, image}) => {
  return (
    <Wrapper className={className}>
      <Grid>
        <Left>
          <ImageWrap>
            <Image image={image} wrapStyle={{height: 0, paddingTop: '100%'}} style={{height: '100%', objectFit: 'cover'}} />
          </ImageWrap>
        </Left>
        <Right>{children}</Right>
      </Grid>
    </Wrapper>
  );
};

FeaturedGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  image: PropTypes.object
};

export default FeaturedGrid;
