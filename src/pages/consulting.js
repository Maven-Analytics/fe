import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import BrochureLayout from '../layouts/brochure';
import BrochureHero from '../sections/brochureHero';
import Head from '../components/head';
import BrochureContent from '../components/brochureContent';

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
      <BrochureContent className="page-training">
        <div className="page-training__content">
          <p>Maven Analytics provides analytics support, strategic consulting and award-winning training to clients looking to bring their data to life. We’re equipped to handle everything from ad hoc analytics needs to the toughest BI challenges, for our clients in ecommerce, education, healthcare, insurance, automotive, retail and other industries. </p>
          <p>We specialize in: </p>
          <ul>
            <li><strong>Data mapping & modeling</strong></li>
            <li><strong>Custom dashboards & reporting solutions</strong></li>
            <li><strong>Forecasts & projections</strong></li>
            <li><strong>Analytics tech stack selection, integration & training</strong></li>
          </ul>
          <p>Our style is hands-on and collaborative; we’ll work side-by-side with your team to help navigate complex data ecosystems, centralize the flow of critical information, and design fully customized solutions suited to your unique challenges and goals.</p>
          <p>Unlike traditional consulting companies, our role goes beyond simply delivering tools and solutions. We’re here to arm you with the knowledge and skills to do incredible things – long after we’re gone.</p>
        </div>

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
