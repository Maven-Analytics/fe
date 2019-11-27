import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import BrochureLayout from '../layouts/brochure';
import Head from '../components/head';
import BrochureContent from '../components/brochureContent';
import Wysiwyg from '../components/wysiwyg';

const Terms = ({page}) => {
  return (
    <BrochureLayout className="global-header--checkout">
      <Head page={page} meta={page.get('meta')}/>
      <BrochureContent title={page.get('brochureTitle')}>
        <Wysiwyg content={page.get('content')}/>
      </BrochureContent>
    </BrochureLayout>
  );
};

Terms.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'terms'}));
  return {};
};

Terms.propTypes = {
  page: ImmutablePropTypes.map
};

Terms.defaultProps = {
  page: Map()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPage(state, 'terms')
});

export default connect(mapStateToProps)(Terms);
