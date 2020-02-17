import {useMutation} from '@apollo/react-hooks';
import {fromJS} from 'immutable';
import {Loader} from 'maven-ui';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import updateUserSettingsMutation from '#root/api/mutations/updateUserSettings';
import {click} from '#root/utils/componentHelpers';

import {actions as userSettingsActions, selectors as userSettingSelectors} from '../redux/ducks/userSettings';
import MaIcon from './maIcon';

const DashboardCard = ({size, children, title, loading, style, canToggleVisibility, cardVisibility, settingsKey, actions, showClose}) => {
  const [updateUserSettings] = useMutation(updateUserSettingsMutation);
  const dispatch = useDispatch();

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

  const handleClick = async e => {
    e.preventDefault();

    const {data: {updateUserSettings: userSettings} = {}} = await updateUserSettings({
      variables: {
        settings: [
          {
            setting_id: parseInt(cardVisibility.get('id'), 10),
            value: cardVisibility.update('value', u => {
              if (!u) {
                u = fromJS({});
              }

              return u.set(settingsKey, !value);
            }).get('value')
          }
        ]
      }
    });

    dispatch(userSettingsActions.userSettingsSet(userSettings));
  };

  return (
    <div className={classList.join(' ')} style={style}>
      {loading ? <Loader loading={loading}/> : null}
      <div className="dashboard-card__header">
        {title && title !== '' ? <h4 className="dashboard-card__title">{title}</h4> : null}
        <div className="buttons">
          {canToggleVisibility && showClose ? (
            <button
              className="btn btn--empty-dark"
              onClick={handleClick}
            >
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
