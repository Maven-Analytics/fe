import {combineReducers} from 'redux-immutable';
import loading from './loading';
import error from './error';
import response from './response';
import user from './user';
import state from './state';

const Ducks = combineReducers({
  loading,
  error,
  response,
  user,
  state
});

export default Ducks;
