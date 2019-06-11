import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {List} from 'immutable';

import MaIcon from './maIcon';

const CheckoutSteps = ({links, activeIndex}) => {
  return (
    <div className="checkout-steps">
      <ul>
        {links.map((link, index) => {
          const classList = [];

          if (index <= activeIndex) {
            classList.push('enabled');
          }

          if (index === activeIndex) {
            classList.push('active');
          }

          return (
            <li key={link.get('text')} className={classList.join(' ')}>
              {index <= activeIndex ? (
                <Link href={link.get('url')}>
                  <a>
                    {link.get('text')}
                  </a>
                </Link>
              ) : <a>{link.get('text')}</a>}
              {index + 1 && index + 1 !== links.count() ? (
                <MaIcon icon="chevron-right"/>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

CheckoutSteps.propTypes = {
  links: ImmutablePropTypes.list,
  activeIndex: PropTypes.number
};

CheckoutSteps.defaultProps = {
  links: List(),
  activeIndex: 0
};

export default CheckoutSteps;

