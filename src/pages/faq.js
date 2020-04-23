import {Map} from 'immutable';
import Link from 'next/link';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import BrochureLayout from '#root/components/layout/brochure';
import BrochureHero from '#root/components/sections/BrochureHero';
import BrochureHeroContent from '#root/components/sections/BrochureHero/BrochureHeroContent';
import BrochureHeroMedia from '#root/components/sections/BrochureHero/BrochureHeroMedia';
import contentfulImageSrc from '#root/utils/contentfulImageSrc';

import BrochureContent from '../components/brochureContent';
import CourseLessons from '../components/courseLessons';
import Head from '../components/head';
import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import {Routes} from '../routes';

const FAQPage = ({page}) => {
  return (
    <BrochureLayout>
      <Head meta={page.get('meta')} />
      <BrochureHero
        backgroundSources={[
          {srcSet: `${page.getIn(['heroBackground', 'file', 'url'])} 768w`, type: page.getIn(['heroBackground', 'file', 'contentType'])},
          {srcSet: `${page.getIn(['heroBackgroundSmall', 'file', 'url'])}`, type: page.getIn(['heroBackgroundSmall', 'file', 'contentType'])}
        ]}
        backgroundSrc={page.getIn(['heroBackgroundSmall', 'file', 'url'])}
        className="brochure-hero--medium"
        columnClasses={['col-md-6', 'col-md-6']}
        contentLeft={<BrochureHeroContent eyelash={page.get('heroEyelash')} title={page.get('heroTitle')} />}
        contentRight={
          <BrochureHeroMedia overflow image={contentfulImageSrc(page.get('heroImage') && page.get('heroImage').toJS())}></BrochureHeroMedia>
        }
      />
      <BrochureContent className="page-faq" title={page.get('brochureTitle')}>
        <div className="page-faq__content">
          <p>
            {/* eslint-disable-next-line quotes */}
            Below are some of the most common questions we hear from our students. Still {"can't"} find what you need?{' '}
            {/* eslint-disable-next-line quotes */}
            <Link href={Routes.Contact}>Send us a message</Link> and {"we'd"} be happy to help!
          </p>
        </div>
        <CourseLessons showCount={false} lessons={page.get('flexibleContent')} />
      </BrochureContent>
    </BrochureLayout>
  );
};

FAQPage.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'faq'}));
  return {};
};

FAQPage.propTypes = {
  page: ImmutablePropTypes.map
};

FAQPage.defaultProps = {
  page: Map()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPage(state, 'faq')
});

export default connect(mapStateToProps)(FAQPage);
