import PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {clickAction} from '#root/utils/componentHelpers';

import {actions as stateActions} from '../redux/ducks/state';
import ProgressMeter from './progressMeter';

const DashboardProgress = ({items, active, actions, modal}) => {
  const classList = ['dashboard-progress'];

  if (active) {
    classList.push('active');
  }

  return (
    <div className={classList.join(' ')}>
      <ul>
        {items.map(item => (
          <li key={item.get('id')} style={{cursor: 'pointer'}} onClick={clickAction(actions.modalOpen, modal, item.get('id'))}>
            <p>{item.get('title') || item.getIn(['path', 'title'])}</p>
            {active ? <ProgressMeter value={item.get('percentage_completed')}/> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

DashboardProgress.propTypes = {
  items: ImmutablePropTypes.list,
  active: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.func),
  modal: PropTypes.string.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProgress);
