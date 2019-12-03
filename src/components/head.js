import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import NextHead from 'next/head';
import {Map} from 'immutable';
import {withRouter} from 'next/router';

import config from '../config';
import {canUseDOM} from '../utils/componentHelpers';

const getAttribute = (attribute, defaultValue, meta, page) => {
  if (meta && meta.get(attribute)) {
    return meta.get(attribute);
  }

  if (page && page.get(attribute)) {
    return page.get(attribute);
  }

  return defaultValue;
};

const Head = ({meta, page, title, router}) => {
  if (!meta && !page) {
    return null;
  }

  const titleDefault = 'Maven Analytics';
  title = getAttribute('title', title, meta, page);

  if (title && title !== titleDefault) {
    title = `${title} | ${titleDefault}`;
  }

  const image = meta && meta.getIn(['image', 'fields', 'file', 'url']) ? meta.getIn(['image', 'fields', 'file', 'url']) : null;
  const keywords = meta && meta.get('keywords') ? meta.get('keywords').join(',') : null;

  const description = meta && meta.get('description') ? meta.get('description') : null;

  const url = canUseDOM() ? `${window.location.origin}${router.asPath}` : `https://mavenanalytics.io/${router.asPath}`;

  return (
    <NextHead>
      <title>{title}</title>
      {description ? <meta name="description" content={description}/> : null}
      {keywords ? <meta name="keywords" content={keywords}/> : null}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {image ? <meta property="og:image" content={image} /> : null}

      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content="@TWITTER_ID"/>
      <meta name="twitter:title" content={title}/>
      {description ? <meta name="twitter:description" content={description}/> : null}
      <meta name="twitter:creator" content="@CREATOR"/>
      {image ? <meta name="twitter:image" content={image}/> : null}

      <link rel="canonical" href={url} />
    </NextHead>
  );
};

Head.propTypes = {
  meta: ImmutablePropTypes.map,
  page: ImmutablePropTypes.map,
  router: PropTypes.object,
  title: PropTypes.string
};

Head.defaultProps = {
  meta: Map(),
  page: Map(),
  title: 'Maven Analytics'
};

export default withRouter(Head);
