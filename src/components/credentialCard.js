import {Map} from 'immutable';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, {Component, memo} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as credentialActions, selectors as credentialSelectors} from '../redux/ducks/credentials';
import ImageContentful from './imageContentful';
import ProgressMeter from './progressMeter';

const CredentialCard = ({accredibleId, progress, title, image, promoteUrl}) => {
  const credentials = useSelector(credentialSelectors.getCredentials);
  const credential = credentials.find(c => c.get('group_id') === accredibleId);
  const classList = ['credential-card'];
  const url = credential && credential.has('url') && credential.get('url') !== '' ? credential.get('url') : promoteUrl;

  if (credential || progress >= 1) {
    classList.push('completed');
  }

  return (
    <div className={classList.join(' ')}>
      <ImageContentful image={image} />
      <p>{title}</p>
      {url ? (
        <a className="btn" href={url} rel="noopener noreferrer" target="_blank">
            See Badge
        </a>
      ) : (
        <ProgressMeter title="Progress" value={progress} />
      )}
    </div>
  );
};

CredentialCard.propTypes = {
  title: PropTypes.string,
  image: ImmutablePropTypes.map,
  progress: PropTypes.number,
  promoteUrl: PropTypes.string,
  accredibleId: PropTypes.number,
  actions: PropTypes.object,
  credential: ImmutablePropTypes.map
};

CredentialCard.defaultProps = {
  image: Map()
};

export default memo(CredentialCard);

