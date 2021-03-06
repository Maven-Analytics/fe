import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Image from '#root/components/image';
import Logo from '#root/components/logo';
import {Routes} from '#root/routes';
import BaseLayout from './base';

const AuthLayout = ({children}) => {
  return (
    <BaseLayout mainClass="layout-auth" hideModals={['mobileMenu']}>
      <div className="layout-auth__wrap">
        <div className="layout-auth__row">
          <div className="layout-auth__background">
            <Image
              cover
              placeholderColor="#FFFFFF"
              src="/static/img/auth-bg-1440.jpg"
              srcSet="
                /static/img/auth-bg-1440.webp 1440w,
                /static/img/auth-bg-1440.jpg 1440w,
                /static/img/auth-bg-2880.webp 2880w,
                /static/img/auth-bg-2880.jpg 2880w
              "
            />
          </div>
          <div className="layout-auth__content">
            <div className="layout-auth__content-inner">
              <Link href={Routes.Home}>
                <a>
                  <Logo/>
                </a>
              </Link>
              {children}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthLayout;

