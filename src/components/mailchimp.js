import PropTypes from 'prop-types';
import React from 'react';

const Mailchimp = ({onSubmit, onChange, email, loading}) => {
  return (

    // <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
    // <style type="text/css">
    //   #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
    //   /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
    //      We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
    // </style>
    <>
      <div id="mc_embed_signup">
        <form onSubmit={onSubmit} method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
          <div id="mc_embed_signup_scroll">
            {/* <h2>Subscribe</h2>
            <div className="indicates-required"><span className="asterisk">*</span> indicates required</div> */}
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">Email Address</label>
              <div className="form-group">
                <input placeholder="barry@hbo.com" aria-required="true" onChange={onChange} type="email" name="EMAIL" className="required email input" id="mce-EMAIL" value={email}/>
                <button type="submit" disabled={loading} value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button btn btn--primary">Subscribe</button>
              </div>
            </div>
            {/* <div className="mc-field-group">
              <label htmlFor="mce-FNAME">First Name </label>
              <input type="text" value="" name="FNAME" className="" id="mce-FNAME"/>
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-LNAME">Last Name </label>
              <input type="text" value="" name="LNAME" className="" id="mce-LNAME"/>
            </div> */}
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
              <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
            </div>
            <div style={{position: 'absolute', left: -5000}} aria-hidden="true"><input type="text" defaultValue="" name="b_37d64f61296f09250e2a7f67f_6e2e867bfc" tabIndex="-1"/></div>
            <div className="clear"></div>
          </div>
        </form>
      </div>
      {/* <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script> */}
    </>
  );
};

Mailchimp.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  email: PropTypes.string,
  loading: PropTypes.bool
};

export default Mailchimp;
