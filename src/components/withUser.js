import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import {selectors as userSelectors} from '../redux/ducks/user';

const withUser = WrappedComponent => {
  class WithState extends PureComponent {
    render() {
      const {user, ...rest} = this.props;

      return <WrappedComponent {...rest} user={user}/>;
    }
  }

  WithState.propTypes = {
    user: ImmutablePropTypes.map
  };

  const mapStateToProps = state => ({
    user: userSelectors.getUser(state)
  });

  return connect(mapStateToProps)(WithState);
};

export default withUser;
