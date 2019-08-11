import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Image from '../components/image';
import Markdown from '../components/markdown';
import TrackVisibility from '../components/trackVisibility';

const defaultContent = `
## Ready to become a
## **data rockstar**

Sign up today for a **10-Day Free Trial** and find out!`;

const CtaSection = ({content, linkUrl, linkText}) => {
  return (
    <div className="cta-section">
      <Image
        cover
        placeholderColoe="#20E2D7"
        modifier="cta-section__background"
        src="/static/img/cta-bg.jpg"
        srcSet={`
          /static/img/cta-bg.webp 1440w,
          /static/img/cta-bg.jpg 1440w,
          /static/img/cta-bg@2x.webp 2880w,
          /static/img/cta-bg@2x.jpg 2880w,
        `}
      />
      <div className="cta-section__content">
        <Markdown content={content}/>
        <Link href={linkUrl}>
          <a className="btn btn--primary-solid">{linkText}</a>
        </Link>
      </div>
    </div>
  );
};

CtaSection.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string
};

CtaSection.defaultProps = {
  content: defaultContent,
  linkUrl: '/',
  linkText: 'FREE 10-DAY TRIAL'
};

export default CtaSection;
