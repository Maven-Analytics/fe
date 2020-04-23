import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import NotFoundPage from '../404';
import {fromJS} from 'immutable';
import Head from '#root/components/head';
import CtaSurvey from '#root/components/sections/CtaSurvey';
import PathDetailHero from './PathDetailHero';

const PLACEHOLDER_ILLUSTRATION = '/static/img/path-image-placeholder.png';

const pathQuery = gql`
  query PathBySlug($slug: String!) {
    path(slug: $slug) {
      id
      cardDescription
      courses {
        id
      }
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

const PathDetail = ({errorCode, path: {cardDescription, courses, hours, meta, title, tools}}) => {
  if (errorCode === 404) {
    return <NotFoundPage statusCode={errorCode} />;
  }

  tools = [...tools.filter((t, i) => i < tools.length - 1)];

  return (
    <>
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
    </>
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
