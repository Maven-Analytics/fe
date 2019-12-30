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
            cite="- Blakely F, Digital Marketing Director"
            image="/static/img/Renovia_Logo.png"
            imageStyle={{
              width: 200,
              height: 55
            }}
          >
            <p>Maven took a very complicated request to create a digital attribution solution and produced an outstanding dashboard for my company, which has made a huge impact on my ability to run campaigns. They are game changers for marketers. I will continue to use them for all our analytics needs and highly recommend working with them!</p>
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
