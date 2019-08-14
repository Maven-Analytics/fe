import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import BrochureLayout from '../layouts/brochure';
import BrochureHero from '../sections/brochureHero';
import Head from '../components/head';
import BrochureContent from '../components/brochureContent';
import ContactForm from '../forms/contact';
import MaIcon from '../components/maIcon';

const ContactPage = ({page}) => {
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
      <BrochureContent className="page-contact">
        <div className="page-contact__content">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <ContactForm />
            </div>
            <div className="col-md-6 order-md-1">
              <div className="content">
                <p>Not sure which path is right for you? Question about team training or consulting? Just want to talk data? <strong>Drop us a line, we’re here to help.</strong></p>
                <hr/>
                <ul>
                  <li>
                    <MaIcon icon="envelope"/>
                    <span>info@mavenanalytics.io</span>
                  </li>
                  <li>
                    <MaIcon icon="phone"/>
                    <span>(555) 555-5555</span>
                  </li>
                  <li>
                    <MaIcon icon="map-marker"/>
                    <span>501 Boylston St<br/>Boston, MA 02116</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </BrochureContent>
    </BrochureLayout>
  );
};

ContactPage.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'contact'}));
  return {};
};

ContactPage.propTypes = {
  page: ImmutablePropTypes.map
};

ContactPage.defaultProps = {
  page: Map()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPage(state, 'contact')
});

export default connect(mapStateToProps)(ContactPage);
