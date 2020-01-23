import {Map} from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import BrochureLayout from '#root/components/layout/brochure';

import BrochureContent from '../components/brochureContent';
import Head from '../components/head';
import Wysiwyg from '../components/wysiwyg';
import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';

const Terms = ({page}) => {
  return (
    <BrochureLayout className="global-header--checkout">
      <Head page={page} meta={page.get('meta')}/>
      <BrochureContent title={page.get('brochureTitle')}>
        <Wysiwyg content={page.get('body')}/>
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
