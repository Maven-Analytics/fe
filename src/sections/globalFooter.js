import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';

import Logo from '../components/logo';
import {footerLinks} from '../routes';
import MaIcon from '../components/maIcon';
import Subscribe from '../components/subscribe';
import Copyright from './copyright';

const GlobalFooter = ({description, links}) => {
  return (
    <footer className="global-footer">
      <div className="global-footer__inner">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="global-footer__description">
                <Logo/>
                <p>{description}</p>
              </div>
            </div>
            {links.map(col => (
              <div key={col.get('title')} className="col-6 col-md-2">
                <div className="global-footer__menu">
                  <p>{col.get('title')}</p>
                  <ul>
                    {col.get('links').map(link => (
                      <li key={link.get('text')}>
                        <Link href={link.get('url')}>
                          <a>{link.get('text')}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div className="col-12 col-md-4">
              <div className="global-footer__menu">
                <p>Connect</p>
                <Subscribe helperText="No spam, just helpful tips & tricks delivered directly to your inbox."/>
                <div className="global-footer__contact">
                  <ul>
                    <li>
                      <MaIcon icon="envelope"/> info@mavenanalytics.io
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright/>
    </footer>
  );
};

GlobalFooter.propTypes = {
  description: PropTypes.string,
  links: ImmutablePropTypes.list
};

GlobalFooter.defaultProps = {
  links: footerLinks,
  description: 'Award-winning courses to help you master the most sought-after analytics and business intelligence skills.  Customized training that helps everyday people become data rockstars.'
};

export default GlobalFooter;
