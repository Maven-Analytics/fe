import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import Link from 'next/link';

import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import {actions as faqActions, selectors as faqSelectors} from '../redux/ducks/faq';
import BrochureLayout from '../layouts/brochure';
import BrochureHero from '../sections/brochureHero';
import Head from '../components/head';
import BrochureContent from '../components/brochureContent';
import {Routes} from '../routes';
import CourseLessons from '../components/courseLessons';

const FAQPage = ({page, faqs}) => {
  console.log(faqs.toJS());
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
      <BrochureContent className="page-faq">
        <div className="page-faq__content">
          <p>Below are some of the most common questions we hear from our students. Still can't find what you need? <Link href={Routes.Contact}>Send us a message</Link> and we'd be happy to help!</p>
          <CourseLessons showCount={false} lessons={faqs}/>
        </div>
      </BrochureContent>
    </BrochureLayout>
  );
};

FAQPage.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'faq'}));
  store.dispatch(faqActions.faqsGet());
  return {};
};

FAQPage.propTypes = {
  page: ImmutablePropTypes.map,
  faqs: ImmutablePropTypes.list
};

FAQPage.defaultProps = {
  page: Map(),
  faqs: List()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPage(state, 'faq'),
  faqs: faqSelectors.getFaqs(state)
});

export default connect(mapStateToProps)(FAQPage);
