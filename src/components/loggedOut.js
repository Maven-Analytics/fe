import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {selectors as userSelectors} from '../redux/ducks/user';

const LoggedOut = ({user, children}) => {
  if (user && user.has('id')) {
    return null;
  }

  return children;
};

LoggedOut.propTypes = {
  user: ImmutablePropTypes.map,
  children: PropTypes.node
};

LoggedOut.defaultProps = {
  user: Map()
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

export default connect(mapStateToProps)(LoggedOut);
