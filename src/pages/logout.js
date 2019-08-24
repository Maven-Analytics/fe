import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'next/router';

import {actions as authActions} from '../redux/ducks/auth';
import {Routes} from '../routes';

class LogoutPage extends Component {
  componentDidMount() {
    this.props.actions.logout();
    this.props.router.push(Routes.Login);
  }

  render() {
    return null;
  }
}

LogoutPage.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  router: PropTypes.object
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogoutPage));

