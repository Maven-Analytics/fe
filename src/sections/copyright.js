import React from 'react';
import Link from 'next/link';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {copyLinks} from '../constants';

const Copyright = ({links}) => {
  return (
    <div className="copyright">
      <div className="container">
        <div className="row justify-md-between">
          <div className="col-12 col-md-6">
            <p>© Maven Analytics, LLC <span>|</span> All Rights Reserved</p>
          </div>
          <div className="col-12 col-md-6">
            <ul>
              {links.map(link => (
                <li key={link.get('text')}>
                  <Link href={link.get('url')}>
                    <a>{link.get('text')}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Copyright.propTypes = {
  links: ImmutablePropTypes.list
};

Copyright.defaultProps = {
  links: copyLinks
};

export default Copyright;
