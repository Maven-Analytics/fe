import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Markdown from '#root/components/markdown';
import {GradientText} from 'maven-ui';
import {collapseUp} from '#root/utils/responsive';
import {spacingUnit} from 'maven-ui/lib/helpers';
import {innerHtml} from '#root/utils/componentHelpers';

const Eyelash = styled.p`
  display: inline-block;
  font-size: 0.67em;
  font-weight: 700;
  letter-spacing: 2px;
  opacity: 0.9;
  margin-bottom: 0.7em;
  text-transform: uppercase;
`;

const Description = styled(Markdown)`
  color: #dedede;
  line-height: 1.6;
  margin-bottom: ${spacingUnit.md};

  p {
    ${collapseUp()} {
      margin-bottom: ${spacingUnit.md};
    }
  }
`;

const Title = styled.h1`
  font-size: 2.8em;
  font-weight: 900;
  margin-bottom: 0.3em;
  line-height: 1;
  padding-bottom: 0.3em;
  position: relative;
  text-transform: uppercase;

  &::after {
    bottom: 0;
    background: ${props => props.theme.brandGradient};
    content: ' ';
    height: 0.2rem;
    left: 0;
    position: absolute;
    width: 14.5rem;
  }
`;

const Wrapper = styled.div``;

const BrochureHeroContent = ({children, eyelash, description, link, title, titleTag, ...props}) => {
  return (
    <Wrapper {...props}>
      {eyelash ? (
        <Eyelash>
          <GradientText>{eyelash}</GradientText>
        </Eyelash>
      ) : null}
      {title ? <Title as={titleTag} dangerouslySetInnerHTML={innerHtml(title)} /> : null}
      {description ? <Description content={description} /> : null}
      {children}
    </Wrapper>
  );
};

BrochureHeroContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  eyelash: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
  }),
  title: PropTypes.string,
  titleTag: PropTypes.string
};

BrochureHeroContent.defaultProps = {
  titleTag: 'h1'
};

export default BrochureHeroContent;
