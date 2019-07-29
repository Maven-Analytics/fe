import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import NextHead from 'next/head';
import {Map} from 'immutable';
import {withRouter} from 'next/router';

import config from '../config';

const Head = ({meta, router}) => {
  const image = meta.getIn(['image', 'fields', 'file', 'url']);
  const titleDefault = 'Maven Analytics';
  const title = meta.get('title') && meta.get('title') !== '' && meta.get('title') !== 'Maven Analytics' ? `${meta.get('title')} | ${titleDefault}` : titleDefault;
  const keywords = meta.has('keywords') ? meta.get('keywords').join(',') : '';

  const description = meta.get('description');

  const url = `${config.HOST_APP}${router.asPath}`;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content="@TWITTER_ID"/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:creator" content="@CREATOR"/>
      <meta name="twitter:image" content={image}/>

      <link rel="canonical" href="" />
    </NextHead>
  );
};

Head.propTypes = {
  meta: ImmutablePropTypes.map,
  router: PropTypes.object
};

Head.defaultProps = {
  meta: Map()
};

export default withRouter(Head);
