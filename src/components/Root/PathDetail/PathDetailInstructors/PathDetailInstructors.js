import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PathDetailContainer from '../PathDetailContainer';
import {mediaBreakpointUp} from '#root/utils/responsive';
import spacingUnit from '#root/utils/spacingUnit';
import Image from '#root/components/image';
import contentfulImageSrc from '#root/utils/contentfulImageSrc';
import Markdown from '#root/components/markdown';

const Instructor = styled.div`
  text-align: center;

  ${mediaBreakpointUp('md')} {
    display: grid;
    grid-column-gap: 22px;
    grid-template-columns: 80px auto;
    text-align: left;
  }

  &:not(:last-child) {
    margin-bottom: ${spacingUnit.l};

    ${mediaBreakpointUp('md')} {
      margin-bottom: 4.7rem;
    }
  }
`;

const InstructorContent = styled.div`
  h5 {
    font-family: ${props => props.theme.fontBody};
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 1rem;
    text-transform: uppercase;

    ${mediaBreakpointUp('md')} {
      margin: 0 0 0.4rem;
    }
  }

  p {
    font-size: 1.4rem;
    line-height: 1.6;

    ${mediaBreakpointUp('md')} {
      font-size: 1.6rem;
    }
  }
`;

const InstructorThumbnail = styled.div``;

const InstructorImg = styled(Image)`
  background: ${props => props.theme.brandGradient};
  border-radius: 50%;
  height: 80px;
  margin: 0 auto 2rem;
  overflow: hidden;
  padding-bottom: '100%';
  width: 80px;

  ${mediaBreakpointUp('md')} {
    margin-bottom: 0;
  }
`;

const Instructors = styled.div`
  margin-top: ${spacingUnit.l};

  ${mediaBreakpointUp('md')} {
    margin-left: 1.8rem;
  }

  ${mediaBreakpointUp('lg')} {
    margin-top: 3.9rem;
  }
`;

const SectionTitle = styled.h4`
  text-align: center;

  ${mediaBreakpointUp('md')} {
    text-align: left;
  }
`;

const Wrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.veryLightGray3};
  border-top: 1px solid ${props => props.theme.veryLightGray3};
  padding: 4rem 0;

  ${mediaBreakpointUp('lg')} {
    padding: 6rem 0;
  }
`;

const PathDetailInstructors = ({instructors, title, ...props}) => {
  return (
    <PathDetailContainer>
      <Wrapper {...props}>
        <SectionTitle>{title}</SectionTitle>
        <Instructors>
          {instructors.map((instructor, index) => {
            return (
              <Instructor key={index}>
                <InstructorThumbnail>
                  <InstructorImg src={contentfulImageSrc(instructor.thumbnail)} />
                </InstructorThumbnail>
                <InstructorContent>
                  <h5>{instructor.name}</h5>
                  <Markdown content={instructor.biography} />
                </InstructorContent>
              </Instructor>
            );
          })}
        </Instructors>
      </Wrapper>
    </PathDetailContainer>
  );
};

PathDetailInstructors.propTypes = {
  instructors: PropTypes.arrayOf(
    PropTypes.shape({
      biography: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.object.isRequired
    })
  ),
  title: PropTypes.string
};

export default PathDetailInstructors;
