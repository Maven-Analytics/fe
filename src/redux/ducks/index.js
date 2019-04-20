import {combineReducers} from 'redux-immutable';
import loading from './loading';
import error from './error';
import user from './user';

const Ducks = combineReducers({
  loading,
  error,
  user
});

export default Ducks;
