import PropTypes from 'prop-types';
import React from 'react';

import BrochureTitle from '#root/components/brochureTitle';

const CtaForm = ({children, form: Form, title}) => (
  <div className="cta-form">
    <div className="container container--lg">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="form">
            <BrochureTitle title={title} className="align-left"/>
            <Form/>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

CtaForm.propTypes = {
  children: PropTypes.node,
  form: PropTypes.any.isRequired,
  title: PropTypes.string
};

export default CtaForm;
