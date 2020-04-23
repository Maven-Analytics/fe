import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import gql from 'graphql-tag';
import NotFoundPage from '../404';
import {fromJS} from 'immutable';
import Head from '#root/components/head';
import CtaSurvey from '#root/components/sections/CtaSurvey';
import PathDetailHero from './PathDetailHero';
import spacingUnit from '#root/utils/spacingUnit';
import {collapseUp} from '#root/utils/responsive';
import PathDetailContentBlock from './PathDetailContentBlock';
import CourseCarousel from '#root/components/sections/courseCarousel';
import PathDetailCourses from './PathDetailCourses';
import PathDetailInstructors from './PathDetailInstructors';

const PLACEHOLDER_ILLUSTRATION = '/static/img/path-image-placeholder.png';

const pathQuery = gql`
  query PathBySlug($slug: String!) {
    path(slug: $slug) {
      id
      authors {
        id
        biography
        name
        thumbnail {
          id
          file {
            url
          }
        }
      }
      cardDescription
      courses {
        id
        author {
          name
          thumbnail {
            id
            file {
              url
            }
          }
        }
        comingSoon
        badge {
          id
          file {
            url
          }
        }
        cardDescription
        length
        title
        thumbnail {
          id
          file {
            url
          }
        }
      }
      descriptionDetail
      descriptionPreview
      hours
      meta {
        id
        description
        image {
          id
          file {
            url
          }
        }
        keywords
        title
      }
      title
      tools
    }
  }
`;

const PathDetailSection = styled.section`
  margin-bottom: ${spacingUnit.md};

  ${collapseUp()} {
    margin-bottom: ${spacingUnit.ll};
  }
`;

const PathDetailContentWrap = styled.div`
  color: #7e7e7e;
  font-size: 1.6rem;
  padding: ${spacingUnit.ll} 0;

  ${collapseUp()} {
    padding: ${spacingUnit.xl} 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => props.theme.nero};
  }

  h4 {
    font-size: 1.1em;
    font-weight: 900;
    margin-bottom: ${spacingUnit.default};
    margin-top: 0;
    text-transform: uppercase;
  }

  section {
    ul {
      margin-bottom: ${spacingUnit.md};

      ${collapseUp()} {
        margin-bottom: ${spacingUnit.ll};
      }
    }
  }
`;

const Wrapper = styled.div``;

const PathDetail = ({errorCode, path: {authors, cardDescription, descriptionDetail, descriptionPreview, courses, hours, meta, title, tools}}) => {
  if (errorCode === 404) {
    return <NotFoundPage statusCode={errorCode} />;
  }

  tools = [...tools.filter((t, i) => i < tools.length - 1)];

  return (
    <Wrapper>
      <Head meta={fromJS(meta)} />
      <PathDetailHero
        description={cardDescription}
        courseCount={courses.length}
        hours={hours}
        image={PLACEHOLDER_ILLUSTRATION}
        title={title}
        tools={tools}
      />
      <CtaSurvey />
      <PathDetailContentWrap>
        <PathDetailSection>
          <PathDetailContentBlock title="About This Path">{descriptionPreview}</PathDetailContentBlock>
        </PathDetailSection>
        <PathDetailSection>
          <PathDetailCourses courses={courses} title="Included Courses" />
        </PathDetailSection>
        <PathDetailSection>
          <PathDetailContentBlock>{descriptionDetail}</PathDetailContentBlock>
        </PathDetailSection>
        <PathDetailSection>
          <PathDetailInstructors instructors={authors} title="Meet Your Instructors" />
        </PathDetailSection>
      </PathDetailContentWrap>
    </Wrapper>
  );
};

PathDetail.propTypes = {
  errorCode: PropTypes.number,
  path: PropTypes.object
};

PathDetail.getInitialProps = async ({apolloClient, query: {slug}}) => {
  try {
    const {
      data: {path}
    } = await apolloClient.query({
      query: pathQuery,
      variables: {slug}
    });

    return {path};
  } catch {
    return {
      errorCode: 404
    };
  }
};

export default PathDetail;
