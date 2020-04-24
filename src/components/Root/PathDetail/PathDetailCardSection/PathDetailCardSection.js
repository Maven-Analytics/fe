import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import {mediaBreakpointUp} from '#root/utils/responsive';
import Image from '#root/components/image';
import Markdown from '#root/components/markdown';
import {Routes} from '#root/routes';

const CtaWrap = styled.div`
  margin: 4rem 0 0;
  text-align: center;
`;

const PathCard = styled.a`
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1.64;
  padding: 3rem 2.6rem;
  text-align: center;
  transition: box-shadow 0.2s ease-in-out;

  &:not(.btn) {
    color: ${props => props.theme.gray};

    &:hover,
    &:focus {
      box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
      color: ${props => props.theme.gray};
      text-decoration: none;
    }
  }

  ${mediaBreakpointUp('md')} {
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: 50px auto;
    text-align: left;
  }

  ${mediaBreakpointUp('lg')} {
    grid-template-columns: 80px auto;
    padding: 4.5rem 3.1rem 5.1rem 4rem;
  }

  h5 {
    color: ${props => props.theme.nero};
    font-family: ${props => props.theme.fontBody};
    font-size: 1.2em;
    font-weight: 900;
    line-height: 1.1;
    margin: 0 0 0.5rem;

    ${mediaBreakpointUp('lg')} {
      font-size: 1.5em;
      line-height: 1;
      margin: 0 0 0.8rem;
    }
  }
`;

const PathCardBadge = styled.div``;

const PathCardBadgeImg = styled(Image)`
  height: 50px;
  margin: 0 auto;
  width: 50px;

  ${mediaBreakpointUp('lg')} {
    height: 80px;
    width: 80px;
  }
`;

const PathCardContent = styled.div``;

const Paths = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: 1fr;

  ${mediaBreakpointUp('md')} {
    grid-template-columns: 1fr 1fr;
  }
`;

const SectionHeader = styled.header`
  text-align: center;

  span {
    color: ${props => props.theme.gray2};
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0 0 0.6rem;
    text-transform: uppercase;

    ${mediaBreakpointUp('lg')} {
      font-size: 1.2rem;
    }
  }

  h4 {
    margin: 0 0 2rem;

    ${mediaBreakpointUp('lg')} {
      marging: 0 0 2.5rem;
    }
  }
`;

const Wrapper = styled.div`
  margin: 5rem 0 0;

  ${mediaBreakpointUp('lg')} {
    margin: 7rem 0 0;
  }
`;

const PathDetailCardSection = ({eyelash, paths, link, title, ...props}) => {
  return (
    <Wrapper {...props}>
      <div className="container container--lg">
        <SectionHeader>
          <span>{eyelash}</span>
          <h4>{title}</h4>
        </SectionHeader>
        <Paths>
          {paths &&
            paths.map((path, index) => (
              <Link key={index} href={Routes.Path(path.slug)}>
                <PathCard>
                  <PathCardBadge>
                    <PathCardBadgeImg src={path.badge} />
                  </PathCardBadge>
                  <PathCardContent>
                    <h5>{path.title}</h5>
                    <Markdown content={path.description} />
                  </PathCardContent>
                </PathCard>
              </Link>
            ))}
        </Paths>
        <CtaWrap>
          <Link href={link.href}>
            <a className="btn btn--default">{link.text}</a>
          </Link>
        </CtaWrap>
      </div>
    </Wrapper>
  );
};

PathDetailCardSection.propTypes = {
  eyelash: PropTypes.string,
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      badge: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  title: PropTypes.string
};

export default PathDetailCardSection;
