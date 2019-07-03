import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {List} from 'immutable';
import Link from 'next/link';

import {actions as pathActions, selectors as pathSelectors} from '../redux/ducks/paths';
import PageLayout from '../layouts/page';
import {Routes} from '../routes';

const PathList = ({paths}) => {
  return (
    <PageLayout>
      {paths.map(path => (
        <Link href={`${Routes.Path}/${path.get('slug')}`} key={path.get('id')}>{path.get('title')}</Link>
      ))}
    </PageLayout>
  );
};

PathList.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pathActions.pathsInit());

  return {};
};

PathList.propTypes = {
  paths: ImmutablePropTypes.list.isRequired
};

PathList.defaultProps = {
  paths: List()
};

const mapStateToProps = state => ({
  paths: pathSelectors.getPaths(state)
});

export default connect(mapStateToProps)(PathList);
