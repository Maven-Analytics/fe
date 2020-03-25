import PropTypes from 'prop-types';
import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DashboardCardXl, DashboardCardBody} from 'maven-ui';

import DashboardLayout from '#root/components/layout/dashboard';
import {selectors as errorSelectors} from '#root/redux/ducks/error';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {actions as pathActions, selectors as pathSelectors} from '#root/redux/ducks/paths';
import {actions as stateActions} from '#root/redux/ducks/state';

import DashboardGrid from '../../components/dashboardGrid';
import DashboardPath from '../../components/dashboardPath';
import withAuthSync from '../../components/withAuthSync';
import {clickAction, prettyPercent} from '../../utils/componentHelpers';

class DashboardLearningPaths extends Component {
  componentDidMount() {
    this.props.actions.pathsGet();
  }

  render() {
    const {paths, loading, actions} = this.props;

    return (
      <DashboardLayout showWelcome loading={loading} title="Learning Paths" activeLink={1}>
        <DashboardGrid vertical>
          {paths.map(path => {
            return (
              <DashboardCardXl key={path.get('id')} style={{margin: 0}}>
                <DashboardCardBody>
                  <DashboardPath
                    title={path.getIn(['title'])}
                    badge={path.getIn(['badge'])}
                    descriptionPreview={path.getIn(['descriptionPreview'])}
                    resumeUrl={path.get('resumeUrl')}
                    percentage_completed={path.get('percentage_completed')}
                    match={`${prettyPercent(path.get('match'))}%`}
                    courseCount={path.getIn(['courses']).count()}
                    tools={path.getIn(['tools'])}
                    onDetailClick={clickAction(actions.modalOpen, 'pathDrawer', path.get('id'))}
                    hours={path.get('length')}
                  />
                </DashboardCardBody>
              </DashboardCardXl>
            );
          })}
        </DashboardGrid>
      </DashboardLayout>
    );
  }
}

DashboardLearningPaths.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  paths: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  paths: pathSelectors.getPaths(state),
  loading: loadingSelectors.getLoading(['PATHS_GET'])(state),
  error: errorSelectors.getError(['PATHS_GET'])(state)
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...stateActions,
        ...pathActions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuthSync(DashboardLearningPaths));
