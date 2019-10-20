import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import Link from 'next/link';

import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import BrochureLayout from '../layouts/brochure';
import BrochureHero from '../sections/brochureHero';
import Head from '../components/head';
import BrochureContent from '../components/brochureContent';
import {Routes} from '../routes';
import CourseLessons from '../components/courseLessons';
import VideoSeriesLayout from '../layouts/videoSeries';

const BiVideoSeriesPage = ({page}) => {
  return <VideoSeriesLayout page={page} />;
};

BiVideoSeriesPage.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({id: '5sS0WjWWyhZ2MhsJIjhzp8'}));
  return {};
};

BiVideoSeriesPage.propTypes = {
  page: ImmutablePropTypes.map
};

BiVideoSeriesPage.defaultProps = {
  page: Map()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPageById(state, '5sS0WjWWyhZ2MhsJIjhzp8')
});

export default connect(mapStateToProps)(BiVideoSeriesPage);
