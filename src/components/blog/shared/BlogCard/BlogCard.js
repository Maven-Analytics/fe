import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ImageContentful from '#root/components/imageContentful';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

import AuthorThumbnail from '../AuthorThumbnail';

const Card = styled.a`
  background: none;
  border: none;
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr;
  max-width: 265px;
  padding: 0;
  outline: none !important;
  transition: 0.4s box-shadow ease-in;
  width: 100%;

  &:not(.btn) {
    color: ${props => props.theme.nero};

    &:hover,
    &:focus,
    &:focus-within {
      box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.2);
      color: ${props => props.theme.nero};
      text-decoration: none;
    }
  }

  ${mediaBreakpointUp('md')} {
    grid-template-columns: 40% 60%;
    max-width: 564px;
  }
`;

const Content = styled.div`
  padding: 2rem 2.6rem 3rem 2.4rem;

  ${mediaBreakpointUp('md')} {
    padding: 2.2rem 3.8rem 3rem 4.6rem;
  }
`;

const Image = styled(ImageContentful)`
  height: 0;
  padding-top: 100%;
`;

const ImageWrap = styled.div``;

const Author = styled(AuthorThumbnail)`
  color: ${props => props.theme.darkGray};
  font-size: 1rem;

  > *:first-child {
    margin-right: ${spacingUnit.ss};
  }
`;

const Category = styled.p`
  color: ${props => props.theme.darkGray};
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 ${spacingUnit.ss};
  text-transform: uppercase;
`;

const Title = styled.h4`
  font-size: 2.2rem;
  font-weight: 900;
  margin: 0 0 ${spacingUnit.md};
`;

const BlogCard = ({authorImage, authorName, category, image, link, title}) => {
  return (
    <Link href={link}>
      <Card>
        <ImageWrap>
          <Image image={image} wrapStyle={{height: 0, paddingTop: '100%'}} style={{height: '100%', objectFit: 'cover'}} />
        </ImageWrap>
        <Content>
          <Category>{category}</Category>
          <Title>{title}</Title>
          <Author row image={authorImage} imageSize={29} name={authorName} />
        </Content>
      </Card>
    </Link>
  );
};

BlogCard.propTypes = {
  authorImage: PropTypes.object,
  authorName: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  title: PropTypes.string
};

export default BlogCard;
