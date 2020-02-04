import * as PropTypes from 'prop-types';
import React from 'react';

const AccountListLink = ({isBtn, href, external, children}) => {
  const classList = [];
  if (isBtn) {
    classList.push('btn btn--default');
  }

  let linkProps = {};

  if (external) {
    linkProps = {
      ...linkProps,
      rel: 'noopener noreferrer',
      target: '_blank'
    };
  }

  return <a className={classList.join(' ')} href={href} {...linkProps}>{children}</a>;
};

AccountListLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  external: PropTypes.bool,
  isBtn: PropTypes.bool,
  href: PropTypes.string
};

export default AccountListLink;
