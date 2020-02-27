import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ImageContentful from '#root/components/imageContentful';
import {mediaBreakpointUp} from '#root/utils/responsive';

import AuthorThumbnail from '../AuthorThumbnail';

const Card = styled.button`
  display: grid;
  grid-template-columns: 1fr;

  ${mediaBreakpointUp('md')} {
    grid-template-columns: 40% 60%;
  }
`;

const Content = styled.div``;

const Image = styled(ImageContentful)`
  height: 0;
  padding-top: 100%;
`;

const ImageWrap = styled.div``;

const Category = styled.p``;

const Title = styled.h4``;

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
          <AuthorThumbnail image={authorImage} name={authorName} />
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
