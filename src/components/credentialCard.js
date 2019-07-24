import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';
import {Map} from 'immutable';

import ImageContentful from './imageContentful';
import ProgressMeter from './progressMeter';

const CredentialCard = ({completed, progress, title, image, promoteUrl}) => {
  const classList = ['credential-card'];

  if (completed) {
    classList.push('completed');
  }

  return (
    <div className={classList.join(' ')}>
      <ImageContentful image={image}/>
      <p>{title}</p>
      {completed && promoteUrl ? (
        <Link href={promoteUrl}>
          <a className="btn">Promote</a>
        </Link>
      ) : (
        <ProgressMeter title="Progress" value={progress}/>
      )}
    </div>
  );
};

CredentialCard.propTypes = {
  title: PropTypes.string,
  image: ImmutablePropTypes.map,
  completed: PropTypes.bool,
  progress: PropTypes.number,
  promoteUrl: PropTypes.string
};

CredentialCard.defaultProps = {
  image: Map()
};

export default CredentialCard;
