import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as userSettingsActions, selectors as userSettingSelectors} from '../redux/ducks/userSettings';
import {click} from '../utils/componentHelpers';
import Loader from './loader';
import MaIcon from './maIcon';

const DashboardCard = ({size, children, title, loading, style, canToggleVisibility, cardVisibility, settingsKey, actions, showClose}) => {
  const hasValue = cardVisibility.hasIn(['value', settingsKey]);
  const value = hasValue ? cardVisibility.getIn(['value', settingsKey]) : true;

  const isHidden = Boolean(canToggleVisibility && value === false);

  const classList = ['dashboard-card'];

  if (size) {
    classList.push(`dashboard-card--${size}`);
  }

  if (loading) {
    classList.push('loading');
  }

  if (isHidden) {
    classList.push('hidden');
  }

  return (
    <div className={classList.join(' ')} style={style}>
      {loading ? <Loader loading={loading}/> : null}
      <div className="dashboard-card__header">
        {title && title !== '' ? <h4 className="dashboard-card__title">{title}</h4> : null}
        <div className="buttons">
          {canToggleVisibility && showClose ? (
            <button
              className="btn btn--empty-dark"
              onClick={click(actions.userSettingsUpdate, [
                {
                  id: cardVisibility.get('id'),
                  setting_id: cardVisibility.get('id'),
                  value: {
                    ...cardVisibility.setIn(['value', settingsKey], !value).get('value').toJS()
                  }
                }
              ])
              }>
              Hide
              <MaIcon icon="eye-slash"/>
            </button>
          ) : null}
        </div>
      </div>
      <div className="dashboard-card__body">
        {children}
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  title: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.object,
  canToggleVisibility: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.func),
  settingsKey: PropTypes.string,
  cardVisibility: ImmutablePropTypes.map,
  showClose: PropTypes.bool
};

const mapStateToProps = state => ({
  cardVisibility: userSettingSelectors.getUserSetting(state, 'dashboardCardVisibility')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userSettingsActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCard);
