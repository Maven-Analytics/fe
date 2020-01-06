import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import Logo from '#root/components/logo';
import MaIcon from '#root/components/maIcon';
import Subscribe from '#root/components/subscribe';
import {footerConnectLinks, footerLinks} from '#root/routes';

import Copyright from './copyright';

const GlobalFooter = ({description, links}) => {
  return (
    <footer className="global-footer">
      <div className="global-footer__inner">
        <div className="container container--lg">
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
                <ul>
                  {footerConnectLinks.map(link => (
                    <li key={link.get('text')}>
                      <Link href={link.get('url')}>
                        <a>{link.get('text')}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
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
  description: 'Empowering everyday people to change the world with data.'
};

export default GlobalFooter;
