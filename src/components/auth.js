import React from 'react';
import PropTypes from 'prop-types';

import Image from './image';

const Auth = ({imageSrc, imageAlt, ...props}) => {
  console.log(props);
  return (
    <div className="auth">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="auth__image-wrap">
              <Image preload src={imageSrc} alt={imageAlt} modifier="image--cover image--gradient auth__image"/>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row h-100 align-items-md-center">
              <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <div id="auth-form" className="auth__form">
                  <Image src="//via.placeholder.com/242x58/20E2D7/fff?text=Maven%20Logo" alt="Maven Analytics Logo" modifier="auth__logo"/>
                  {/* {children} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Auth.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  // children: PropTypes.node.isRequired
};

export default Auth;
