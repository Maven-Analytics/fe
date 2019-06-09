import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Image from './image';

const MethodItem = ({title, description, image, linkTitle, linkHref, active, step}) => {
  const classList = ['method-item'];

  if (active) {
    classList.push('active');
  }

  return (
    <div className={classList.join(' ')}>
      <span className="method-item__step">
        {step}
      </span>
      <span className="method-item__content">
        <p className="method-item__title">{title}</p>
        <p className="method-item__description">{description}</p>
        <Link href={linkHref}><a tabIndex={active ? 0 : -1} className="btn btn--primary-solid">{linkTitle}</a></Link>
        {image ? (
          <Image
            {...image}
            preload
            wrapStyle={{
              paddingBottom: `${image.height / image.width * 100}%`
            }}
            style={{
              width: '100%'
            }}
          />
        ) : null}
      </span>
    </div>
  );
};

MethodItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.object,
  linkTitle: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired
};

export default MethodItem;
