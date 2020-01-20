import {Map} from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import BrochureLayout from '#root/components/layout/brochure';

import BrochureContent from '../components/brochureContent';
import Head from '../components/head';
import Wysiwyg from '../components/wysiwyg';
import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';

const PrivacyPolicy = ({page}) => {
  return (
    <BrochureLayout className="global-header--checkout">
      <Head page={page} meta={page.get('meta')}/>
      <BrochureContent title={page.get('brochureTitle')}>
        <Wysiwyg content={page.get('content')}/>
      </BrochureContent>
    </BrochureLayout>
  );
};

PrivacyPolicy.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'privacy-policy'}));
  return {};
};

PrivacyPolicy.propTypes = {
  page: ImmutablePropTypes.map
};

PrivacyPolicy.defaultProps = {
  page: Map()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPage(state, 'privacy-policy')
});

export default connect(mapStateToProps)(PrivacyPolicy);
