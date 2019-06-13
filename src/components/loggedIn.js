import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {selectors as userSelectors} from '../redux/ducks/user';

const LoggedIn = ({user, children}) => {
  if (user && user.has('id')) {
    return typeof children === 'function' ? children(user) : children;
  }

  return null;
};

LoggedIn.propTypes = {
  user: ImmutablePropTypes.map,
  children: PropTypes.oneOfType(PropTypes.func, PropTypes.node)
};

LoggedIn.defaultProps = {
  user: Map()
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

export default connect(mapStateToProps)(LoggedIn);
