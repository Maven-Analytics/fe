import {Map} from 'immutable';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import VideoSeriesLayout from '#root/components/layout/videoSeries';

import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';

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
