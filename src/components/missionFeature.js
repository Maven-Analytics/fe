import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {noop} from '../utils/componentHelpers';
import MaIcon from './maIcon';

const MissionFeature = ({title, description, icon, linkText, linkUrl, onClick, onClose, tag: Tag, active, className}) => (
  <Tag
    className={['mission-feature', active ? 'active' : '', onClick ? 'has-border' : '', className ? className : ''].filter(f => f !== '').join(' ')}
    onClick={onClick ? onClick : noop}
  >
    <div className="mission-feature__inner">
      <span role="button" className="mission-feature__close" onClick={onClose ? onClose : noop}>
        <MaIcon icon="times" />
      </span>
      <div className="mission-feature__preview">
        <MaIcon icon={icon} />
        <p>{title}</p>
      </div>
      <div className="mission-feature__description">
        <p>{description}</p>
        <Link href={linkUrl}>
          <a className="btn btn--primary-solid">{linkText}</a>
        </Link>
      </div>
    </div>
  </Tag>
);

MissionFeature.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  tag: PropTypes.oneOf(['button', 'div']).isRequired,
  active: PropTypes.bool,
  className: PropTypes.string
};

MissionFeature.defaultProps = {
  tag: 'button'
};

export default MissionFeature;
