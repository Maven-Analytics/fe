import {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as userSettingsActions, selectors as userSettingsSelectors} from '../redux/ducks/userSettings';
import {selectors as userSelectors} from '../redux/ducks/user';

class UserSettingsGet extends Component {
  componentDidMount() {
    this.props.actions.userSettingsGet();
  }

  render() {
    return null;
  }
}

UserSettingsGet.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  userSettings: ImmutablePropTypes.list,
  user: ImmutablePropTypes.map
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state),
  userSettings: userSettingsSelectors.getUserSettings(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userSettingsActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsGet);
