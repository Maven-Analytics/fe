import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {actions as pathActions, selectors as pathSelectors} from '../redux/ducks/paths';
import PageLayout from '../layouts/page';
import {redirect} from '../utils/routingHelpers';
import {Routes} from '../routes';

const Path = ({path}) => {
  return (
    <PageLayout>
      <h1>{path.get('title')}</h1>
    </PageLayout>
  );
};

Path.getInitialProps = ctx => {
  const {res, query, store} = ctx;

  if (!query.id) {
    return redirect(Routes.Home, res);
  }

  store.dispatch(pathActions.pathsInit({query: {'fields.slug': query.id}}));

  return {
    slug: query.id
  };
};

Path.propTypes = {
  path: ImmutablePropTypes.map.isRequired,
  slug: PropTypes.string.isRequired
};

Path.defaultProps = {
  path: Map()
};

const mapStateToProps = (state, ownProps) => ({
  path: pathSelectors.getPath(state, ownProps.slug)
});

export default connect(mapStateToProps)(Path);
