import {GradientText, MaIcon} from 'maven-ui';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ReadTime from '#root/components/shared/ReadTime/ReadTime';
import {Routes} from '#root/routes';
import {formatDatePretty} from '#root/utils/componentHelpers';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';
import {headerHeightDesktop} from '#root/utils/styles';

import AuthorThumbnail from '../../shared/AuthorThumbnail';
import BlogMeta from '../../shared/BlogMeta';
import FeaturedGrid from '../../shared/FeaturedGrid';
import HeroBg from '../../shared/HeroBg';

const Author = styled(AuthorThumbnail)`
  color: ${props => props.theme.charcole};
  position: absolute;
  top: calc(100% - 20px);

  ${mediaBreakpointUp('md')} {
    left: 0;
    top: calc(100% - 80px);
  }
`;

const Btn = styled.button`
  align-items: center;
  border: 1px solid #fff;
  color: #fff;
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  height: 30px;
  justify-content: center;
  margin-left: auto;
  margin-top: -10px;
  padding: 0.5rem;
  text-transform: none;
  width: 134px;

  &:hover,
  &:focus {
    border: 1px solid #fff;
    color: #fff;
  }

  i {
    margin-right: 10px;
  }

  ${mediaBreakpointUp('md')} {
    bottom: 95px;
    margin-top: 0;
    position: absolute;
    right: 0;
  }

  ${mediaBreakpointUp('lg')} {
    height: 40px;
    font-size: 1.1rem;
    width: 165px;
  }
`;

const Content = styled.div`
  ${mediaBreakpointUp('md')} {
    height: 100%;
    margin: 0 auto;
    max-width: 85%;
    padding-bottom: 40px;
    position: relative;
  }

  ${mediaBreakpointUp('lg')} {
    padding-bottom: 140px;
  }
`;

const Grid = styled(FeaturedGrid)`
  > div {
    ${mediaBreakpointUp('lg')} {
      grid-template-columns: 470px auto;
    }
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  max-width: 265px;
  padding: 10px 0 ${spacingUnit.l};

  ${mediaBreakpointUp('sm')} {
    max-width: 400px;
  }

  ${mediaBreakpointUp('md')} {
    max-width: none;
    padding: ${spacingUnit.l} 0 0;
  }

  ${mediaBreakpointUp('lg')} {
    padding: ${headerHeightDesktop + 50}px 0 0;
  }
`;

const Meta = styled(BlogMeta)`
  ${mediaBreakpointUp('md')} {
    padding-top: ${spacingUnit.l};
  }

  ${mediaBreakpointUp('lg')} {
    padding-top: ${spacingUnit.xlx};
  }

  h1 {
    margin-bottom: 0.4rem;

    ${mediaBreakpointUp('lg')} {
      margin-bottom: ${spacingUnit.default};
    }

    &::after {
      ${mediaBreakpointUp('lg')} {
        margin-top: 1.9rem;
      }
    }
  }
`;

const ReadLength = styled(GradientText)`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1.67px;
`;

const Wrapper = styled.div`
  margin-bottom: 44px;
  position: relative;

  ${mediaBreakpointUp('md')} {
    margin-bottom: 0;
  }
`;

const BlogHero = ({authorImage, authorName, body, className, date, eyelash, image, title}) => {
  date = formatDatePretty(date);
  return (
    <Wrapper className={className}>
      <HeroBg breakpoint="md" />
      <Inner>
        <div className="container container--lg">
          <Grid image={image}>
            <>
              <Content>
                <Meta eyelash={eyelash} title={title} />
                <ReadLength>
                  <ReadTime isMarkdown content={body || ''} /> read
                </ReadLength>

                <Link href={Routes.Blog}>
                  <Btn className="btn">
                    <MaIcon icon="long-arrow-alt-left" />
                    View all articles
                  </Btn>
                </Link>
                <Author
                  extra={
                    <>
                      <br />
                      <div style={{fontWeight: 400}}>{date}</div>
                    </>
                  }
                  image={authorImage}
                  imageSize={40}
                  name={`By ${authorName}`}
                />
              </Content>
            </>
          </Grid>
        </div>
      </Inner>
    </Wrapper>
  );
};

BlogHero.propTypes = {
  authorImage: PropTypes.object,
  authorName: PropTypes.string,
  body: PropTypes.string,
  className: PropTypes.string,
  date: PropTypes.string,
  eyelash: PropTypes.string,
  image: PropTypes.object,
  title: PropTypes.string
};

export default BlogHero;
