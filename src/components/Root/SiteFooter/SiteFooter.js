import {Copyright, Footer, FooterDescription, FooterMenu, MaIcon} from 'maven-ui';
import {withRouter} from 'next/router';
import * as PropTypes from 'prop-types';
import React from 'react';

import Subscribe from '#root/components/subscribe';
import {copyLinks, footerConnectLinks, footerLinks, Routes} from '#root/routes';

const SiteFooter = ({router: {pathname}}) => {
  const isHideFooter = pathname.includes(Routes.Login) ||
  pathname.includes(Routes.ForgotPassword) ||
  pathname.includes(Routes.Reset);

  if (isHideFooter) {
    return null;
  }

  const isHideMainFooter = pathname.includes(Routes.Signup) ||
  pathname.includes(Routes.WelcomeSurvey);

  const copy = <Copyright links={copyLinks}/>;

  if (isHideMainFooter) {
    return copy;
  }

  return (
    <>
      <Footer>
        <div className="container container--lg">
          <div className="row">
            <div className="col-12 col-md-4">
              <FooterDescription
                description="Empowering everyday people to change the world with data."
              />
            </div>
            {footerLinks.map((col, index) => {
              return (
                <div key={index} className="col-6 col-md-2">
                  <FooterMenu title={col.title} links={col.links}/>
                </div>
              );
            })}
            <div className="col-12 col-md-4">
              <FooterMenu
                links={footerConnectLinks}
                title="Connect"
              >
                <Subscribe helperText="No spam, just helpful tips & tricks delivered directly to your inbox."/>
                <div className="global-footer__contact">

                  <ul>
                    <li>
                      <MaIcon icon="envelope"/> info@mavenanalytics.io
                    </li>
                  </ul>
                </div>
              </FooterMenu>
            </div>
          </div>
        </div>
      </Footer>
      {copy}
    </>
  );
};

SiteFooter.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(SiteFooter);
