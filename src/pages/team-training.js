import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import BrochureLayout from '../layouts/brochure';
import BrochureHero from '../sections/brochureHero';
import Head from '../components/head';
import BrochureContent from '../components/brochureContent';
import ImageContentful from '../components/imageContentful';
import RichText from '../components/richText';

const TeamTraining = ({page}) => {
  return (
    <BrochureLayout>
      <Head meta={page.get('meta')}/>
      <BrochureHero
        className="brochure-hero--medium"
        eyelash={page.get('heroEyelash')}
        title={page.get('heroTitle')}
        description={page.get('heroDescription')}
        meta={false}
        image={<ImageContentful image={page.get('heroImage')}/>}
        colClasses={['col-md-6', 'col-md-6']}
        backgroundSources={[
          {srcSet: `${page.getIn(['heroBackground', 'file', 'url'])} 768w`, type: page.getIn(['heroBackground', 'file', 'contentType'])},
          {srcSet: `${page.getIn(['heroBackgroundSmall', 'file', 'url'])}`, type: page.getIn(['heroBackgroundSmall', 'file', 'contentType'])}
        ]}
        backgroundSrc={page.getIn(['heroBackgroundSmall', 'file', 'url'])}
      />
      <BrochureContent className="page-training" title={page.get('brochureTitle')}>
        <div className="page-training__content">
          <RichText content={page.get('content')}/>
        </div>
      </BrochureContent>
    </BrochureLayout>
  );
};

TeamTraining.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'team-training'}));
  return {};
};

TeamTraining.propTypes = {
  page: ImmutablePropTypes.map
};

TeamTraining.defaultProps = {
  page: Map()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPage(state, 'team-training')
});

export default connect(mapStateToProps)(TeamTraining);
