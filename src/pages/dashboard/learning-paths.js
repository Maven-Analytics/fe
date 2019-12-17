import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as pathActions, selectors as pathSelectors} from '../../redux/ducks/paths';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import {selectors as userSelectors} from '../../redux/ducks/user';
import {actions as stateActions} from '../../redux/ducks/state';
import DashboardLayout from '../../layouts/dashboard';
import DashboardCard from '../../components/dashboardCard';
import DashboardPath from '../../components/dashboardPath';
import DashboardGrid from '../../components/dashboardGrid';
import {prettyPercent, clickAction} from '../../utils/componentHelpers';
import withAuthSync from '../../components/withAuthSync';

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
              <DashboardCard key={path.get('id')} size="xl" style={{margin: 0}}>
                <DashboardPath
                  title={path.getIn(['title'])}
                  badge={path.getIn(['badge'])}
                  shortDescription={path.getIn(['shortDescription'])}
                  resumeUrl={path.get('resumeUrl')}
                  percentage_completed={path.get('percentage_completed')}
                  match={`${prettyPercent(path.get('match'))}%`}
                  courseCount={path.getIn(['courses']).count()}
                  tools={path.getIn(['tools'])}
                  onDetailClick={clickAction(actions.modalOpen, 'pathDrawer', path.get('id'))}
                  hours={path.get('length')}
                />
              </DashboardCard>
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

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...stateActions,
      ...pathActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuthSync(DashboardLearningPaths));
