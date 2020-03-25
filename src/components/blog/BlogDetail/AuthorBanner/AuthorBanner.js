import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageContentful from '#root/components/imageContentful';
import {mediaBreakpointUp} from '#root/utils/responsive';
import Markdown from '#root/components/markdown';

const Description = styled(Markdown)`
  margin: 2rem 0 0;

  ${mediaBreakpointUp('md')} {
    margin: 0.2rem 0 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

const DescriptionDesktop = styled(Description)`
  display: none;

  ${mediaBreakpointUp('md')} {
    display: block;
  }
`;

const DescriptionMobile = styled(Description)`
  display: block;

  ${mediaBreakpointUp('md')} {
    display: none;
  }
`;

const Eyelash = styled.p`
  font-size: 0.85em;
  margin: 0 0 0.2rem;
`;

const Header = styled.div`
  align-items: center;
  display: flex;

  ${mediaBreakpointUp('md')} {
    align-items: flex-start;
  }
`;

const HeaderContent = styled.div``;

const Name = styled.p`
  color: ${props => props.theme.nero};
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
`;

const Thumbnail = styled(ImageContentful)`
  border-radius: 50%;
  overflow: hidden;
  padding-bottom: 100%;
`;

const ThumbnailWrap = styled.div`
  flex: 0 0 80px;
  margin-right: 2.2rem;
`;

const Wrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.veryLightGray3};
  border-top: 1px solid ${props => props.theme.veryLightGray3};
  color: ${props => props.theme.gray};
  font-size: 1.4rem;
  padding: 3.3rem 0 3rem;
`;

const AuthorBanner = ({className, description, image, name}) => {
  return (
    <Wrapper className={className}>
      <Header>
        <ThumbnailWrap>
          <Thumbnail circle height={80} image={image} width={80} />
        </ThumbnailWrap>
        <HeaderContent>
          <Eyelash>Author</Eyelash>
          <Name>{name}</Name>
          <DescriptionDesktop content={description} />
        </HeaderContent>
      </Header>
      <DescriptionMobile content={description} />
    </Wrapper>
  );
};

AuthorBanner.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  name: PropTypes.string
};

export default AuthorBanner;
