import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as stateActions, selectors as stateSelectors} from '../redux/ducks/state';

const withState = WrappedComponent => {
  class WithState extends PureComponent {
    render() {
      const {state, actions, ...rest} = this.props;

      return <WrappedComponent {...rest} state={state} actions={rest.actions ? {...rest.actions, ...actions} : {...actions}}/>;
    }
  }

  WithState.propTypes = {
    state: ImmutablePropTypes.map,
    actions: PropTypes.objectOf(PropTypes.func)
  };

  const mapStateToProps = state => ({
    state: stateSelectors.getState(state)
  });

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      ...stateActions
    }, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithState);
};

export default withState;
