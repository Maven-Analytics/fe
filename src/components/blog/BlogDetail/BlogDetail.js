import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Markdown from '#root/components/markdown';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';

import BlogHero from './BlogHero';

const Content = styled.div`
  color: ${props => props.theme.nero};
  font-size: 1.4rem;
  line-height: 1.7;
  margin: 8.5rem auto 4.5rem;
  max-width: 710px;

  ${mediaBreakpointUp('md')} {
    font-size: 1.8rem;
    margin: 7rem auto 5rem;
  }

  &::after {
    background-color: ${props => props.theme.shadyLady};
    content: ' ';
    display: block;
    height: 1px;
    margin-top: 2rem;
    width: 105px;

    ${mediaBreakpointUp('md')} {
      width: 229px;
    }
  }

  h2 {
    font-size: 2em;
    line-height: 1.14;
    margin: 0 0 1em;
  }

  h3 {
    font-size: 1.57em;
    line-height: 1.14;
    margin: 0 0 1em;
  }

  h4 {
    font-size: 1.2em;
    line-height: 1.2;
    margin: 0 0 1em;
  }

  h5 {
    font-size: 1em;
    line-height: 1.14;
    margin: 0 0 1em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  strong,
  b {
    font-weight: 700;
  }

  p {
    margin: 0 0 2rem;

    ${mediaBreakpointUp('md')} {
      margin-bottom: 3rem;
    }
  }

  ul,
  ol {
    font-size: 1em;
    margin-bottom: 2rem;
    margin-left: 2.7rem;
  }

  p + h2,
  p + h3,
  p + h4,
  p + h5,
  p + h6 {
    margin-bottom: 0.5rem;

    ${mediaBreakpointUp('md')} {
      margin-bottom: 1.1rem;
    }
  }

  * + h2,
  * + h3,
  * + h4,
  * + h5,
  * + h6 {
    margin-top: 2.9rem;

    ${mediaBreakpointUp('md')} {
      margin-top: 2.4rem;
    }
  }

  a {
    cursor: pointer;
    font-weight: 700;
    position: relative;
    text-decoration: none;

    &:not(.btn) {
      color: ${props => props.theme.nero};
    }

    &::after {
      background: ${props => props.theme.brandGradient};
      bottom: -3px;
      content: ' ';
      height: 2px;
      left: 0;
      position: absolute;
      width: 100%;
    }

    &:hover {
      text-decoration: none;
    }
  }

  blockquote {
    font-size: 1.7em;
    font-style: italic;
    font-weight: 700;
    line-height: 1.16;
    padding-left: 2.7rem;
    position: relative;
    margin-bottom: 3.5rem;

    ${mediaBreakpointUp('md')} {
      margin-bottom: 5.5rem;
      margin-left: 2rem;
    }

    cite {
      display: block;
      font-size: 0.58em;
      font-style: normal;
      font-weight: 400;
      line-height: 2;
      margin-top: 0.6rem;
      text-align: right;
    }

    &::before {
      background: ${props => props.theme.brandGradient};
      content: ' ';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 2px;
    }
  }

  img {
    display: block;
    height: auto;
    margin: 0 auto 2rem;
    max-width: 100%;
    width: 100%;

    ${mediaBreakpointUp('md')} {
      margin-bottom: 6.8rem;
    }
  }

  img + span {
    display: block;
    font-size: 0.85em;
    margin: -1.1rem auto 2rem;
    max-width: 80%;

    ${mediaBreakpointUp('md')} {
      background-color: #fff;
      bottom: 0;
      box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.1);
      padding: 1.6rem 3.1rem 1.6rem 2.8rem;
      margin-bottom: 0;
      margin-left: auto;
      margin-right: 3.6rem;
      margin-top: -6.8rem;
      transform: translate3d(0, -50%, 0);
      width: 314px;
    }
  }

  picture {
    display: block;
    position: relative;
    /* margin-bottom: 2rem;

    ${mediaBreakpointUp('md')} {
      margin-bottom: 6.8rem;
    } */
  }

  .callout {
    margin-bottom: 2rem;
    padding: 2.6rem 2.7rem 2.8rem 3rem;
    position: relative;

    ${mediaBreakpointUp('md')} {
      padding: 3.5rem 5.6rem 3.2rem 3.9rem;
      margin-bottom: 3.7rem;
    }

    strong,
    b {
      font-size: 1.1em;
    }

    p {
      margin: 0;
    }

    &::before {
      background: ${props => props.theme.brandGradient};
      content: ' ';
      display: block;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;
    }

    &::after {
      background-color: #fff;
      content: ' ';
      display: block;
      height: calc(100% - 4px);
      left: 2px;
      position: absolute;
      top: 2px;
      width: calc(100% - 4px);
      z-index: -1;
    }
  }
`;

const Wrapper = styled.div``;

const BlogDetail = ({blog}) => {
  return (
    <Wrapper>
      <BlogHero
        authorImage={blog.author && blog.author.thumbnail}
        authorName={blog.author && blog.author.name}
        body={blog.body}
        eyelash={blog.category && blog.category.title}
        id={blog.id}
        image={blog.featuredImage}
        title={blog.title}
      />
      <div className="container">
        <Content>
          <Markdown content={blog.body} />
          {/* <p>
            Utilising user engagement to in turn take this offline. Utilising customer journeys and finally funnel users. Creating first party data
            and above all, create actionable insights. Leverage empathy maps while <a href="/">this is a inline text link</a> remembering to go viral.
            Leverage best in class but maximise share of voice. Repurpose stakeholder engagement so that as an end result, we be CMSable.
          </p>
          <h2>This is a h2 subheading</h2>
          <p>
            Utilising user engagement to in turn take this offline. Utilising customer journeys and finally funnel users. Creating first party data
            and above all, create actionable insights. Leverage empathy maps while this is a inline text link remembering to go viral. Leverage best
            in class but maximise share of voice. Repurpose stakeholder engagement so that as an end result, we be CMSable.
          </p>
          <h3>This is a h3 subheading</h3>
          <p>
            Utilising user engagement to in turn take this offline. Utilising customer journeys and finally funnel users. Creating first party data
            and above all, create actionable insights. Leverage empathy maps while this is a inline text link remembering to go viral. Leverage best
            in class but maximise share of voice. Repurpose stakeholder engagement so that as an end result, we be CMSable.
          </p>
          <h4>This is a h4 subheading</h4>
          <p>
            Utilising user engagement to in turn take this offline. Utilising customer journeys and finally funnel users. Creating first party data
            and above all, create actionable insights. Leverage empathy maps while this is a inline text link remembering to go viral. Leverage best
            in class but maximise share of voice. Repurpose stakeholder engagement so that as an end result, we be CMSable.
          </p>
          <h5>This is a h5 subheading</h5>
          <p>
            Utilising user engagement to in turn take this offline. Utilising customer journeys and finally funnel users. Creating first party data
            and above all, create actionable insights. Leverage empathy maps while this is a inline text link remembering to go viral. Leverage best
            in class but maximise share of voice. Repurpose stakeholder engagement so that as an end result, we be CMSable.
          </p>
          <ul>
            <li>Bulleted list</li>
            <li>Another bullet option</li>
            <li>Even a third bullet</li>
            <li>Lets make it 4 bullets for fun</li>
          </ul>
          <ol>
            <li>This is an ordered list</li>
            <li>Another bullet option</li>
            <li>Even a third bullet</li>
            <li>Lets make it 4 bullets for fun</li>
          </ol>
          <p>
            Utilising user engagement to in turn take this offline. Utilising customer journeys and finally funnel users. Creating first party data
            and above all, create actionable insights.
          </p>
          <blockquote>
            “This is a blockquote for any article. It’s a great way to highlight important messages from the author. Boom!”
            <cite>- Quote author name</cite>
          </blockquote>
          <picture>
            <img src="http://via.placeholder.com/267x178" />
            <figcaption>Inline image with an optional caption explaining the photo.</figcaption>
          </picture>
          <div className="callout">
            <p>
              <strong>This is a callout box to highlight important information</strong>
            </p>
            <b>This is a callout box to highlight important information</b>
            <p>
              Utilising user engagement to in turn take this offline. Utilising customer journeys and finally funnel users. Creating first party data
              and above all, create actionable insights.
            </p>
          </div>
          <p>
            Utilising user engagement to in turn take this offline. Utilising customer journeys and finally funnel users. Creating first party data
            and above all, create actionable insights.
          </p> */}
        </Content>
      </div>
    </Wrapper>
  );
};

BlogDetail.propTypes = {
  blog: PropTypes.object
};

BlogDetail.defaultProps = {
  blog: {}
};

export default BlogDetail;
