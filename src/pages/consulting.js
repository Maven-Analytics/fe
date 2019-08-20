import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import BrochureLayout from '../layouts/brochure';
import BrochureHero from '../sections/brochureHero';
import Head from '../components/head';
import BrochureContent from '../components/brochureContent';
import RichText from '../components/richText';
import CtaForm from '../sections/ctaForm';
import ConsultingForm from '../forms/consulting';
import CtaQuote from '../components/ctaQuote';

const Consulting = ({page}) => {
  return (
    <BrochureLayout>
      <Head meta={page.get('meta')}/>
      <BrochureHero
        className="brochure-hero--medium"
        eyelash={page.get('heroEyelash')}
        title={page.get('heroTitle')}
        meta={false}
        colClasses={['col-md-12']}
        backgroundSources={[
          {srcSet: `${page.getIn(['heroBackground', 'file', 'url'])} 768w`, type: page.getIn(['heroBackground', 'file', 'contentType'])},
          {srcSet: `${page.getIn(['heroBackgroundSmall', 'file', 'url'])}`, type: page.getIn(['heroBackgroundSmall', 'file', 'contentType'])}
        ]}
        backgroundSrc={page.getIn(['heroBackgroundSmall', 'file', 'url'])}
      />
      <BrochureContent className="page-consulting" title={page.get('brochureTitle')}>
        <div className="page-consulting__content">
          <RichText content={page.get('content')}/>
        </div>
        <CtaForm title="Request A Quote" form={ConsultingForm}>
          <CtaQuote
            cite="- Kym Recco, Digital Marketing Manager"
            image="/static/img/toms-maine-logo.png"
            imageStyle={{
              width: 128,
              height: 99
            }}
          >
            <p>Maven Analytics does magic with data.  They have a gift for visualizing data and helping me tell the story of what is in the data. They are collaborative at any level I need from the basics to the toughest challenges.  Most importantly, they taught me the skills to do all of this on my own in the process.  So I not only gained a beautiful dashboard - I now have the skills to do incredible things with my data on my own too.</p>
          </CtaQuote>
        </CtaForm>
      </BrochureContent>
    </BrochureLayout>
  );
};

Consulting.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'consulting'}));
  return {};
};

Consulting.propTypes = {
  page: ImmutablePropTypes.map
};

Consulting.defaultProps = {
  page: Map()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPage(state, 'consulting')
});

export default connect(mapStateToProps)(Consulting);
